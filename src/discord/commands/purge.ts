import { Client, Message, TextChannel } from "discord.js";
import { CommandType } from "../@interfaces/@commands";
import { GuildElevationTypes } from "../@interfaces/@guild_config";

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.moderator,
  description: "removes a maximum of 100 messages from a channel",
  usage: "<?amount> <?member>",
  aliases: ["clear"]
};

const run: CommandType["run"] = async (client: Client, message: Message, ...args: any): Promise<boolean> => {
  const member = message.mentions?.members?.first();

  //parse amount
  let amount = !!parseInt(message.content.split(" ")[1]) ? parseInt(message.content.split(" ")[1]) : parseInt(message.content.split(" ")[2]);

  if (!amount || amount > 100) amount = 100;
  if (amount < 2) amount = 2;

  //fetch 100 messages (will be filtered and lowered up to max amount requested)
  (message.channel as TextChannel).messages.fetch({ limit: 100 }).then(
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
