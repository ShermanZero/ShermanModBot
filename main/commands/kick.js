
exports.props = {
  "requiresElevation": true,
  "description": "kicks a member from the server",
  "usage": "{user} {reason}"
};

exports.run = (client, message, [mention, ...reason]) => {
  const modRole = message.member.roles.has(client.config.modID);

  if (!modRole)
    return;

  if (message.mentions.members.size === 0)
    return message.reply("please mention a user to kick");

  if (!message.guild.me.hasPermission("KICK_MEMBERS"))
    return message.reply("");

  const kickMember = message.mentions.members.first();

  kickMember.kick(reason.join(" ")).then(member => {
    message.reply(`${member.user.username} was kicked by ${message.author.tag} for reason: ${reason}`);
  });
};
