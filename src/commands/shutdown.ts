import { Message } from 'discord.js';

import config from '../resources/global_config';

module.exports.props = {
  requiresElevation: config.elevation_names.botowner,
  description: "shuts the bot down immediately"
};

module.exports.run = async (client: any, message: Message, args: string[]) => {
  let exitCode = 1;
  if (args.length == 1 && args[0].toLowerCase().includes("force")) exitCode = 2;

  process.exit(exitCode);
};
