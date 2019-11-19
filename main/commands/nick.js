
exports.props = {
  "requiresElevation": true,
  "description": "changes the nickname of a member",
  "usage": "{user} {nickname}"
};

exports.run = (client, message, args) => {
  const modRole = message.member.roles.has(client.config.roles.mod);

  if(!modRole)
    return;

  if(message.mentions.members.size === 0)
    return message.reply("please mention a user to change their nickname").catch((err) => {console.log(err)});

  if(!message.guild.me.hasPermission("MANAGE_NICKNAMES"))
    return;

  const nickMember = message.mentions.members.first();
  nickMember.setNickname(args[1]);

  message.reply(`${nickMember}'s nickname has been changed!`).catch((err) => {console.log(err)});
};
