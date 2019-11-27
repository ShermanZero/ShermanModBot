import { Message, MessageEmbed, MessageReaction, TextChannel, User } from 'discord.js';

import rsrc from '../classes/Resources';
import config from '../resources/global_config';

module.exports.props = {
  requiresElevation: config.elevation_names.moderator,
  description: "display the media invites",
  usage: "<title> | <time>"
};

module.exports.run = async (client: any, message: Message, args: string[]) => {
  await message.delete();

  let reactEmoji: string = "649225992778547201";

  let mediaName: string;
  let mediaTime: string;
  let medialDetails: string;
  await rsrc.askQuestion(message.channel as TextChannel, "What is the title of the media you will be streaming?").then(response => {
    mediaName = response;
  });

  await rsrc.askQuestion(message.channel as TextChannel, "What time will you be streaming?").then(response => {
    mediaTime = response;
  });

  await rsrc.askQuestion(message.channel as TextChannel, "Add any further details, or press enter to continue").then(response => {
    medialDetails = response;
  });

  let embed = new MessageEmbed();
  embed.setTitle("MEDIA ALERT");
  embed.setDescription(`Hey!  There's an upcoming media session today, see the details below:`);
  embed.addField("NAME", mediaName, true);
  embed.addField("TIME", mediaTime, true);

  if (medialDetails) embed.addField("DETAILS", medialDetails);

  embed.setFooter(`React with ${client.emojis.get(reactEmoji)} to join!`);

  await message.channel.send(embed).then(message => {
    const filter = (reaction: MessageReaction, user: User) => {
      return reaction.emoji.name === client.emojis.get(reactEmoji) && user.id === message.author.id;
    };

    const collector = message.createReactionCollector(filter);
    collector.on("collect", (reaction, reactionCollector) => {
      console.log(`Collected ${reaction.emoji.name}`);
    });

    collector.on("end", collected => {
      console.log(`Collected ${collected} items`);
    });
  });
};
