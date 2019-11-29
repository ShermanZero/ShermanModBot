import { Client, Message } from "discord.js";
import { CommandType, ElevationTypes } from "../types/@commands";

class Shutdown implements CommandType {
  props: {
    requiresElevation?: ElevationTypes.botowner;
    description: "shuts the bot down cleanly";
  };

  async run(client: Client, message: Message, ...args: any[]): Promise<boolean> {
    let exitCode = 1;
    if (args.length == 1 && args[0].toLowerCase().includes("force")) exitCode = 2;

    process.exit(exitCode);
  }

  getEmbed?(...args: any[]): import("discord.js").MessageEmbed {
    throw new Error("Method not implemented.");
  }
}

module.exports = Shutdown;
