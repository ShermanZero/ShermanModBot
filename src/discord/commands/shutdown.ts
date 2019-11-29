import { Client, Message } from "discord.js";

module.exports.props = {
  requiresElevation: DiscordConfig.elevation_names.botowner,
  description: "shuts the bot down immediately"
};

module.exports.run = async (client: Client, message: Message, args: string[]): Promise<boolean> => {
  let exitCode = 1;
  if (args.length == 1 && args[0].toLowerCase().includes("force")) exitCode = 2;

  process.exit(exitCode);
};
