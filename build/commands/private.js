exports.props = {
    "requiresElevation": "mod",
    "description": "grants a member access to the private-hangout channel",
    "usage": "{user}"
};
exports.run = (client, message, args) => {
    const privateRole = message.guild.roles.get("645418484398030918");
    const privateHangoutChannel = client.channels.get("645418390961258536");
    if (message.mentions.members.size === 0)
        return message.reply("please mention a user to give private access to");
    if (!message.guild.me.hasPermission("MANAGE_ROLES"))
        return;
    const roleMember = message.mentions.members.first();
    roleMember.addRole(privateRole).catch((err) => { console.log(err); });
    message.delete().catch((err) => { console.log(err); });
    privateHangoutChannel.send(`${roleMember}, welcome to the private channel!  All the messages will be deleted after you have left.`)
        .then(() => {
        privateHangoutChannel.awaitMessages(response => response.content === "EOD", {
            max: 1,
            time: 600000,
            errors: ['time']
        })
            .then((collected) => {
            privateHangoutChannel.send("The private discussion has concluded, use !purge to clear the channel.").catch((err) => { console.log(err); });
            roleMember.removeRole(privateRole).catch((err) => { console.log(err); });
        });
    });
};
//# sourceMappingURL=private.js.map