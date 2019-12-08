import { Client, Guild, GuildMember, Message, MessageReaction, Role, TextChannel, User } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

import { ArgumentsNotFulfilled } from "../shared/extensions/error/error-extend";
import { GuildConfigType } from "./@interfaces/@guild_config";
import { MemberConfigType } from "./@interfaces/@member_config";
import { Ranks } from "./@interfaces/@ranks";
import DiscordConfig from "./configs/discord_config";
import MemberConfig from "./configs/member_config";

/**
 * Multiple resources dealing with handling members/users/guilds and more
 *
 * @class Resources
 */
export default class DiscordResources {
  /**
   * Returns the username from a message
   *
   * @param {Message} message the Discord message
   * @returns {string} username
   */
  static getUsernameFromMessage(message: Message): string {
    if (!message) {
      new ArgumentsNotFulfilled(...arguments);
      return null;
    }

    let username: string;
    if (message.member) username = message.member.user.tag.replace("#", "_");
    else return null;

    if (username) username = username.replace(/[^\w\s]/gi, "").toLowerCase();

    return username;
  }

  /**
   * Gets the username from a member of a guild, a user, or simply a username not parsed
   *
   * @param {GuildMember | User | string} member either a `GuildMember`, `User`, or the username
   * @returns {string} username
   */
  static getUsernameFromMember(member: GuildMember | User | string): string {
    if (!member) {
      new ArgumentsNotFulfilled(...arguments);
      return null;
    }

    let username: string;
    if (member instanceof GuildMember) username = member.user.tag;
    else if (member instanceof User) username = member.tag;
    else username = member;

    if (username)
      username = username
        .replace("#", "_")
        .replace(/[^\w\s]/gi, "")
        .toLowerCase();

    return username;
  }

  /**
   * Returns a member's directory
   *
   * @param {Guild} guild a Discord `Guild`
   * @param {string} username the member's username
   * @returns {string} the directory
   */
  static getMemberDirectoryFromGuild(guild: Guild, username: string): string {
    if (!guild || !username) {
      new ArgumentsNotFulfilled(...arguments);
      return null;
    }

    return path.join(this.getGuildDirectoryFromGuild(guild), username);
  }

  /**
   * Retrieves a member's config from their username
   *
   * @param {*} client the Discord client
   * @param {Message} message the `Message`
   * @param {string} username the username
   * @param {boolean} [search=false] whether or not to do a recursive search for the member given the incomplete username
   */
  static async getMemberConfigFromName(client: Client, message: Message, username: string, search: boolean = false): Promise<MemberConfigType> {
    if (!client || !message || !username) {
      new ArgumentsNotFulfilled(...arguments);
      return null;
    }

    return await DiscordResources.getMemberConfigFromNameWithGuild(client, message.guild as Guild, message, username, search);
  }

  /**
   * Retrieves a member's config from their username and specified guild
   *
   * @param {Client} client the Discord client
   * @param {Guild} guild the Discord `Guild`
   * @param {Message} message the Discord `Message`
   * @param {string} username the username
   * @param {boolean} [search=false] whether or not to do a recursive search for the member given the incomplete username
   */
  static async getMemberConfigFromNameWithGuild(client: Client, guild: Guild, message: Message, username: string, search: boolean = false): Promise<MemberConfigType> {
    if (!client) {
      new ArgumentsNotFulfilled(...arguments);
      return null;
    }

    if (!guild) {
      if (!message) {
        new ArgumentsNotFulfilled(...arguments);
        return null;
      }

      guild = message.guild;
    }

    if (username) username = username.trim().toLowerCase();
    else username = null;

    let jsonFile: string;
    if (username) jsonFile = path.join(this.getGuildDirectoryFromGuild(guild), username, username + ".json");
    if (!username || !fs.existsSync(jsonFile)) {
      if (!search) return null;

      let possibleMatches: string[] = [];
      let guildMembers = client.getGuildMembers(this.getGuildNameFromGuild(guild));

      const keys = Array.from<string>(guildMembers.keys());
      for (const guildUserUsername of keys) {
        if (guildUserUsername.includes(username)) possibleMatches.push(guildUserUsername);
      }

      if (possibleMatches.length > 1) {
        let listOfUsers = "```";
        for (let i = 0; i < possibleMatches.length; i++) listOfUsers += `${i + 1})\t${possibleMatches[i]}\n`;
        listOfUsers += "```";

        const response = (await this.askQuestion(message.member, message.channel as TextChannel, `there are multiple members which contain "${username}", please select the correct one:\n${listOfUsers}`, {
          deleteMessages: true,
          allowOtherMembers: false
        })) as string;

        username = possibleMatches[parseInt(response) - 1];
      } else if (possibleMatches.length == 1) {
        username = possibleMatches[0];
      } else {
        return null;
      }
    }

    jsonFile = path.join(this.getGuildDirectoryFromGuild(guild), username, username + ".json");
    if (!fs.existsSync(jsonFile)) return null;

    let json = fs.readFileSync(jsonFile);
    if (!json) return null;

    let config = JSON.parse(json.toString()) as MemberConfigType;

    return config;
  }

