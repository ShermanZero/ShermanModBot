require("colors");

const fs = require("fs");
const path = require("path");
const ranks = require(path.join(__dirname, "..", "resources", "ranks", "ranks.json"));

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

  static getUserDirectoryFromGuild(guild, username) {
    return path.join(this.getGuildDirectoryFromGuild(guild), username);
  }

  static getUserContentsFromName(guild, username) {
    username = username.trim().toLowerCase();

    let jsonFile = path.join(this.getGuildDirectoryFromGuild(guild), username, username+".json");

    if(!fs.existsSync(jsonFile)) return null;

    let json = fs.readFileSync(jsonFile);
    let content = JSON.parse(json);

    return content;
  }

  static getGuildNameFromGuild(guild) {
    let guildName = guild.name.replace(/[\W\s]/gi, "_");
    return `${guildName}-(${guild.id})`;
  }

  static getGuildDirectoryFromGuild(guild) {
    return path.join(__dirname, "..", "users", this.getGuildNameFromGuild(guild));
  }

  static getGuildDirectoryFromName(guildName) {
    return path.join(__dirname, "..", "users", guildName);
  }

  //creates the user directory
  static createUserDirectory(client, guild, member) {
    let basePath = path.join(__dirname, "..", "users", "content.json");
    let json = fs.readFileSync(basePath);
    let content = JSON.parse(json);

    content.hidden.username = this.getUsernameFromMember(member);
    content.hidden.guildname = this.getGuildNameFromGuild(guild);

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
      message.member.removeRole(role).catch((err) => { console.log(err) });
    });

    client.registerUser(content);

    return content;
  }

  static writeUserContentToFile(client, username, content) {
    Object.defineProperty(content, "hidden", {
      enumerable: true
    });

    let dir = path.join(this.getGuildDirectoryFromName(content.hidden.guildname), username);

    if(!fs.existsSync(dir)) return console.error(`Attempted to write [${username}] contents to log, but no directory exists at [${dir}]`);
    
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
