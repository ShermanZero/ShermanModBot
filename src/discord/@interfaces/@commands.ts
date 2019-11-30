import { Client, Message } from "discord.js";

export interface CommandType {
  function: (client: Client, message: Message, ...args: any[]) => Promise<boolean>;
  properties: {
    elevation: boolean;
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
