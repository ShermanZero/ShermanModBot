import { Guild } from "discord.js";
import { DiscordConfigType } from "./@discord_config";
import { MemberConfigType } from "./@member_config";
import { CommandType } from "./@commands";

declare module "discord.js" {
  interface Client {
    defaultGuild: Guild;
    discordConfig: DiscordConfigType;
    members_in_session: Map<string, any>;
    guild_configs: Map<string, any>;
    commands: Map<string, any>;
    aliases: Map<string, string>;
    masterLog: Array<string>;
    ready: boolean;
    alreadyShutdown: boolean;

    getGuild(guildname: string): string;
    getGuildConfig(guild: Guild): any;
    updateMember(config: MemberConfigType): boolean;
    registerMember(config: MemberConfigType): boolean;
    hideMemberInfo(config: MemberConfigType): any;
    hasMember(guild: Guild, username: string, search?: boolean): string;
    getMemberConfig(guild: Guild, username: string): MemberConfigType;
    removeMember(guild: Guild, username: string): boolean;
    deleteMember(guild: Guild, username: string): boolean;
    getCommand(commandName: string): CommandType;
  }
}

export {};
