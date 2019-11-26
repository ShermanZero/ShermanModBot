import { Message } from 'discord.js';

module.exports.props = {
  requiresElevation: "owner",
  description: "shuts the bot down immediately"
};

module.exports = async (client: any, message: Message, args: string[]) => {
  let exitCode = 1;
  if (args.length == 1 && args[0].toLowerCase().includes("force")) exitCode = 2;

  process.exit(exitCode);
};
