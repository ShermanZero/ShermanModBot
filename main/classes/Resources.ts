import "colors";
import * as Discord from "discord.js"
import fs from "fs";
import path from "path";
import ranks from "../resources/ranks/ranks.json";
import rimraf from "rimraf";

class Resources {

  static getUsernameFromMessage(message) {
    let username = message.member.user.tag.replace("#", "_");
    username = username.replace(/[^\w\s]/gi, '').toLowerCase();

    return username;
  }

  static getUsernameFromMember(member) {
    let username = member.user ? member.user.tag : member.tag;
    username = username.replace("#", "_").replace(/[^\w\s]/gi, '').toLowerCase();

    return username;
  }

  static getUserDirectoryFromGuild(guild: any, username: string) {
    return path.join(this.getGuildDirectoryFromGuild(guild), username);
  }

  static getUserContentsFromName(message: any, username: string, search: boolean = false): any {
    console.log("username", username);

    return Resources.getUserContentsFromName(message.guild, message, username, search);
  }

  static getUserContentsFromName(guild: any, message: any, username: string, search: boolean): any {
    if(!guild) guild = message.guild;
    console.log("username", username);

    username = username.trim().toLowerCase();

    let jsonFile = path.join(this.getGuildDirectoryFromGuild(guild), username, username + ".json");

    if (!fs.existsSync(jsonFile)) {
      if (!search) return null;

      let possibleMatches = [];

      let users = this.getGuildUsersFromGuild(guild);
      for (let guildUserUsername in Object.keys(users))
        if (guildUserUsername.includes(username))
          possibleMatches.push(guildUserUsername);

      if(possibleMatches.length > 1) {
        let listOfUsers = "";
        for(var i = 0; i < possibleMatches.length; i++)
          listOfUsers += `${i+1}) ${possibleMatches[i]}`;

        message.reply(`there are multiple users which contain [${username}], please select the correct one:\n${listOfUsers}`)
          .then(() => {
            message.channel.awaitMessages(response => response.author === message.author, {
              max: 1,
              time: 1000 * 60,
              errors: ['time']
            })
              .then((collected) => {
                let answer = parseInt(collected.first().content).catch((err) => { console.log(err) });
                if(answer < 1 || answer > possibleMatches.length) {
                  message.reply("you did not enter a valid number, no user has been selected");
                  return;
                }

                username = possibleMatches[answer - 1];
                jsonFile = path.join(this.getGuildDirectoryFromGuild(guild), username, username + ".json");
              })
              .catch(() => {
                message.reply("you did not respond in time, no user has been selected");
                return null;
              })
          })
      }
    }  

    let json = fs.readFileSync(jsonFile);
    let content = JSON.parse(json.toString());

    return content;
  }

  static getGuildNameFromGuild(guild) {
    let guildName = guild.name.replace(/[\W\s]/gi, "_");
    return `${guildName}-(${guild.id})`;
  }

  static getGuildDirectoryFromGuild(guild) {
    return path.join(__dirname, "..", "users", this.getGuildNameFromGuild(guild));
  }

  static getGuildDirectoryFromName(guildname) {
    return path.join(__dirname, "..", "users", guildname);
  }

  static getGuildUsersFromGuild(client, guild) {
    let entries = Object.entries(client.usersInSession);

    for (const [guildname, users] of entries)
      if(guildname == this.getGuildNameFromGuild(guild))
        return users;

    return null;
  }

  //creates the user directory
  static createUserDirectory(client, guild, member) {
    let basePath = path.join(__dirname, "..", "users", "content.json");
    let json = fs.readFileSync(basePath);
    let content = JSON.parse(json.toString());

    content.hidden.username = this.getUsernameFromMember(member);
    content.hidden.guildname = this.getGuildNameFromGuild(guild);

    let date = member.joinedAt;
    let joinedAt = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    content.misc.joined = joinedAt;

    let dir = this.getUserDirectoryFromGuild(guild, content.hidden.username);

    fs.mkdirSync(dir);
    fs.writeFileSync(`${dir}/${content.hidden.username}.json`, JSON.stringify(content, null, "\t"));
    fs.mkdirSync(`${dir}/logs`);

    let rolesUserHas = member.roles;
    let rankRolesUserHas = [];

    //if the user already has pre-existing roles
    if(rolesUserHas.length != 0) {
      let entries = Object.entries(ranks._info);

      for(var i = 0; i < entries.length; i++) {
        let rank = entries[i][0].toLowerCase();
        let role = member.roles.find(role => role.name.toLowerCase() === rank);

        if (role) {
          rankRolesUserHas.push(role);

          content.rank.name = rank;
          content.rank.xp = ranks._info[rank];

          for (var level in ranks.levels) {
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
    rankRolesUserHas.forEach((role) => {
      member.removeRole(role).catch((err) => { console.log(err) });
    });

    client.registerUser(content);

    return content;
  }

  static destroyUserDirectory(guild, username) {
    let source = this.getUserDirectoryFromGuild(guild, username);
    rimraf(source, (err) => {
      if (err) console.log(err);
    });
  }

  static writeUserContentToFile(client, username, content) {
    Object.defineProperty(content, "hidden", {
      enumerable: true
    });

    let dir = path.join(this.getGuildDirectoryFromName(content.hidden.guildname), username);

    if(!fs.existsSync(dir)) return console.error(`!! Attempted to write [${username}] contents to log, but no directory exists at [${dir}]`.red);
    
    if(content.userLog && content.userLog.length != 0) {
      for(var i = 0; i < content.userLog.length; i++)
        fs.appendFileSync(`${dir}/logs/${client.config.files.log_all}`, content.userLog[i]);

      content.userLog = [];
    }

    fs.writeFileSync(`${dir}/${username}.json`, JSON.stringify(content, null, "\t"));
  }

  static getXPToLevelUp(xp, level) {
    return xp + Math.round((4 * Math.pow(level, 3)) / 5);
  }
}

module.exports = Resources;