  /**
   * Returns a guild's name from a `Guild`
   *
   * @param {Guild} guild the Discord `Guild`
   * @returns {string} the name of the `Guild`
   */
  static getGuildNameFromGuild(guild: Guild): string {
    if (!guild) {
      new ArgumentsNotFulfilled(...arguments);
      return null;
    }

    let guildName = guild.name.replace(/[\W\s]/gi, "_");
    return `${guildName}-(${guild.id})`;
  }

  /**
   * Returns a guild's directory from a `Guild`
   *
   * @param {Guild} guild the Discord `Guild`
   * @returns {string} the directory of the `Guild`
   */
  static getGuildDirectoryFromGuild(guild: Guild): string {
    if (!guild) {
      new ArgumentsNotFulfilled(...arguments);
      return null;
    }

    return path.join(__dirname, "..", "discord", "guilds", this.getGuildNameFromGuild(guild));
  }

  /**
   * Returns a guild's directory from the name of a `Guild`
   *
   * @param {string} guildname the name of a Discord `Guild`
   * @returns {string} the directory of the `Guild`
   */
  static getGuildDirectoryFromName(guildname: string): string {
    if (!guildname) {
      new ArgumentsNotFulfilled(...arguments);
      return null;
    }

    return path.join(__dirname, "..", "discord", "guilds", guildname);
  }

  /**
   * Creates a member's directory
   *
   * @param {Client} client the Discord `Client`
   * @param {Guild} guild the Discord `Guild`
   * @param {GuildMember} member the Discord `GuildMember`
   */
  static createMemberDirectory(client: Client, guild: Guild, member: GuildMember): any {
    if (!client || !guild || !member) {
      new ArgumentsNotFulfilled(...arguments);
      return null;
    }

    const guildConfig: GuildConfigType = client.getGuildConfig(guild);

    let memberConfig = new MemberConfig();
    memberConfig.hidden.username = this.getUsernameFromMember(member);
    memberConfig.hidden.guildname = this.getGuildNameFromGuild(guild);

    const allRoles = Object.keys(guildConfig.role_names);
    allRoles.forEach(roleName => {
      if (member.roles.find(role => role.name === guildConfig.role_names[roleName])) {
        (memberConfig.permissions as { [key: string]: boolean })[roleName] = true;
      }
    });

    `Attempting to create new member directory for [${memberConfig.hidden.username}] in guild [${memberConfig.hidden.guildname}]`.inverse.print(true);

    let date = member.joinedAt;
    let joinedAt = `${date!.getMonth() + 1}/${date!.getDate()}/${date!.getFullYear()}`;
    memberConfig.misc.joined = joinedAt;

    let dir = this.getMemberDirectoryFromGuild(guild, memberConfig.hidden.username);

    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(`${dir}/${memberConfig.hidden.username}.json`, JSON.stringify(memberConfig, null, "\t"));
    fs.mkdirSync(`${dir}/logs`, { recursive: true });

    let rolesMemberHas = member.roles.keyArray();
    let rankRolesUserHas: Role[] = [];

    //if the member already has pre-existing roles
    if (rolesMemberHas.length != 0) {
      `Member already has pre-existing roles: [${rolesMemberHas.join(", ").cyan}]`.print(true);

      let entries = Object.entries(Ranks.info);

      for (let i = 0; i < entries.length; i++) {
        let rank = entries[i][0].toLowerCase();
        `  --Checking if member has role [${rank.yellow}]`.print(true);

        let role = member.roles.find(role => role.name.toLowerCase() === rank);

        if (role) {
          `    --${`Assigning ${rank.cyan} to member`.inverse}`.print(true);
          rankRolesUserHas.push(role);

          memberConfig.rank.name = rank;

          let xpParsed = Ranks.info[rank];
          memberConfig.rank.xp = xpParsed;

          for (let level in Ranks.levels) {
            if ((Ranks.levels[level as string] as string).toLowerCase() === rank) {
              let levelParsed = parseInt(level);

              memberConfig.rank.level = levelParsed;
              memberConfig.rank.levelup = this.getXPToLevelUp(xpParsed, levelParsed);
              memberConfig.rank.rankup = levelParsed + 5;

              break;
            }
          }
        }
      }
    }

    rankRolesUserHas.splice(-1, 1);
    rankRolesUserHas.forEach(async role => {
      `  --Removing previous role [${role.name.yellow}]`.print(true);
      await member.roles.remove(role);
    });

    client.registerMember(memberConfig);

    return memberConfig;
  }

