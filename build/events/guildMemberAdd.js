"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Resources_1 = __importDefault(require("../classes/Resources"));
module.exports = function (client, member) {
    var guild = member.guild;
    var defaultChannel = guild.channels.find(function (channel) { return channel.name === "welcome"; });
    if (!(function (defaultChannel) {
        return defaultChannel.type === "text";
    })(defaultChannel))
        return;
    var unrankedRole = guild.roles.get("609248072706424863");
    if (unrankedRole)
        unrankedRole = unrankedRole;
    member.addRole(unrankedRole).catch(function (err) {
        console.log(err);
    });
    var serverRules = guild.channels.get(client.config.channels.shermanzeros_hangout.server_rules);
    var serverInfo = guild.channels.get(client.config.channels.shermanzeros_hangout.server_information);
    var autoRoles = guild.channels.get(client.config.channels.shermanzeros_hangout.auto_roles);
    defaultChannel
        .send("Welcome " + member.user + " to **" + guild.name + "**!  You are member **#" + guild.memberCount + "!  Check out the " + serverRules + " and " + serverInfo + " regarding the different channels.  **Please change your nickname to match your Twitch account name, and link your Twitch and Discord together.**  Be sure to assign yourself some roles over in " + autoRoles + ", based on what you want to see!  Get to know everyone, have a great time, and thanks for joining!")
        .catch(function (err) {
        console.log(err);
    });
    Resources_1.default.createUserDirectory(client, member.guild, member);
};
//# sourceMappingURL=guildMemberAdd.js.map