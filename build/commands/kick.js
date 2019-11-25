"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.props = {
    requiresElevation: "mod",
    description: "kicks a member from the server",
    usage: "{user} {reason}"
};
exports.run = function (client, message, _a) {
    var mention = _a[0], reason = _a.slice(1);
    if (message.mentions.members.size === 0)
        return message.reply("please mention a user to kick");
    var kickMember = message.mentions.members.first();
    kickMember.kick(reason.join(" ")).then(function (member) {
        var modChannel = client.channels.get(client.config.channels.mod.logs);
        modChannel
            .send(member.user.username + " was kicked by " + message.author.tag + " for reason: " + reason)
            .catch(function (err) {
            console.log(err);
        });
    });
};
//# sourceMappingURL=kick.js.map