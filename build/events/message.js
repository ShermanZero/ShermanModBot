import 'colors';
import * as fs from 'fs';
import * as path from 'path';
import rsrc from '../classes/Resources';
import blacklist from '../resources/misc/blacklist.json';
import ranks from '../resources/ranks/ranks.json';
module.exports = (client, message) => {
    if (message.author.bot)
        return;
    if (!registerMessage(client, message))
        return console.error(`!! Could not register message sent by [${rsrc.getUsernameFromMessage(message)}]`.red);
    if (blacklist.words.some(substring => message.content.includes(substring))) {
        message.delete().catch((err) => { console.log(err); });
        message.reply("that is not allowed here.").catch((err) => { console.log(err); });
    }
    awardExperience(client, message);
    if (message.content.indexOf(client.config.prefix) !== 0)
        return;
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    if (!cmd)
        return;
    if (cmd.props.requiresElevation && cmd.props.requiresElevation !== "")
        if (!message.member.roles.has(client.config.roles[cmd.props.requiresElevation]))
            return;
    cmd.run(client, message, args);
};
function registerMessage(client, message) {
    let username = rsrc.getUsernameFromMessage(message);
    let guildName = rsrc.getGuildNameFromGuild(message.guild);
    let userDir = rsrc.getUserDirectoryFromGuild(message.guild, username);
    let content = null;
    if (!fs.existsSync(userDir))
        rsrc.createUserDirectory(client, message.guild, message.member);
    if (!client.hasUser(message.guild, username)) {
        content = rsrc.getUserContentsFromName(message, username);
        client.registerUser(message.member.user, content);
    }
    else {
        content = client.getUserContent(message.guild, username);
    }
    if (content === null || typeof content === "undefined") {
        console.error(`!! Could not retrieve contents for [${username}]`.red);
        return false;
    }
    if (content.misc.first_message === null || typeof content.misc.first_message === "undefined") {
        content.misc.first_message = message.content;
        client.updateUser(content);
    }
    let logMessage = `[${getTimestamp(message)}] (#${message.channel.name}): ${message.content}\n`;
    client.masterLog.push(`/${guildName}/>  ${username} ${logMessage}`);
    updateMasterLog(client);
    content.userLog.push(logMessage);
    updateUserLog(client, message.guild, content);
    return true;
}
function getTimestamp(message) {
    let timestamp = message.createdAt;
    let date = ((timestamp.getMonth() + 1) + "/" + timestamp.getDate()).replace(/.*(\d{2}\/\d{2}).*/, "$1");
    let time = timestamp.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    return date + "  " + time;
}
function updateMasterLog(client) {
    let masterLog = path.join(__dirname, "..", "logs", client.config.files.log_all);
    if (!fs.existsSync(masterLog))
        fs.writeFileSync(masterLog, "");
    if (client.masterLog.length >= client.config.preferences.log_threshold_master) {
        for (var i = 0; i < client.masterLog.length; i++)
            fs.appendFileSync(masterLog, client.masterLog[i]);
        client.masterLog = [];
    }
}
function updateUserLog(client, guild, content) {
    let logsDir = path.join(rsrc.getUserDirectoryFromGuild(guild, content.hidden.username), "logs");
    let userLog = path.join(logsDir, client.config.files.log_all);
    if (content.userLog.length >= client.config.preferences.log_threshold_user) {
        for (var i = 0; i < content.userLog.length; i++)
            fs.appendFileSync(userLog, content.userLog[i]);
        content.userLog = [];
    }
    client.updateUser(content);
    console.log(`[${content.hidden.guildname.magenta}] =>`, `[${content.hidden.username.magenta}] =>`, content);
}
function awardExperience(client, message) {
    let username = rsrc.getUsernameFromMessage(message);
    let content = client.getUserContent(message.guild, username);
    if (!content) {
        return console.error(`!! Could not retrieve contents from [${username}]`);
    }
    content.rank.xp += 1;
    if (content.rank.xp >= content.rank.levelup) {
        content.rank.level += 1;
        var rank = ranks.levels[content.rank.level];
        if (rank) {
            var lastRank = content.rank.name;
            content.rank.name = rank;
            let oldRole = message.guild.roles.find(role => role.name.toLowerCase() === lastRank.toLowerCase());
            let newRole = message.guild.roles.find(role => role.name.toLowerCase() === rank.toLowerCase());
            if (oldRole)
                message.member.removeRole(oldRole).catch((err) => { console.log(err); });
            message.member.addRole(newRole).catch((err) => { console.log(err); });
        }
        content.rank.levelup = rsrc.getXPToLevelUp(content.rank.xp, content.rank.level);
        levelUp(client, message, content);
    }
    client.updateUser(content);
    if ((content.rank.xp % client.config.preferences.xp_threshold) === 0) {
        let jsonFile = path.join(rsrc.getUserDirectoryFromGuild(message.guild, username), username + ".json");
        let newJson = JSON.stringify(content, null, "\t");
        fs.writeFileSync(jsonFile, newJson);
    }
}
function levelUp(client, message, content) {
    var stats = client.commands.get("stats");
    let embed = stats.getEmbed(client, message.member, content);
    message.channel.send(`Congratulations ${message.author}!  You just leveled up!  Keep chatting to earn more XP and unlock roles and special perks!`);
    message.channel.send(embed);
}
//# sourceMappingURL=message.js.map