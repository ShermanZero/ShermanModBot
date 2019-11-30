import { Client, Message } from "discord.js";
import { GuildElevationTypes } from "./@guild_config";

export interface CommandType {
  run: (client: Client, message: Message, ...args: any) => Promise<boolean>;
  custom?: {
    [index: string]: any;
    nameOfFunction?: (client: Client, ...args: any) => any;
  };
  properties: {
    elevation: GuildElevationTypes;
    description: string;
    usage?: string;
    aliases?: string[];
  };
}
