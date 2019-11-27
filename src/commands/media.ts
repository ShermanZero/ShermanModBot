import { GuildMember, Message, MessageEmbed, MessageReaction, TextChannel, User } from 'discord.js';

import rsrc from '../classes/Resources';
import config from '../resources/global_config';

module.exports.props = {
  requiresElevation: config.elevation_names.moderator,
  description: "display the media invites",
  usage: "<title> | <time>"
};

module.exports.run = async (client: any, message: Message, args: string[]) => {
  await message.delete();

  let reactEmoji: string = "✅";

  let mediaName: string;
  let mediaTime: string;
  let medialDetails: string;
  await rsrc.askQuestion(message.channel as TextChannel, "What is the title of the media you will be streaming?", true).then(response => {
    mediaName = response;
  });

  await rsrc.askQuestion(message.channel as TextChannel, "What time will you be streaming?", true).then(response => {
    mediaTime = response;
  });

  await rsrc.askQuestion(message.channel as TextChannel, "Add any further details, or enter 'none' to continue", true).then(response => {
    medialDetails = response;
  });

  let embed = new MessageEmbed();
  embed.setTitle("MEDIA ALERT");
  embed.setDescription(`Hey!  There's an upcoming media session today, see the details below:`);
  embed.addField("NAME", mediaName, true);
  embed.addField("TIME", mediaTime, true);

  if (medialDetails.toLowerCase().trim() !== "none") embed.addField("DETAILS", medialDetails);

  embed.setFooter(`\`\`\`React with ${reactEmoji} to join!\`\`\``);

  await message.channel.send(embed).then(async message => {
    await message.react(reactEmoji);

    const filter = (reaction: MessageReaction, user: User) => {
      let pass = (reaction.emoji.toString() === reactEmoji);

      let member: GuildMember;
      if (pass) member = message.guild.members.find(member => member.user.id === user.id);
      if (member) member.roles.add(message.guild.roles.find(role => role.name === "media"));

      return pass;
    };

    message.createReactionCollector(filter);
  });
};
