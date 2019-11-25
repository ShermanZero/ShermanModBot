import { Channel, Message, Role } from 'discord.js';

exports.props = {
  requiresElevation: "mod",
  description: "grants a member access to the private-hangout channel",
  usage: "{user}"
};

exports.run = (client: any, message: Message, args: string[]) => {
  let privateRole: any = message.guild.roles.get("645418484398030918");
  let privateHangoutChannel: any = client.channels.get("645418390961258536");

  if (privateRole) privateRole = privateRole as Role;
  if (privateHangoutChannel) privateHangoutChannel = privateHangoutChannel as Channel;

  if (message.mentions.members.size === 0)
    return message.reply("please mention a user to give private access to");

  if (!message.guild.me.hasPermission("MANAGE_ROLES")) return;

  const roleMember = message.mentions.members.first();

  //add the private role to the member
  roleMember.addRole(privateRole).catch(err => {
    console.log(err);
  });

  //delete the original message
  message.delete().catch(err => {
    console.log(err);
  });

  //alert the member that they are in the channel
  privateHangoutChannel
    .send(
      `${roleMember}, welcome to the private channel!  All the messages will be deleted after you have left.`
    )
    .then(() => {
      privateHangoutChannel
        .awaitMessages((response: Message) => response.content === "EOD", {
          max: 1,
          time: 600000,
          errors: ["time"]
        })
        .then((collected: any) => {
          privateHangoutChannel
            .send(
              "The private discussion has concluded, use !purge to clear the channel."
            )
            .catch(err => {
              console.log(err);
            });
          roleMember.removeRole(privateRole).catch(err => {
            console.log(err);
          });
        });
    });
};
