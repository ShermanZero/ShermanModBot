import { Client, GuildMember, Message, MessageEmbed, MessageReaction, TextChannel, User } from "discord.js";
import fetch from "node-fetch";

import rsrc from "../resources";
import { CommandType } from "../@interfaces/@commands";
import { GuildElevationTypes } from "../@interfaces/@guild_config";

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.moderator,
  description: "creates a movie invite",
  usage: "<?done>",
  aliases: ["media"]
};

const run: CommandType["run"] = async (client: Client, message: Message, args: string[]): Promise<boolean> => {
  await message.delete();

  let mediaRole = message.guild.roles.find(role => role.name === "movie");
  let mediaNotifyRole = message.guild.roles.find(role => role.name === "movie-notifications");
  const guildMembers: GuildMember[] = await message.guild.members.fetch().then(guildmemberstore => Array.from(guildmemberstore.values()));

  if (args.length == 1 && args[0].toLowerCase().trim() === "done") {
    for (let i = 0; i < guildMembers.length; i++) if (guildMembers[i].roles.has(mediaRole.id)) guildMembers[i].roles.remove(mediaRole);
    return true;
  }

  let reactToJoinEmoji: string = "✅";
  let reactToNotifyEmoji: string = "🔔";
  let reactToRemoveEmoji: string = "🔕";

  let mediaDetails: string;
  const mediaName = (await rsrc.askQuestion(message.member, message.channel as TextChannel, "What is the title of the movie that will be streamed?")) as string;

  const mediaTime = (await rsrc.askQuestion(message.member, message.channel as TextChannel, "What time will the movie start?")) as string;

  const details = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=56ccfefa&t=${mediaName.split(" ").join("+")}`).then(content => content.json());
  if (!details) {
    mediaDetails = (await rsrc.askQuestion(message.member, message.channel as TextChannel, "Add any further details, or enter 'none' to continue")) as string;
  } else {
    mediaDetails = details["Plot"];
  }

  let embed = new MessageEmbed();
  embed.setTitle(`🎬    🎬    **${mediaName.toUpperCase()}**    🎬    🎬`);
  embed.addField("STREAMING", mediaName, true);
  embed.addField("AT", mediaTime, true);

  if (mediaDetails && mediaDetails?.toLowerCase().trim() !== "none") embed.addField("DETAILS", mediaDetails);
  let hangout: TextChannel = message.guild.channels.find(channel => channel.name === "movie-hangout") as TextChannel;

  (await hangout.send(embed)).pin();

  embed.setDescription(`\`\`\`React with ${reactToJoinEmoji} to join!\nReact with ${reactToNotifyEmoji} to be notified in the future!\nReact with ${reactToRemoveEmoji} to unsubscribe from notifications\`\`\``.toUpperCase());

  await message.channel.send(embed).then(async message => {
    await message.react(reactToJoinEmoji);
    await message.react(reactToNotifyEmoji);
    await message.react(reactToRemoveEmoji);

    const filter = (reaction: MessageReaction, user: User): boolean => {
      let passJoin = reaction.emoji.toString() === reactToJoinEmoji;
      let passNotify = reaction.emoji.toString() === reactToNotifyEmoji;
      let passRemove = reaction.emoji.toString() === reactToRemoveEmoji;
      if (!passJoin && !passNotify && !passRemove) return false;

      let member = message.guild.members.find(member => member.user.id === user.id);
      if (member.roles.find(role => role.name === "bot")) return false;

      if (passJoin) {
        member.roles.add(mediaRole);

        hangout.send(`Welcome ${member} to the hangout!  Get prepared to join us for **${mediaName}** over in the movie room at **${mediaTime}**!`);
      }

      if (passNotify) {
        member.roles.add(mediaNotifyRole);
        message.channel.send(`Awesome!  ${member} you will be notified the next time a movie event is created!  (Make sure you have Server DMs enabled in your privacy settings)`);
      }

      if (passRemove) {
        member.roles
          .remove(mediaNotifyRole)
          .then(() => {
            message.channel.send(`${member} you will no longer be notified of movie events`);
          })
          .catch(reason => {});
      }

      return true;
    };

    message.createReactionCollector(filter);
  });

  //bot testing channel
  if (message.channel.id === "642167914518282250") return true;

  for (let i = 0; i < guildMembers.length; i++)
    if (guildMembers[i].roles.has(mediaNotifyRole.id)) await guildMembers[i].send(`Hey!  A movie alert for **${mediaName}** was just posted in **${message.guild.name}**, in the **${message.channel.toString()}** channel!`).catch(reason => {});

  return true;
};

module.exports.run = run;
module.exports.properties = properties;
