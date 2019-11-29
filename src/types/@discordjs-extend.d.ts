import * as Discord from "discord.js";

declare module "discord.js" {
  interface Client {
    defaultGuild: Guild;
    secrets: any;
    global_config: any;
    usersInSession: Map<string, any>;
    guild_configs: Map<string, any>;
    commands: Map<string, any>;
    aliases: Map<string, string>;
    masterLog: Array<string>;
    ready: boolean;
    alreadyShutdown: boolean;

    getGuild(guildname: string): string;
    updateMember(content: any): boolean;
    registerMember(content: any): boolean;
    hideMemberInfo(content: any): any;
    hasMember(guild: Discord.Guild, username: string, search?: boolean): string;
    getMemberContent(guild: Discord.Guild, username: string): any;
    removeMember(guild: Discord.Guild, username: string): boolean;
    deleteMember(guild: Discord.Guild, username: string): boolean;
    getCommand(commandName: string): any;
  }
}

export {};
