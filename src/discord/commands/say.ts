import { Client, Message } from "discord.js";
import { CommandType } from "../@utilities/@commands";
import { GuildElevationTypes } from "../@utilities/@guild_config";

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.everyone,
  description: "makes the bot say your message",
  usage: "<message>"
};

const run: CommandType["run"] = async (client: Client, message: Message, args: string[]): Promise<boolean> => {
  const sayMessage = args.join(" ");

  await message.delete();
  await message.channel.send(sayMessage);

  return true;
};

module.exports.run = run;
module.exports.properties = properties;
