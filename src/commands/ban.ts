import { GuildMember, Message } from 'discord.js';

module.exports.props = {
  requiresElevation: "mod",
  description: "bans a member from the server",
  usage: "<member> <?reason>"
};

module.exports.run = async (client: any, message: Message, [mention, ...reason]) => {
    if (!message.mentions.members || message.mentions.members.size === 0)
      try {
        return message.reply("please mention a user to kick");
      } catch (err) {
        console.log(err);
        return;
      }

    const banMember = message.mentions.members.first() as GuildMember;
    await banMember.ban({ reason: reason.join(" ") });

    let modChannel = client.channels.get(client.config.channels.mod.logs);
    await modChannel.send(
      `${banMember.user.username} was banned by ${message.author.tag} for reason: ${reason}`
    );
  
}
