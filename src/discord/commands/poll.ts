import { Client, Message, MessageEmbed, MessageReaction, TextChannel, User } from 'discord.js';

import { CommandType } from '../@interfaces/@commands';
import { GuildElevationTypes } from '../@interfaces/@guild_config';
import rsrc from '../resources';

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.moderator,
  description: "creates a poll members can react to",
  usage: ""
};

const run: CommandType["run"] = async (client: Client, message: Message, args: string[]): Promise<boolean> => {
  let title = await rsrc.askQuestion(message.member, message.channel as TextChannel, "what do you want the title of the poll to be?", {
    replyTo: message
  });

  if (title === null) return false;

  let option,
    options: string[] = [];
  do {
    option = (await rsrc.askQuestion(message.member, message.channel as TextChannel, "Enter a poll option or enter 'none' to finish")) as string;

    if (option.toLowerCase().trim() !== "none") {
      options.push(option);
    } else {
      break;
    }
  } while (true);

  if (options.length === 0) return false;
  const optionsEmojis = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
  let voteCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const getEmbed = (): MessageEmbed => {
    let embed = new MessageEmbed();
    embed.setTitle(title);

    let embedField: string = "";
    for (let i = 0; i < options.length; i++) embedField += `${optionsEmojis[i]}: ${options[i]}\tVOTES: ${voteCount[i]}\n`;

    embed.addField("REACT WITH YOUR VOTE", embedField);
    return embed;
  };

  let embedMessage = await message.channel.send(getEmbed());
  if (embedMessage) for (let i = 0; i < options.length; i++) embedMessage.react(optionsEmojis[i]);

  const filter = (reaction: MessageReaction, user: User): boolean => {
    let index = optionsEmojis.indexOf(reaction.emoji.toString());
    if (index === -1) return false;

    voteCount[index] += 1;

    embedMessage.edit(getEmbed());
    return true;
  };
  embedMessage.createReactionCollector(filter);

  return true;
};

module.exports.run = run;
module.exports.properties = properties;
