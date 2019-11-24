"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("colors");
var path_1 = __importDefault(require("path"));
var config_json_1 = __importDefault(require("./resources/config.json"));
var Resources_1 = __importDefault(require("./classes/Resources"));
var fs_1 = __importDefault(require("fs"));
var discord_js_1 = __importDefault(require("discord.js"));
var enmap_1 = __importDefault(require("enmap"));
var client = new discord_js_1["default"].Client();
init();
start();
client.login(config_json_1["default"].token);
function init() {
    client.config = config_json_1["default"];
    client.usersInSession = new Map();
    client.masterLog = [];
    client.getGuild = function (guildName) {
        return client.usersInSession[guildName];
    };
    client.updateUser = function (content) {
        var guildName = content.hidden.guildname;
        var username = content.hidden.username;
        var guild = client.usersInSession[guildName];
        guild[username] = content;
        Object.defineProperty(content, "hidden", {
            enumerable: false
        });
    };
    client.registerUser = function (content) {
        client.updateUser(content);
        console.log("*Registered [" + content.hidden.username.magenta + "] to guild [" + content.hidden.guildname.magenta + "]");
    };
    client.hasUser = function (guild, username) {
        var userGuild = client.usersInSession[Resources_1["default"].getGuildNameFromGuild(guild)];
        if (userGuild === null || typeof userGuild === "undefined")
            return false;
        var user = userGuild[username];
        return !(user === null || typeof user === "undefined");
    };
    client.getUserContent = function (guild, username) {
        var guildName = Resources_1["default"].getGuildNameFromGuild(guild);
        var userGuild = client.usersInSession[guildName];
        if (userGuild === null) {
            console.error(("!! Could not retrieve [" + username + "'s] guild").red);
            return null;
        }
        if (userGuild[username] === null || typeof userGuild[username] === "undefined") {
            console.error(("!! Could not locate [" + username + "] in [" + guildName + "]").red);
            return null;
        }
        return userGuild[username];
    };
    client.removeUser = function (guild, username) {
        var userGuild = client.usersInSession[Resources_1["default"].getGuildNameFromGuild(guild)];
        if (userGuild === null || typeof userGuild === "undefined")
            return;
        userGuild["delete"](username);
    };
    client.deleteUser = function (guild, username) {
        client.removeUser(guild, username);
        Resources_1["default"].destroyUserDirectory(guild, username);
    };
}
function start() {
    var eventsPath = path_1["default"].join(__dirname, "events");
    fs_1["default"].readdir(eventsPath, function (err, files) {
        if (err)
            return console.error(err);
        files.forEach(function (file) {
            if (!file.endsWith(".js"))
                return;
            var event = require(path_1["default"].join(__dirname, "events", file));
            var eventName = file.split(".")[0];
            client.on(eventName, event.bind(null, client));
            delete require.cache[require.resolve(path_1["default"].join(__dirname, "events", file))];
        });
    });
    client.commands = new enmap_1["default"]();
    var commandsPath = path_1["default"].join(__dirname, "commands");
    fs_1["default"].readdir(commandsPath, function (err, files) {
        if (err)
            return console.error(err);
        files.forEach(function (file) {
            if (!file.endsWith(".js"))
                return;
            var props = require(path_1["default"].join(__dirname, "commands", file));
            var commandName = file.split(".")[0];
            client.commands.set(commandName, props);
        });
    });
}