  /**
   * Destroys a member's directory
   *
   * @param {Guild} guild the Discord `Guild`
   * @param {string} username the member's username
   */
  static destroyMemberDirectory(guild: Guild, username: string): boolean {
    if (!guild || !username) {
      new ArgumentsNotFulfilled(...arguments);
      return false;
    }

    let source = this.getMemberDirectoryFromGuild(guild, username);
    rimraf(source, (err): boolean => {
      if (err) {
        err.stack.error();
        return false;
      }

      return true;
    });

    return true;
  }

  /**
   * Writes the member's config to their file
   *
   * @param {Client} client the Discord `Client`
   * @param {string} username the member's username
   * @param {MemberConfigType} config the member's config
   */
  static writeMemberConfigToFile(client: Client, username: string, config: MemberConfigType): any {
    if (!client || !username || !config) {
      new ArgumentsNotFulfilled(...arguments);
      return null;
    }

    Object.defineProperty(config, "hidden", {
      enumerable: true
    });

    let dir = path.join(this.getGuildDirectoryFromName(config.hidden.guildname), username);

    if (!fs.existsSync(dir)) return `Attempted to write [${username}'s] log, but no directory exists at [${dir}]`.error();

    if (config.memberLog && config.memberLog.length != 0) {
      for (let i = 0; i < config.memberLog.length; i++) fs.appendFileSync(`${dir}/logs/${new DiscordConfig().logs.all}`, config.memberLog[i]);

      config.memberLog = [];
    }

    fs.writeFileSync(`${dir}/${username}.json`, JSON.stringify(config, null, "\t"));
  }

  /**
   * Returns the amount of XP required to level up
   *
   * @param {number} xp the current xp
   * @param {number} level the current level
   */
  static getXPToLevelUp(xp: number, level: number): number {
    if (!xp || !level) {
      new ArgumentsNotFulfilled(...arguments);
      return -1;
    }

    return xp + Math.round((4 * Math.pow(level, 3)) / 5);
  }

  /**
   * Asks a question and awaits a response
   *
   * @param {GuildMember} member the Discord `GuildMember`
   * @param {TextChannel} channel the Discord `TextChannel`
   * @param {string} question the question to ask
   * @param options (optional) `replyTo: null, deleteMessage: true, allowOtherMembers: false, yesOrNo: false, timeOutTime: 60`
   */
  static async askQuestion(member: GuildMember, channel: TextChannel, question: string, options?: { replyTo?: Message; deleteMessages?: boolean; allowOtherMembers?: boolean; yesOrNo?: boolean; timeOutTime?: number }): Promise<string | boolean> {
    if (!member || !channel || !question) {
      new ArgumentsNotFulfilled(...arguments);
      return null;
    }

    if (!options) {
      options = {};

      options.replyTo = null;
      options.deleteMessages = true;
      options.allowOtherMembers = false;
      options.yesOrNo = false;
      options.timeOutTime = 60;
    }

    let filter, collected, value: string | boolean;

    let questionMessages: Array<Message>;
    if (options.replyTo) {
      questionMessages = ((await options.replyTo.reply(question, { split: true })) as unknown) as Array<Message>;
    } else {
      questionMessages = ((await channel.send(question, { split: true })) as unknown) as Array<Message>;
    }

    if (options.yesOrNo) {
      const reactYes = "✅";
      const reactNo = "❎";

      filter = (reaction: MessageReaction): boolean => {
        if (!options.allowOtherMembers && !reaction.users.find(user => user.id === member.user.id)) return false;

        let passYes = reaction.emoji.toString() === reactYes;
        let passNo = reaction.emoji.toString() === reactNo;
        if (!passYes && !passNo) return false;

        value = passYes || passNo;
        return true;
      };

      const lastMessage = questionMessages.pop();
      await lastMessage.react(reactYes);
      await lastMessage.react(reactNo);

      collected = await lastMessage.awaitReactions(filter, { max: 1, time: options.timeOutTime * 1000, errors: ["time"] }).catch(error => {
        channel.send("You did not react to the message in time");
      });

      if (collected) {
        const reaction = collected.first();

        if (reaction.emoji.name === reactYes) {
          return true;
        } else if (reaction.emoji.name === reactNo) {
          return false;
        }
      } else {
        return null;
      }
    } else if (!options.yesOrNo) {
      filter = (response: Message): boolean => {
        if (response.author.bot) return false;
        if (!options.allowOtherMembers && response.author.id !== member.user.id) return false;

        return true;
      };

      collected = await channel.awaitMessages(filter, { max: 1, time: options.timeOutTime * 1000, errors: ["time"] }).catch(error => {
        channel.send("You did not reply in time");
      });

      if (collected) {
        value = collected.first()?.content;
        value = value.replace(/[<>@&#]/g, "");

        await collected.first()?.delete();
      }
    }

    if (options.deleteMessages) {
      questionMessages.forEach(async (message: Message) => {
        await message.delete();
      });
    }

    if (!collected) return null;

    return value;
  }
}
