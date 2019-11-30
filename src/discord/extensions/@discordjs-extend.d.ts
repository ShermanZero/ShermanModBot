import { DiscordConfigType } from "../@interfaces/@discord_config";
import { MemberConfigType } from "../@interfaces/@member_config";
import { CommandType } from "../@interfaces/@commands";
import { GuildConfigType } from "../@interfaces/@guild_config";
import { Guild } from "discord.js";

declare module "discord.js" {
  interface Client {
    defaultGuild: Guild;
    discordConfig: DiscordConfigType;
    members_in_session: Map<string, any>;
    guild_configs: Map<string, GuildConfigType>;
    commands: Map<string, any>;
    aliases: Map<string, string>;
    masterLog: Array<string>;
    ready: boolean;
    alreadyShutdown: boolean;

    getGuild(guildname: string): string;
    getGuildConfig(guild: Guild): GuildConfigType;
    updateMember(config: MemberConfigType): boolean;
    registerMember(config: MemberConfigType): boolean;
    hideMemberInfo(config: MemberConfigType): any;
    hasMember(guild: Guild, username: string, search?: boolean): string;
    getMemberConfig(guild: Guild, username: string): MemberConfigType;
    removeMember(guild: Guild, username: string): boolean;
    deleteMember(guild: Guild, username: string): boolean;
    getCommand(commandName: string): any;
  }
}

export {};
