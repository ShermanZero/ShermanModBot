import * as Discord from 'discord.js';

declare module "discord.js" {
  interface Client {
    defaultGuild: Guild;
    secrets: any,
    global_config: any;
    usersInSession: Map<string, any>;
    guild_configs: Map<string, any>;
    commands: Map<string, any>;
    aliases: Map<string, string>;
    masterLog: Array<string>;

    getGuild(guildname: string): string;
    updateUser(content: any): boolean;
    registerUser(content: any): boolean;
    hideUserInfo(content: any): any;
    hasUser(guild: Discord.Guild, username: string, search?: boolean): string;
    getUserContent(guild: Discord.Guild, username: string): any;
    removeUser(guild: Discord.Guild, username: string): boolean;
    deleteUser(guild: Discord.Guild, username: string): boolean;
    getCommand(commandName: string): any;
  }
}

export {};
