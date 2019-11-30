import { Client, Message } from "discord.js";

export interface CommandType {
  run: (client: Client, message: Message, ...args: any[]) => Promise<boolean>;
  custom: {
    [index: string]: any;
    nameOfFunction?: (client: Client, ...args: any[]) => any;
  };
  properties: {
    elevation: ElevationTypes;
    description: string;
    usage?: string;
    aliases?: string[];
  };
}

export enum ElevationTypes {
  botowner = "BOTOWNER",
  administrator = "ADMINISTRATOR",
  moderator = "MODERATOR",
  everyone = "EVERYONE"
}
