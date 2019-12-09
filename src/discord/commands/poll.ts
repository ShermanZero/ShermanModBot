import { Client, Message, MessageEmbed, MessageReaction, TextChannel, User } from "discord.js";

import { CommandType } from "../@utilities/@commands";
import { GuildElevationTypes } from "../@utilities/@guild_config";
import rsrc from "../resources";

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.moderator,
  description: "creates a poll members can react to",
  usage: ""
};

const run: CommandType["run"] = async (client: Client, message: Message, args: string[]): Promise<boolean> => {
  let title = await rsrc.askQuestion(message.member, message.channel as TextChannel, "what do you want the title of the poll to be?", {
    replyTo: message,
    deleteMessages: true
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
    embed.setDescription("REACT WITH YOUR VOTE");

    for (let i = 0; i < options.length; i++) {
      embed.addField(`${optionsEmojis[i]}  ${options[i]}`, "VOTES: " + voteCount[i]);
    }

    return embed;
  };

  let embedMessage = await message.channel.send(getEmbed());
  if (embedMessage) for (let i = 0; i < options.length; i++) embedMessage.react(optionsEmojis[i]);

  const filter = (reaction: MessageReaction, user: User): boolean => {
    if (user.bot) return false;

    if (optionsEmojis.indexOf(reaction.emoji.toString()) === -1) return false;

    voteCount = voteCount.fill(0);

    console.log(embedMessage.reactions);

    embedMessage.edit(getEmbed());
    return true;
  };
  embedMessage.createReactionCollector(filter);

  return true;
};

module.exports.run = run;
module.exports.properties = properties;
