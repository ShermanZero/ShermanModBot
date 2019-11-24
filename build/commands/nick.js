exports.props = {
    "requiresElevation": "mod",
    "description": "changes the nickname of a member",
    "usage": "{user} {nickname}"
};
exports.run = (client, message, args) => {
    if (message.mentions.members.size === 0)
        return message.reply("please mention a user to change their nickname").catch((err) => { console.log(err); });
    const nickMember = message.mentions.members.first();
    nickMember.setNickname(args[1]);
    message.reply(`${nickMember}'s nickname has been changed!`).catch((err) => { console.log(err); });
};
//# sourceMappingURL=nick.js.map