import { Message } from 'discord.js';

exports.props = {
  requiresElevation: "mod",
  description: "bans a member from the server",
  usage: "{user} {reason}"
};

exports.run = async (client: any, message: Message, [mention, ...reason]) => {
  if (message.mentions.members.size === 0)
    try {
      return message.reply("please mention a user to kick");
    } catch (err) {
      console.log(err);
    }

  const banMember = message.mentions.members.first();
  banMember.ban(reason.join(" ")).then(member => {
    let modChannel = client.channels.get(client.config.channels.mod.logs);

    modChannel
      .send(
        `${member.user.username} was banned by ${message.author.tag} for reason: ${reason}`
      )
      .catch(err => {
        console.log(err);
      });
  });
};
