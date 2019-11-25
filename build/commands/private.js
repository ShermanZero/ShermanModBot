"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.props = {
    requiresElevation: "mod",
    description: "grants a member access to the private-hangout channel",
    usage: "{user}"
};
exports.run = function (client, message, args) {
    var privateRole = message.guild.roles.get("645418484398030918");
    var privateHangoutChannel = client.channels.get("645418390961258536");
    if (privateRole)
        privateRole = privateRole;
    if (privateHangoutChannel)
        privateHangoutChannel = privateHangoutChannel;
    if (message.mentions.members.size === 0)
        return message.reply("please mention a user to give private access to");
    if (!message.guild.me.hasPermission("MANAGE_ROLES"))
        return;
    var roleMember = message.mentions.members.first();
    //add the private role to the member
    roleMember.addRole(privateRole).catch(function (err) {
        console.log(err);
    });
    //delete the original message
    message.delete().catch(function (err) {
        console.log(err);
    });
    //alert the member that they are in the channel
    privateHangoutChannel
        .send(roleMember + ", welcome to the private channel!  All the messages will be deleted after you have left.")
        .then(function () {
        privateHangoutChannel
            .awaitMessages(function (response) { return response.content === "EOD"; }, {
            max: 1,
            time: 600000,
            errors: ["time"]
        })
            .then(function (collected) {
            privateHangoutChannel
                .send("The private discussion has concluded, use !purge to clear the channel.")
                .catch(function (err) {
                console.log(err);
            });
            roleMember.removeRole(privateRole).catch(function (err) {
                console.log(err);
            });
        });
    });
};
//# sourceMappingURL=private.js.map