"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../classes/StringHandler");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Resources_1 = __importDefault(require("../classes/Resources"));
exports.props = {
    requiresElevation: "mod",
    description: "displays the last number of messages a user has posted",
    usage: "{amount} {user}"
};
exports.run = function (client, message, args) {
    var user = message.mentions.users.first();
    if (!user)
        return message.reply("you need to specify a user").catch(function (err) {
            console.log(err);
        });
    var username = Resources_1.default.getUsernameFromMember(user);
    var file = path_1.default.join(Resources_1.default.getUserDirectoryFromGuild(message.guild, username), "logs", client.config.files.log_all);
    //parse amount
    var amount = !!parseInt(args[1]) ? parseInt(args[1]) : parseInt(args[2]);
    if (!amount || amount > 100)
        amount = 100;
    if (amount < 1)
        amount = 1;
    var logs;
    fs_1.default.readFile(file, "utf8", function (error, data) {
        var content = client.getUserContent(message.guild, username);
        if (content.userLog.length !== 0)
            data
                ? (data += content.userLog.join(""))
                : (data = content.userLog.join(""));
        if (error && !data)
            return message.reply("that user does not have a log file");
        logs = data.split("\n");
        if (logs[logs.length - 1].trim() === "")
            logs = logs.slice(0, -1);
        if (amount > logs.length)
            amount = logs.length;
        logs = logs.slice(-amount);
        var result = amount == 1 ? logs[0] : logs.join("\n");
        message.channel.send("Here are the last " + amount + " message(s) [" + username.hideID() + "] sent:\n" + result, { split: true });
    });
};
//# sourceMappingURL=log.js.map