"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("colors");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var rimraf_1 = __importDefault(require("rimraf"));
var ranks_json_1 = __importDefault(require("../resources/ranks/ranks.json"));
var Resources = /** @class */ (function () {
    function Resources() {
    }
    Resources.getUsernameFromMessage = function (message) {
        var username = message.member.user.tag.replace("#", "_");
        username = username.replace(/[^\w\s]/gi, '').toLowerCase();
        return username;
    };
    Resources.getUsernameFromMember = function (member) {
        var username = member.user ? member.user.tag : member.tag;
        username = username.replace("#", "_").replace(/[^\w\s]/gi, '').toLowerCase();
        return username;
    };
    Resources.getUserDirectoryFromGuild = function (guild, username) {
        return path_1["default"].join(this.getGuildDirectoryFromGuild(guild), username);
    };
    Resources.getUserContentsFromName = function (message, username, search) {
        if (search === void 0) { search = false; }
        console.log("username", username);
        return Resources.getUserContentsFromNameWithGuild(message.guild, message, username, search);
    };
    Resources.getUserContentsFromNameWithGuild = function (guild, message, username, search) {
        var _this = this;
        if (search === void 0) { search = false; }
        if (!guild)
            guild = message.guild;
        console.log("username", username);
        username = username.trim().toLowerCase();
        var jsonFile = path_1["default"].join(this.getGuildDirectoryFromGuild(guild), username, username + ".json");
        if (!fs_1["default"].existsSync(jsonFile)) {
            if (!search)
                return null;
            var possibleMatches_1 = [];
            var users = this.getGuildUsersFromGuild(guild);
            for (var guildUserUsername in Object.keys(users))
                if (guildUserUsername.includes(username))
                    possibleMatches_1.push(guildUserUsername);
            if (possibleMatches_1.length > 1) {
                var listOfUsers = "";
                for (var i = 0; i < possibleMatches_1.length; i++)
                    listOfUsers += i + 1 + ") " + possibleMatches_1[i];
                message.reply("there are multiple users which contain [" + username + "], please select the correct one:\n" + listOfUsers)
                    .then(function () {
                    message.channel.awaitMessages(function (response) { return response.author === message.author; }, {
                        max: 1,
                        time: 1000 * 60,
                        errors: ['time']
                    })
                        .then(function (collected) {
                        var answer = parseInt(collected.first().content);
                        if (answer < 1 || answer > possibleMatches_1.length) {
                            message.reply("you did not enter a valid number, no user has been selected");
                            return;
                        }
                        username = possibleMatches_1[answer - 1];
                        jsonFile = path_1["default"].join(_this.getGuildDirectoryFromGuild(guild), username, username + ".json");
                    })["catch"](function () {
                        message.reply("you did not respond in time, no user has been selected");
                        return null;
                    });
                });
            }
        }
        var json = fs_1["default"].readFileSync(jsonFile);
        var content = JSON.parse(json.toString());
        return content;
    };
    Resources.getGuildNameFromGuild = function (guild) {
        var guildName = guild.name.replace(/[\W\s]/gi, "_");
        return guildName + "-(" + guild.id + ")";
    };
    Resources.getGuildDirectoryFromGuild = function (guild) {
        return path_1["default"].join(__dirname, "..", "users", this.getGuildNameFromGuild(guild));
    };
    Resources.getGuildDirectoryFromName = function (guildname) {
        return path_1["default"].join(__dirname, "..", "users", guildname);
    };
    Resources.getGuildUsersFromGuild = function (guild) {
        for (var _i = 0, guild_1 = guild; _i < guild_1.length; _i++) {
            var _a = guild_1[_i], guildname = _a[0], users = _a[1];
            if (guildname == this.getGuildNameFromGuild(guild))
                return users;
        }
        return null;
    };
    //creates the user directory
    Resources.createUserDirectory = function (client, guild, member) {
        var basePath = path_1["default"].join(__dirname, "..", "users", "content.json");
        var json = fs_1["default"].readFileSync(basePath);
        var content = JSON.parse(json.toString());
        content.hidden.username = this.getUsernameFromMember(member);
        content.hidden.guildname = this.getGuildNameFromGuild(guild);
        var date = member.joinedAt;
        var joinedAt = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
        content.misc.joined = joinedAt;
        var dir = this.getUserDirectoryFromGuild(guild, content.hidden.username);
        fs_1["default"].mkdirSync(dir);
        fs_1["default"].writeFileSync(dir + "/" + content.hidden.username + ".json", JSON.stringify(content, null, "\t"));
        fs_1["default"].mkdirSync(dir + "/logs");
        var rolesUserHas = member.roles;
        var rankRolesUserHas = [];
        //if the user already has pre-existing roles
        if (rolesUserHas.size != 0) {
            var entries = Object.entries(ranks_json_1["default"]._info);
            var _loop_1 = function () {
                var rank = entries[i][0].toLowerCase();
                var role = member.roles.find(function (role) { return role.name.toLowerCase() === rank; });
                if (role) {
                    rankRolesUserHas.push(role);
                    content.rank.name = rank;
                    content.rank.xp = ranks_json_1["default"]._info[rank];
                    for (var level in ranks_json_1["default"].levels) {
                        if (ranks_json_1["default"].levels[level].toLowerCase() === rank) {
                            content.rank.level = parseInt(level);
                            content.rank.levelup = this_1.getXPToLevelUp(content.rank.xp, content.rank.level);
                            break;
                        }
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < entries.length; i++) {
                _loop_1();
            }
        }
        rankRolesUserHas.splice(-1, 1);
        rankRolesUserHas.forEach(function (role) {
            member.removeRole(role)["catch"](function (err) { console.log(err); });
        });
        client.registerUser(content);
        return content;
    };
    Resources.destroyUserDirectory = function (guild, username) {
        var source = this.getUserDirectoryFromGuild(guild, username);
        rimraf_1["default"](source, function (err) {
            if (err)
                console.log(err);
        });
    };
    Resources.writeUserContentToFile = function (client, username, content) {
        Object.defineProperty(content, "hidden", {
            enumerable: true
        });
        var dir = path_1["default"].join(this.getGuildDirectoryFromName(content.hidden.guildname), username);
        if (!fs_1["default"].existsSync(dir))
            return console.error(("!! Attempted to write [" + username + "] contents to log, but no directory exists at [" + dir + "]").red);
        if (content.userLog && content.userLog.length != 0) {
            for (var i = 0; i < content.userLog.length; i++)
                fs_1["default"].appendFileSync(dir + "/logs/" + client.config.files.log_all, content.userLog[i]);
            content.userLog = [];
        }
        fs_1["default"].writeFileSync(dir + "/" + username + ".json", JSON.stringify(content, null, "\t"));
    };
    Resources.getXPToLevelUp = function (xp, level) {
        return xp + Math.round((4 * Math.pow(level, 3)) / 5);
    };
    return Resources;
}());
exports["default"] = Resources;
