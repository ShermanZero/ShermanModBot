import { Client, Message } from "discord.js";
import { CommandType, ElevationTypes } from "../@interfaces/@commands";

const props: CommandType["properties"] = {
  elevation: ElevationTypes.botowner,
  description: "shuts the bot down cleanly"
};

const run: CommandType["function"] = async (client: Client, message: Message, ...args: any[]): Promise<boolean> => {
  let exitCode = 1;
  if (args.length == 1 && args[0].toLowerCase().includes("force")) exitCode = 2;

  process.exit(exitCode);
};

module.exports.run = run;
module.exports.props = props;
