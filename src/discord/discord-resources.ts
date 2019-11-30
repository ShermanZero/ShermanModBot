import { Client, Guild, GuildMember, Message, Role, TextChannel, User } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";
import DiscordConfig from "./configs/discord_config";
import { MemberConfigType } from "./@interfaces/@member_config";
import MemberConfig from "./configs/member_config";
import { Ranks } from "./@interfaces/@ranks";
import { ArgumentsNotFulfilled } from "../shared/extensions/error/error-extend";

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

    username = username.replace(/[^\w\s]/gi, "").toLowerCase();

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
  static getMemberConfigFromName(client: Client, message: Message, username: string, search: boolean = false): MemberConfigType {
    if (!client || !message || !username) {
      new ArgumentsNotFulfilled(...arguments);
      return null;
    }

    return DiscordResources.getMemberConfigFromNameWithGuild(client, message.guild as Guild, message, username, search);
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
  static getMemberConfigFromNameWithGuild(client: Client, guild: Guild, message: Message, username: string, search: boolean = false): MemberConfigType {
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

    username = username.trim().toLowerCase();

    let jsonFile = path.join(this.getGuildDirectoryFromGuild(guild), username, username + ".json");
    if (!fs.existsSync(jsonFile)) {
      if (!search) return null;

      let possibleMatches: string[] = [];
      let guildMembers = client.getGuildMembers(this.getGuildNameFromGuild(guild));

      const keys = Array.from<string>(guildMembers.keys());
      for (const guildUserUsername of keys) {
        if (guildUserUsername.includes(username)) possibleMatches.push(guildUserUsername);
      }

      if (possibleMatches.length > 1) {
        let listOfUsers = "";
        for (let i = 0; i < possibleMatches.length; i++) listOfUsers += `${i + 1})\t**${possibleMatches[i]}**\n`;

        message.reply(`there are multiple members which contain "${username}", please select the correct one:\n${listOfUsers}`).then(() => {
          message.channel
            .awaitMessages((response: Message) => response.author === message.author, {
              max: 1,
              time: 1000 * 60,
              errors: ["time"]
            })
            .then(collected => {
              let answer = parseInt(collected.first().content);
              if (answer < 1 || answer > possibleMatches.length) {
                message.reply("you did not enter a valid number, no member has been selected");
                return;
              }

              username = possibleMatches[answer - 1];
              jsonFile = path.join(this.getGuildDirectoryFromGuild(guild), username, username + ".json");
            })
            .catch(() => {
              message.reply("you did not respond in time, no member has been selected");
              return null;
            });
        });
      } else if (possibleMatches.length == 1) {
        username = possibleMatches[0];
        jsonFile = path.join(this.getGuildDirectoryFromGuild(guild), username, username + ".json");
      } else {
        return null;
      }
    }

    if (!fs.existsSync(jsonFile)) return null;

    let json = fs.readFileSync(jsonFile);
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

    let memberConfig = new MemberConfig();
    memberConfig.hidden.username = this.getUsernameFromMember(member);
    memberConfig.hidden.guildname = this.getGuildNameFromGuild(guild);

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
          memberConfig.rank.xp = Ranks.info[rank];

          for (let level in Ranks.levels) {
            if ((Ranks.levels[level as string] as string).toLowerCase() === rank) {
              memberConfig.rank.level = parseInt(level);
              memberConfig.rank.levelup = this.getXPToLevelUp(memberConfig.rank.xp, memberConfig.rank.level);

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
   * @param {boolean} [deleteMessage=true] (optional) whether or not to delete the message `default=true`
   * @param {boolean} [allowOtherMembers=false] (optional) whether or not to allow other members to respond `default=false`
   * @param [options={ max: 1, time: 60 * 1000, errors: ["time"] }] (optional) the options to pass `default={max: 1, time: 60000, errors: ["time"]}`
   */
  static async askQuestion(
    member: GuildMember,
    channel: TextChannel,
    question: string,
    deleteMessage: boolean = true,
    allowOtherMembers: boolean = false,
    options = { max: 1, time: 60 * 1000, errors: ["time"] }
  ): Promise<string> {
    if (!member || !channel || !question) {
      new ArgumentsNotFulfilled(...arguments);
      return null;
    }
    let value: any;

    let questionMessage: Message;
    await channel.send(question).then(message => {
      questionMessage = message;
    });

    const filter = (response: Message): boolean => {
      return response.member === member;
    };

    await channel
      .awaitMessages(allowOtherMembers ? filter : () => true, options)
      .then(async collected => {
        value = collected.first()?.content;
        value = (value as string).replace(/[<>@&#]/g, "");

        if (deleteMessage) await questionMessage.delete();

        await collected.first()?.delete();
      })
      .catch(collected => {
        channel.send("No answer was given in time");
      });

    return value;
  }
}
