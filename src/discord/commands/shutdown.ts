import { Client, Message } from "discord.js";
import { CommandType } from "../@utilities/@commands";
import { GuildElevationTypes } from "../@utilities/@guild_config";

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.botowner,
  description: "shuts the bot down cleanly",
  usage: "<?force>"
};

const run: CommandType["run"] = async (client: Client, message: Message, args: string[]): Promise<boolean> => {
  const force = args.length > 0 ? args[0].toLowerCase().includes("force") : false;

  if (message) await message.delete();

  if (!force) await client.writeAllData();

  client.shutdown = true;
  process.exit(force ? 2 : 1);
};

module.exports.run = run;
module.exports.properties = properties;
