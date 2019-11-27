import { GuildMember, Message, MessageEmbed, MessageReaction, TextChannel, User } from 'discord.js';
import fetch from 'node-fetch';

import rsrc from '../classes/Resources';
import config from '../resources/global_config';

module.exports.props = {
  requiresElevation: config.elevation_names.moderator,
  description: "display the media invites",
  usage: "<title> | <time>"
};

module.exports.run = async (client: any, message: Message, args: string[]) => {
  await message.delete();

  let mediaRole = message.guild.roles.find(role => role.name === "media");

  if (args.length == 1 && args[0].toLowerCase().trim() === "done") {
    const guildMembers: GuildMember[] = await message.guild.members.fetch().then(guildmemberstore => Array.from(guildmemberstore.values()));

    for (let i = 0; i < guildMembers.length; i++) if (guildMembers[i].roles.has(mediaRole.id)) guildMembers[i].roles.remove(mediaRole);

    return;
  }

  let reactEmoji: string = "✅";

  let mediaName: string;
  let mediaTime: string;
  let medialDetails: string;
  await rsrc.askQuestion(message.member, message.channel as TextChannel, "What is the title of the media you will be streaming?", true).then(response => {
    mediaName = response;
  });

  await rsrc.askQuestion(message.member, message.channel as TextChannel, "What time will you be streaming?", true).then(response => {
    mediaTime = response;
  });

  const details = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=56ccfefa&t=${mediaName.split(" ").join("+")}`).then(content => content.json());
  if (!details) {
    await rsrc.askQuestion(message.member, message.channel as TextChannel, "Add any further details, or enter 'none' to continue", true).then(response => {
      medialDetails = response;
    });
  } else {
    medialDetails = details["Plot"];
  }

  let embed = new MessageEmbed();
  embed.setTitle("🎬   **MEDIA ALERT**   🎬");
  embed.addField("STREAMING", mediaName, true);
  embed.addField("AT", mediaTime, true);

  if (medialDetails?.toLowerCase().trim() !== "none") embed.addField("DETAILS", medialDetails);

  embed.setDescription(`\`\`\`React with ${reactEmoji} to join!\`\`\``);

  await message.channel.send(embed).then(async message => {
    await message.react(reactEmoji);

    const filter = (reaction: MessageReaction, user: User): true => {
      let pass = reaction.emoji.toString() === reactEmoji;
      if (!pass) return;

      let member = message.guild.members.find(member => member.user.id === user.id);
      if (member.roles.find(role => role.name === "bot")) return;

      member.roles.add(message.guild.roles.find(role => role.name === "media"));

      let hangout: TextChannel = message.guild.channels.find(channel => channel.name === "movie-hangout") as TextChannel;
      hangout.send(`Welcome ${member} to the hangout!  Get prepared to join us for **${mediaName}** over in the movie room at **${mediaTime}**!`);
    };

    message.createReactionCollector(filter);
  });
};
