import { Client, Message } from "discord.js";
import { MessageEmbed } from "discord.js";
export interface CommandType {
  props: {
    requiresElevation?: ElevationTypes;
    description: string;
    usage?: string;
    aliases?: string[];
  };

  run(client: Client, message: Message, ...args: any[]): Promise<boolean>;
  getEmbed?(...args: any[]): MessageEmbed;
}

export enum ElevationTypes {
  botowner = "BOTOWNER",
  administrator = "ADMINISTRATOR",
  moderator = "MODERATOR",
  everyone = "EVERYONE"
}
