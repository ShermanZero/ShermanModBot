import { Client, Message } from "discord.js";
import { DiscordConfig } from "../../shared/configs/discord_config";

let discordConfig: DiscordConfig;

module.exports.props = {
  requiresElevation: discordConfig.elevation_names.botowner,
  description: "shuts the bot down immediately"
};

module.exports.run = async (client: Client, message: Message, args: string[]): Promise<boolean> => {
  let exitCode = 1;
  if (args.length == 1 && args[0].toLowerCase().includes("force")) exitCode = 2;

  process.exit(exitCode);
};
