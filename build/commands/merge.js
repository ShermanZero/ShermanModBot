"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var rimraf_1 = __importDefault(require("rimraf"));
var Resources_1 = __importDefault(require("../classes/Resources"));
exports.props = {
    requiresElevation: "owner",
    description: "copies a user's data to another user, and deletes the original",
    usage: "{user} {user}"
};
exports.run = function (client, message, args) {
    if (args.length != 2)
        return message.reply("you need to specify two users").catch(function (err) {
            console.log(err);
        });
    //the user to copy from
    var oldUser = args[0].trim().toLowerCase();
    //the user to copy to
    var newUser = args[1].trim().toLowerCase();
    var oldUsername = Resources_1.default.getUsernameFromMember(oldUser);
    var newUsername = Resources_1.default.getUsernameFromMember(newUser);
    if (!client.hasUser(message.guild, oldUsername))
        if (message)
            return message.reply("I could not find OLD [" + oldUser + "] in my database");
        else
            return console.error(("!! I could not find OLD [" + oldUser + "] in my database").red);
    if (!client.hasUser(message.guild, newUsername))
        if (message)
            return message.reply("I could not find NEW [" + newUser + "] in my database");
        else
            return console.error(("!! I could not find NEW [" + newUser + "] in my database").red);
    var content = client.getUserContent(message.guild, oldUsername);
    content.hidden.username = newUsername;
    var source = Resources_1.default.getUserDirectoryFromGuild(message.guild, oldUsername);
    var destination = Resources_1.default.getUserDirectoryFromGuild(message.guild, newUsername);
    fs_1.default.writeFileSync(path_1.default.join(destination, newUsername + ".json"), JSON.stringify(content, null, "\t"));
    rimraf_1.default(source, function (err) {
        if (err)
            console.log(err);
    });
    client.usersInSession.delete(oldUser);
    console.log("*Removed [" + oldUser + "] from session");
    if (message)
        message.delete().catch(function (err) {
            console.log(err);
        });
};
//# sourceMappingURL=merge.js.map