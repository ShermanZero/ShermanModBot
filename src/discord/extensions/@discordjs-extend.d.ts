import { DiscordConfigType } from "../@interfaces/@discord_config";
import { MemberConfigType } from "../@interfaces/@member_config";
import { CommandType } from "../@interfaces/@commands";
import { GuildConfigType } from "../@interfaces/@guild_config";
import { Guild } from "discord.js";

declare module "discord.js" {
  interface Client {
    /**
     * The master guild
     */
    masterGuild: string;
    /**
     * The DiscordConfig file
     */
    discordConfig: DiscordConfigType;
    /**
     * A map of all members in the session, where `key: guildname` and `value: Map<membername, MemberConfigType>`
     */
    membersInSession: Map<string, Map<string, MemberConfigType>>;
    /**
     * A map of all the guild configurations, where `key: guildname` and `value: GuildConfigType`
     */
    guildsInSession: Map<string, GuildConfigType>;
    /**
     * A map of all the global commands
     */
    commands: Map<string, CommandType>;
    /**
     * A map of all the global aliases
     */
    aliases: Map<string, string>;
    /**
     * An array containing all logs
     */
    masterLog: Array<string>;
    /**
     * Whether or not the `Client` is ready
     */
    ready: boolean;
    /**
     * Whether or not we have already attempted to shut down
     */
    alreadyShutdown: boolean;

    /**
     * Registers a guild with the stored cache
     *
     * @param guildConfig the guild config object
     */
    registerGuild(guildName: string, guildConfig: GuildConfigType): GuildConfigType;
    /**
     * Returns the cached guild from the name
     *
     * @param guildName the guild's name
     */
    getGuildMembers(guildName: string): Map<string, MemberConfigType>;
    /**
     *
     *
     * @param guildName the name of the guild
     * @param guildMembers the members of the guild as a `Map<string, MemberConfigType>`
     */
    setGuildMembers(guildName: string, guildMembers: Map<string, MemberConfigType>): Map<string, Map<string, MemberConfigType>>;
    /**
     * Returns the guild config from the guild
     *
     * @param guild the Discord `Guild`
     */
    getGuildConfig(guild: Guild): GuildConfigType;
    /**
     * Sets the guild config of a guild
     *
     * @param guildName the guild's name
     * @param guildConfig the guild's `GuildConfig`
     */
    setGuildConfig(guildName: string, guildConfig: GuildConfigType): boolean;
    /**
     * Updates the stored member data
     *
     * @param memberConfig the member's config
     */
    updateMember(memberConfig: MemberConfigType): MemberConfigType;
    /**
     * Registers the member and stores them in the `Client`
     *
     * @param memberConfig the member's config
     */
    registerMember(memberConfig: MemberConfigType): MemberConfigType;
    /**
     * Returns if the client has a member stored in the cache
     *
     * @param guild the Discord `Guild`
     * @param username the member's username
     * @param search (optional) whether or not to recursively search given an incomplete username
     */
    hasMember(guild: Guild, username: string, search?: boolean): string;
    /**
     * Gets a stored member's config
     *
     * @param guild the Discord `Guild`
     * @param username the member's username
     */
    getMemberConfig(guild: Guild, username: string): MemberConfigType;
    /**
     * Removes the member from the stored cache
     *
     * @param guild the Discord `Guild`
     * @param username the member's username
     */
    removeMember(guild: Guild, username: string): boolean;
    /**
     * Deletes a member completely from the server
     *
     * @param guild the Discord `Guild`
     * @param username the member's username
     */
    deleteMember(guild: Guild, username: string): boolean;
    /**
     * Adds a command to the cache, and automatically loads its aliases
     *
     * @param commandName the command's name
     * @param command the command as a `CommandType` object
     */
    addCommand(commandName: string, command: CommandType): boolean;
    /**
     * Adds an alias to a command
     *
     * @param commandName the command's name
     * @param commandAlias the command's alias
     */
    addAlias(commandName: string, commandAlias: string): boolean;
    /**
     * Returns a command stored in the cache
     *
     * @param commandName the command's name
     */
    getCommand(commandName: string): CommandType;
    /**
     * Returns a command's main run function
     *
     * @param commandName the command's name
     */
    getCommandRun(commandName: string): CommandType["run"];
    /**
     * Returns a command's custom function
     *
     * @param commandName the command's name
     * @param customFunction the command's custom function
     */
    getCommandCustom(commandName: string, customFunction: string): CommandType["custom"]["nameOfFunction"];
    /**
     * Returns a command's properties
     *
     * @param commandName the command's name
     */
    getCommandProperties(commandName: string): CommandType["properties"];
  }
}

export {};
