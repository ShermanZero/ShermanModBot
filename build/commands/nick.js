"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.props = {
    requiresElevation: "mod",
    description: "changes the nickname of a member",
    usage: "{user} {nickname}"
};
exports.run = function (client, message, args) {
    if (message.mentions.members.size === 0)
        return message
            .reply("please mention a user to change their nickname")
            .catch(function (err) {
            console.log(err);
        });
    var nickMember = message.mentions.members.first();
    nickMember.setNickname(args[1]);
    message.reply(nickMember + "'s nickname has been changed!").catch(function (err) {
        console.log(err);
    });
};
//# sourceMappingURL=nick.js.map