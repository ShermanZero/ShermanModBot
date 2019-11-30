import { Client, Message } from "discord.js";
import { CommandType, ElevationTypes } from "../@interfaces/@commands";

class Say implements CommandType {
  props = {
    requiresElevation: ElevationTypes.everyone,
    description: "makes the bot say your message",
    usage: "<message>"
  };

  async run(client: Client, message: Message, ...args: any[]): Promise<boolean> {
    const sayMessage = args.join(" ");

    await message.delete();
    await message.channel.send(sayMessage);

    return true;
  }

  getEmbed?(...args: any[]): import("discord.js").MessageEmbed {
    throw new Error("Method not implemented.");
  }
}

module.exports = Say;
