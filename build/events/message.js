"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Resources_1 = __importDefault(require("../classes/Resources"));
var blacklist_json_1 = __importDefault(require("../resources/misc/blacklist.json"));
var ranks_json_1 = __importDefault(require("../resources/ranks/ranks.json"));
module.exports = function (client, message) {
    //ignore all bots
    if (message.author.bot)
        return;
    //register the user
    if (!registerMessage(client, message))
        return console.error(("!! Could not register message sent by [" + Resources_1.default.getUsernameFromMessage(message) + "]").red);
    //check against blacklist
    if (blacklist_json_1.default.words.some(function (substring) { return message.content.includes(substring); })) {
        message.delete().catch(function (err) {
            console.log(err);
        });
        message.reply("that is not allowed here.").catch(function (err) {
            console.log(err);
        });
    }
    awardExperience(client, message);
    //ignore messages not starting with the prefix
    if (message.content.indexOf(client.config.prefix) !== 0)
        return;
    //standard argument/command name definition
    var args = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);
    var command;
    if (args)
        command = args.shift().toLowerCase();
    if (!command)
        return;
    //grab the command data from the client.commands Enmap
    var cmd = client.commands.get(command);
    //if the command doesn't exist
    if (!cmd)
        return;
    if (cmd.props.requiresElevation && cmd.props.requiresElevation !== "")
        if (!message.member.roles.has(client.config.roles[cmd.props.requiresElevation]))
            return;
    //run the command
    cmd.run(client, message, args);
};
//registers the message
function registerMessage(client, message) {
    var username = Resources_1.default.getUsernameFromMessage(message);
    var guildName = Resources_1.default.getGuildNameFromGuild(message.guild);
    var userDir = Resources_1.default.getUserDirectoryFromGuild(message.guild, username);
    var content;
    //if the user has not been registered
    if (!fs_1.default.existsSync(userDir))
        Resources_1.default.createUserDirectory(client, message.guild, message.member);
    //user NOT stored in local client session
    if (!client.hasUser(message.guild, username)) {
        content = Resources_1.default.getUserContentsFromName(message, username);
        client.registerUser(message.member.user, content);
        //user stored in local client session
    }
    else {
        content = client.getUserContent(message.guild, username);
    }
    if (content === null || typeof content === "undefined") {
        console.error(("!! Could not retrieve contents for [" + username + "]").red);
        return false;
    }
    if (content.misc.first_message === null ||
        typeof content.misc.first_message === "undefined") {
        content.misc.first_message = message.content;
        client.updateUser(content);
    }
    var logMessage = "[" + getTimestamp(message) + "] (#" + message.channel.name + "): " + message.content + "\n";
    //push the message to the master log branch
    client.masterLog.push("/" + guildName + "/>  " + username + " " + logMessage);
    //if the log length exceeds the threshold, update the master log
    updateMasterLog(client);
    //push the user's message directly to the user's log
    content.userLog.push(logMessage);
    //if the log length exceeds the threshold, update the user log
    updateUserLog(client, message.guild, content);
    return true;
}
function getTimestamp(message) {
    var timestamp = message.createdAt;
    var date = (timestamp.getMonth() + 1 + "/" + timestamp.getDate()).replace(/.*(\d{2}\/\d{2}).*/, "$1");
    var time = timestamp.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    return date + "  " + time;
}
function updateMasterLog(client) {
    var masterLog = path_1.default.join(__dirname, "..", "logs", client.config.files.log_all);
    if (!fs_1.default.existsSync(masterLog))
        fs_1.default.writeFileSync(masterLog, "");
    //if the log length exceeds the threshold, update the master log
    if (client.masterLog.length >= client.config.preferences.log_threshold_master) {
        for (var i = 0; i < client.masterLog.length; i++)
            fs_1.default.appendFileSync(masterLog, client.masterLog[i]);
        client.masterLog = [];
    }
}
function updateUserLog(client, guild, content) {
    var logsDir = path_1.default.join(Resources_1.default.getUserDirectoryFromGuild(guild, content.hidden.username), "logs");
    var userLog = path_1.default.join(logsDir, client.config.files.log_all);
    //if the log length exceeds the threshold, update the master log
    if (content.userLog.length >= client.config.preferences.log_threshold_user) {
        for (var i = 0; i < content.userLog.length; i++)
            fs_1.default.appendFileSync(userLog, content.userLog[i]);
        content.userLog = [];
    }
    //have to update the Enmap
    client.updateUser(content);
    //log it to the console
    console.log("[" + content.hidden.guildname.magenta + "] =>", "[" + content.hidden.username.magenta + "] =>", content);
}
//awards the user experience for posting a message
function awardExperience(client, message) {
    var username = Resources_1.default.getUsernameFromMessage(message);
    //get the content from the session instead of from the file
    var content = client.getUserContent(message.guild, username);
    if (!content) {
        return console.error("!! Could not retrieve contents from [" + username + "]");
    }
    content.rank.xp += 1;
    if (content.rank.xp >= content.rank.levelup) {
        content.rank.level += 1;
        var rank = ranks_json_1.default.levels[content.rank.level];
        if (rank) {
            var lastRank = content.rank.name;
            content.rank.name = rank;
            var oldRole = message.guild.roles.find(function (role) { return role.name.toLowerCase() === lastRank.toLowerCase(); });
            var newRole = message.guild.roles.find(function (role) { return role.name.toLowerCase() === rank.toLowerCase(); });
            if (oldRole)
                message.member.removeRole(oldRole).catch(function (err) {
                    console.log(err);
                });
            message.member.addRole(newRole).catch(function (err) {
                console.log(err);
            });
        }
        content.rank.levelup = Resources_1.default.getXPToLevelUp(content.rank.xp, content.rank.level);
        levelUp(client, message, content);
    }
    client.updateUser(content);
    //only write XP changes to the file every 10 messages
    if (content.rank.xp % client.config.preferences.xp_threshold === 0) {
        var jsonFile = path_1.default.join(Resources_1.default.getUserDirectoryFromGuild(message.guild, username), username + ".json");
        var newJson = JSON.stringify(content, null, "\t");
        fs_1.default.writeFileSync(jsonFile, newJson);
    }
}
function levelUp(client, message, content) {
    var stats = client.commands.get("stats");
    var embed = stats.getEmbed(client, message.member, content);
    message.channel.send("Congratulations " + message.author + "!  You just leveled up!  Keep chatting to earn more XP and unlock roles and special perks!");
    message.channel.send(embed);
}
//# sourceMappingURL=message.js.map