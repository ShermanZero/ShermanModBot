
exports.props = {
  "requiresElevation": false,
  "description": "changes the nickname of a member",
  "usage": "{user} {nickname}"
};

exports.run = (client, message, args) => {
  const modRole = message.member.roles.has(client.config.modID);

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
