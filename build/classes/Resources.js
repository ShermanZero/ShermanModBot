"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const rimraf_1 = __importDefault(require("rimraf"));
const ranks_json_1 = __importDefault(require("../resources/ranks/ranks.json"));
class Resources {
    static getUsernameFromMessage(message) {
        let username = message.member.user.tag.replace("#", "_");
        username = username.replace(/[^\w\s]/gi, '').toLowerCase();
        return username;
    }
    static getUsernameFromMember(member) {
        let username = member.user ? member.user.tag : member.tag;
        username = username.replace("#", "_").replace(/[^\w\s]/gi, '').toLowerCase();
        return username;
    }
    static getUserDirectoryFromGuild(guild, username) {
        return path_1.default.join(this.getGuildDirectoryFromGuild(guild), username);
    }
    static getUserContentsFromName(message, username, search = false) {
        console.log("username", username);
        return Resources.getUserContentsFromNameWithGuild(message.guild, message, username, search);
    }
    static getUserContentsFromNameWithGuild(guild, message, username, search = false) {
        if (!guild)
            guild = message.guild;
        console.log("username", username);
        username = username.trim().toLowerCase();
        let jsonFile = path_1.default.join(this.getGuildDirectoryFromGuild(guild), username, username + ".json");
        if (!fs_1.default.existsSync(jsonFile)) {
            if (!search)
                return null;
            let possibleMatches = [];
            let users = this.getGuildUsersFromGuild(guild);
            for (let guildUserUsername in Object.keys(users))
                if (guildUserUsername.includes(username))
                    possibleMatches.push(guildUserUsername);
            if (possibleMatches.length > 1) {
                let listOfUsers = "";
                for (var i = 0; i < possibleMatches.length; i++)
                    listOfUsers += `${i + 1}) ${possibleMatches[i]}`;
                message.reply(`there are multiple users which contain [${username}], please select the correct one:\n${listOfUsers}`)
                    .then(() => {
                    message.channel.awaitMessages((response) => response.author === message.author, {
                        max: 1,
                        time: 1000 * 60,
                        errors: ['time']
                    })
                        .then((collected) => {
                        let answer = parseInt(collected.first().content);
                        if (answer < 1 || answer > possibleMatches.length) {
                            message.reply("you did not enter a valid number, no user has been selected");
                            return;
                        }
                        username = possibleMatches[answer - 1];
                        jsonFile = path_1.default.join(this.getGuildDirectoryFromGuild(guild), username, username + ".json");
                    })
                        .catch(() => {
                        message.reply("you did not respond in time, no user has been selected");
                        return null;
                    });
                });
            }
        }
        let json = fs_1.default.readFileSync(jsonFile);
        let content = JSON.parse(json.toString());
        return content;
    }
    static getGuildNameFromGuild(guild) {
        let guildName = guild.name.replace(/[\W\s]/gi, "_");
        return `${guildName}-(${guild.id})`;
    }
    static getGuildDirectoryFromGuild(guild) {
        return path_1.default.join(__dirname, "..", "users", this.getGuildNameFromGuild(guild));
    }
    static getGuildDirectoryFromName(guildname) {
        return path_1.default.join(__dirname, "..", "users", guildname);
    }
    static getGuildUsersFromGuild(guild) {
        for (const [guildname, users] of guild)
            if (guildname == this.getGuildNameFromGuild(guild))
                return users;
        return null;
    }
    static createUserDirectory(client, guild, member) {
        let basePath = path_1.default.join(__dirname, "..", "users", "content.json");
        let json = fs_1.default.readFileSync(basePath);
        let content = JSON.parse(json.toString());
        content.hidden.username = this.getUsernameFromMember(member);
        content.hidden.guildname = this.getGuildNameFromGuild(guild);
        let date = member.joinedAt;
        let joinedAt = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        content.misc.joined = joinedAt;
        let dir = this.getUserDirectoryFromGuild(guild, content.hidden.username);
        fs_1.default.mkdirSync(dir);
        fs_1.default.writeFileSync(`${dir}/${content.hidden.username}.json`, JSON.stringify(content, null, "\t"));
        fs_1.default.mkdirSync(`${dir}/logs`);
        let rolesUserHas = member.roles;
        let rankRolesUserHas = [];
        if (rolesUserHas.size != 0) {
            let entries = Object.entries(ranks_json_1.default._info);
            for (var i = 0; i < entries.length; i++) {
                let rank = entries[i][0].toLowerCase();
                let role = member.roles.find(role => role.name.toLowerCase() === rank);
                if (role) {
                    rankRolesUserHas.push(role);
                    content.rank.name = rank;
                    content.rank.xp = ranks_json_1.default._info[rank];
                    for (var level in ranks_json_1.default.levels) {
                        if (ranks_json_1.default.levels[level].toLowerCase() === rank) {
                            content.rank.level = parseInt(level);
                            content.rank.levelup = this.getXPToLevelUp(content.rank.xp, content.rank.level);
                            break;
                        }
                    }
                }
            }
        }
        rankRolesUserHas.splice(-1, 1);
        rankRolesUserHas.forEach((role) => {
            member.removeRole(role).catch((err) => { console.log(err); });
        });
        client.registerUser(content);
        return content;
    }
    static destroyUserDirectory(guild, username) {
        let source = this.getUserDirectoryFromGuild(guild, username);
        rimraf_1.default(source, (err) => {
            if (err)
                console.log(err);
        });
    }
    static writeUserContentToFile(client, username, content) {
        Object.defineProperty(content, "hidden", {
            enumerable: true
        });
        let dir = path_1.default.join(this.getGuildDirectoryFromName(content.hidden.guildname), username);
        if (!fs_1.default.existsSync(dir))
            return console.error(`!! Attempted to write [${username}] contents to log, but no directory exists at [${dir}]`.red);
        if (content.userLog && content.userLog.length != 0) {
            for (var i = 0; i < content.userLog.length; i++)
                fs_1.default.appendFileSync(`${dir}/logs/${client.config.files.log_all}`, content.userLog[i]);
            content.userLog = [];
        }
        fs_1.default.writeFileSync(`${dir}/${username}.json`, JSON.stringify(content, null, "\t"));
    }
    static getXPToLevelUp(xp, level) {
        return xp + Math.round((4 * Math.pow(level, 3)) / 5);
    }
}
exports.default = Resources;
//# sourceMappingURL=Resources.js.map