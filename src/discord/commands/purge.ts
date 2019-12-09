import { Client, Message, TextChannel } from "discord.js";
import { CommandType } from "../@utilities/@commands";
import { GuildElevationTypes } from "../@utilities/@guild_config";

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.moderator,
  description: "removes a maximum of 100 messages from a channel",
  usage: "<?amount> <?@member>",
  aliases: ["clear"]
};

const run: CommandType["run"] = async (client: Client, message: Message, args: string[]): Promise<boolean> => {
  const member = message.mentions?.members?.first();

  let amount: number = parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1]);
  if (!amount || amount > 100) amount = 100;
  if (amount < 2) amount = 2;

  await message.delete();

  //fetch up to 100 messages (will be filtered and lowered up to max amount requested)
  (message.channel as TextChannel).messages.fetch({ limit: amount }).then(
    async (messages: any): Promise<boolean> => {
      if (member) {
        const filterBy = member ? member.id : client.user.id;
        messages = messages
          .filter((m: Message) => m.author.id === filterBy)
          .array()
          .slice(0, amount);
      }

      await message.channel.bulkDelete(messages);
      return true;
    }
  );

  return true;
};

module.exports.run = run;
module.exports.properties = properties;
