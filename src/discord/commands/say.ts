import { Client, Message } from "discord.js";
import { CommandType, ElevationTypes } from "../@interfaces/@commands";

const props: CommandType["properties"] = {
  elevation: ElevationTypes.everyone,
  description: "makes the bot say your message",
  usage: "<message>"
};

const run: CommandType["run"] = async (client: Client, message: Message, ...args: any[]): Promise<boolean> => {
  const sayMessage = args.join(" ");

  await message.delete();
  await message.channel.send(sayMessage);

  return true;
};

module.exports.run = run;
module.exports.props = props;
