
exports.props = {
  "requiresElevation": true,
  "description": "grants a member access to the private-hangout channel",
  "usage": "{user}"
};

exports.run = (client, message, args) => {
  const modRole = message.member.roles.has(client.config.modID);
  const privateRole = message.guild.roles.get("645418484398030918");
  const privateHangoutChannel = client.channels.get("645418390961258536");

  if(!modRole)
    return;

  if(message.mentions.members.size === 0)
    return message.reply("please mention a user to give private access to");

  if(!message.guild.me.hasPermission("MANAGE_ROLES"))
    return;

  const roleMember = message.mentions.members.first();

  //add the private role to the member
  roleMember.addRole(privateRole).catch(console.error);

  //delete the original message
  message.delete().catch(console.error);

  //alert the member that they are in the channel
  privateHangoutChannel.send(`${roleMember}, welcome to the private channel!  All the messages will be deleted after you have left.`)
    .then(() => {
      privateHangoutChannel.awaitMessages(response => response.content === "EOD", {
        max: 1,
        time: 60000,
        errors: ['time']
      })
      .then((collected) => {
        privateHangoutChannel.send("The private discussion has concluded, use !purge to clear the channel.");
        roleMember.removeRole(privateRole).catch(console.error);
      })
    });
}
