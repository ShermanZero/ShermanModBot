import 'colors';

import { Guild, GuildMember, Message, Role, TextChannel } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

import ranks from './ranks';
import def from './user_config';

export default class Resources {
  static getUsernameFromMessage(message: Message): any {
    let username: string;
    if (message.member) username = message.member.user.tag.replace("#", "_");
    else return null;

    username = username.replace(/[^\w\s]/gi, "").toLowerCase();

    return username;
  }

  static getUsernameFromMember(member: any): string {
    let username = member.user ? member.user.tag : member.tag;
    username = username
      .replace("#", "_")
      .replace(/[^\w\s]/gi, "")
      .toLowerCase();

    return username;
  }

  static getUserDirectoryFromGuild(guild: Guild, username: string): string {
    return path.join(this.getGuildDirectoryFromGuild(guild), username);
  }

  static getUserContentsFromName(client: any, message: Message, username: string, search: boolean = false): any {
    return Resources.getUserContentsFromNameWithGuild(client, message.guild as Guild, message, username, search);
  }

  static getUserContentsFromNameWithGuild(client: any, guild: Guild, message: Message, username: string, search: boolean = false) {
    if (!guild) guild = message.guild as Guild;
    username = username.trim().toLowerCase();

    let jsonFile = path.join(this.getGuildDirectoryFromGuild(guild), username, username + ".json");

    if (!fs.existsSync(jsonFile)) {
      if (!search) return null;

      let possibleMatches: string[] = [];

      let users = this.getGuildUsersFromGuild(client, guild);

      const keys = Object.keys(users);

      for (const guildUserUsername of keys) {
        if (guildUserUsername.includes(username)) possibleMatches.push(guildUserUsername);
      }

      if (possibleMatches.length > 1) {
        let listOfUsers = "";
        for (let i = 0; i < possibleMatches.length; i++) listOfUsers += `${i + 1})\t**${possibleMatches[i]}**\n`;

        message.reply(`there are multiple users which contain "${username}", please select the correct one:\n${listOfUsers}`).then(() => {
          message.channel
            .awaitMessages((response: Message) => response.author === message.author, {
              max: 1,
              time: 1000 * 60,
              errors: ["time"]
            })
            .then(collected => {
              let answer = parseInt(collected.first().content);
              if (answer < 1 || answer > possibleMatches.length) {
                message.reply("you did not enter a valid number, no user has been selected");
                return;
              }

              username = possibleMatches[answer - 1];
              jsonFile = path.join(this.getGuildDirectoryFromGuild(guild), username, username + ".json");
            })
            .catch(() => {
              message.reply("you did not respond in time, no user has been selected");
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
    let content = JSON.parse(json.toString());

    return content;
  }

  static getGuildNameFromGuild(guild: Guild): string {
    let guildName = guild.name.replace(/[\W\s]/gi, "_");
    return `${guildName}-(${guild.id})`;
  }

  static getGuildDirectoryFromGuild(guild: Guild): string {
    return path.join(__dirname, "..", "guilds", this.getGuildNameFromGuild(guild));
  }

  static getGuildDirectoryFromName(guildname: string): string {
    return path.join(__dirname, "..", "guilds", guildname);
  }

  static getGuildUsersFromGuild(client: any, guild: any): any {
    let entries = Object.entries(client.usersInSession);

    for (const [guildname, users] of entries) if (guildname == this.getGuildNameFromGuild(guild)) return users;

    return null;
  }

  //creates the user directory
  static createUserDirectory(client: any, guild: Guild, member: GuildMember): any {
    let content: any = def;

    content.hidden.username = this.getUsernameFromMember(member);
    content.hidden.guildname = this.getGuildNameFromGuild(guild);

    let date = member.joinedAt;
    let joinedAt = `${date!.getMonth() + 1}/${date!.getDate()}/${date!.getFullYear()}`;
    content.misc.joined = joinedAt;

    let dir = this.getUserDirectoryFromGuild(guild, content.hidden.username);

    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(`${dir}/${content.hidden.username}.json`, JSON.stringify(content, null, "\t"));
    fs.mkdirSync(`${dir}/logs`, { recursive: true });

    let rolesUserHas = member.roles;
    let rankRolesUserHas: Role[] = [];

    //if the user already has pre-existing roles
    if (rolesUserHas.array.length != 0) {
      let entries = Object.entries(ranks._info);

      for (let i = 0; i < entries.length; i++) {
        let rank = entries[i][0].toLowerCase();
        let role = member.roles.find(role => role.name.toLowerCase() === rank);

        if (role) {
          rankRolesUserHas.push(role);

          content.rank.name = rank;
          content.rank.xp = ranks._info[rank];

          for (let level in ranks.levels) {
            if (ranks.levels[level].toLowerCase() === rank) {
              content.rank.level = parseInt(level);
              content.rank.levelup = this.getXPToLevelUp(content.rank.xp, content.rank.level);

              break;
            }
          }
        }
      }
    }

    rankRolesUserHas.splice(-1, 1);
    rankRolesUserHas.forEach(async role => {
      await member.roles.remove(role);
    });

    client.registerUser(content);

    return content;
  }

  static destroyUserDirectory(guild: Guild, username: string): boolean {
    let source = this.getUserDirectoryFromGuild(guild, username);
    rimraf(source, err => {
      if (err) {
        err.error();
        return false;
      }
    });

    return true;
  }

  static writeUserContentToFile(client: any, username: string, content: any) {
    Object.defineProperty(content, "hidden", {
      enumerable: true
    });

    let dir = path.join(this.getGuildDirectoryFromName(content.hidden.guildname), username);

    if (!fs.existsSync(dir)) return `Attempted to write [${username}] contents to log, but no directory exists at [${dir}]`.error();

    if (content.userLog && content.userLog.length != 0) {
      for (let i = 0; i < content.userLog.length; i++) fs.appendFileSync(`${dir}/logs/${client.global_config.files.logs.all}`, content.userLog[i]);

      content.userLog = [];
    }

    fs.writeFileSync(`${dir}/${username}.json`, JSON.stringify(content, null, "\t"));
  }

  static getXPToLevelUp(xp: number, level: number): number {
    return xp + Math.round((4 * Math.pow(level, 3)) / 5);
  }

  static async askQuestion(member: GuildMember, channel: TextChannel, question: string, deleteMessage: boolean = false, allowOtherMembers: boolean = true, options = { max: 1, time: 60 * 1000, errors: ["time"] }) {
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
