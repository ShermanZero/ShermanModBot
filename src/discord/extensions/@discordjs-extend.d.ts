import { DiscordConfigType } from "../@interfaces/@discord_config";
import { MemberConfigType } from "../@interfaces/@member_config";
import { CommandType } from "../@interfaces/@commands";
import { GuildConfigType } from "../@interfaces/@guild_config";
import { Guild } from "discord.js";

declare module "discord.js" {
  interface Client {
    /**
     * The default guild
     */
    defaultGuild: Guild;
    /**
     * The DiscordConfig file
     */
    discordConfig: DiscordConfigType;
    /**
     * A map of all members in the session
     */
    members_in_session: Map<string, any>;
    /**
     * A map of all the guild configurations
     */
    guild_configs: Map<string, GuildConfigType>;
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
     * Returns the gulid from the guild's name
     *
     * @param guildName the guild's name
     */
    getGuild(guildname: string): string;
    /**
     * Returns the guild config from the guild
     *
     * @param guild the Discord `Guild`
     */
    getGuildConfig(guild: Guild): GuildConfigType;
    /**
     * Updates the stored member data
     *
     * @param config the member's config
     */
    updateMember(config: MemberConfigType): boolean;
    /**
     * Registers the member and stores them in the `Client`
     *
     * @param config the member's config
     */
    registerMember(config: MemberConfigType): boolean;
    /**
     * Hides a member's info (tag)
     *
     * @param config the member's config
     */
    hideMemberInfo(config: MemberConfigType): any;
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
