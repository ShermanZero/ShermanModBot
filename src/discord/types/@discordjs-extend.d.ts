import { Guild } from "discord.js";
import { MemberConfig } from "../configs/member_config";

declare module "discord.js" {
  interface Client {
    defaultGuild: Guild;
    members_in_session: Map<string, any>;
    guild_configs: Map<string, any>;
    commands: Map<string, any>;
    aliases: Map<string, string>;
    masterLog: Array<string>;
    ready: boolean;
    alreadyShutdown: boolean;

    getGuild(guildname: string): string;
    getGuildConfig(guild: Guild): any;
    updateMember(config: MemberConfig): boolean;
    registerMember(config: MemberConfig): boolean;
    hideMemberInfo(config: MemberConfig): any;
    hasMember(guild: Guild, username: string, search?: boolean): string;
    getMemberConfig(guild: Guild, username: string): MemberConfig;
    removeMember(guild: Guild, username: string): boolean;
    deleteMember(guild: Guild, username: string): boolean;
    getCommand(commandName: string): any;
  }
}

export {};
