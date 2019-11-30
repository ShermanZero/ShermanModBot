import { Client, Message } from "discord.js";
import { CommandType } from "../@interfaces/@commands";
import { GuildElevationTypes } from "../@interfaces/@guild_config";

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.botowner,
  description: "shuts the bot down cleanly"
};

const run: CommandType["run"] = async (client: Client, message: Message, args: any): Promise<boolean> => {
  let exitCode = 1;
  if (args.length == 1 && args[0].toLowerCase().includes("force")) exitCode = 2;

  await message.delete();

  process.exit(exitCode);
};

module.exports.run = run;
module.exports.properties = properties;
