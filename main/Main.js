require("colors");

const Discord = require('discord.js');
const path = require("path");
const client = new Discord.Client();
const config = require(path.join(__dirname, "resources", "config.json"));
const fs = require("fs");
const Resources = require(path.join(__dirname, "classes", "Resources.js"));
const Enmap = require("enmap");

init();
start();

client.login(config.token);

function init() {
  client.config = config;

  client.usersInSession = new Map();
  client.guildsInSession = new Map();

  client.masterLog = [];

  client.getGuild = (guildName) => {
    return client.usersInSession.get(guildName);
  };

  client.updateUser = (content) => {
    let userObj = {};
    userObj[content.hidden.username] = {
      content: content
    };

    let guildName = content.hidden.guildname;
    client.usersInSession.set(guildName, userObj);

    Object.defineProperty(content, "hidden", {
      enumerable: false
    });
  };

  client.registerUser = (content) => {
    client.updateUser(content);
    console.log(`   -Registered [${content.hidden.username.magenta}] to guild [${content.hidden.guildname.magenta}]`);
  };
 
  client.hasUser = (guild, username) => {
    let userGuild = client.usersInSession.get(Resources.getGuildNameFromGuild(guild));
    if(!userGuild) return false;

    return userGuild[username] !== null;
  };

  client.getUser = (guild, username) => {
    let userGuild = client.usersInSession.get(Resources.getGuildNameFromGuild(guild));
    if(!userGuild) return null;

    return userGuild[username];
  }

  client.getUserContent = (guild, username) => {
    let user = client.getUser(guild, username);

    if(user) return user.content;
    return null;
  }

  client.removeUser = (guild, username) => {
    let userGuild = client.usersInSession.get(Resources.getGuildNameFromGuild(guild));
    if (!userGuild) return;

    userGuild.delete(username);
  }
}

function start() {
  let eventsPath = path.join(__dirname, "events");
  fs.readdir(eventsPath, (err, files) => {
    if(err) return console.error(err);

    files.forEach(file => {
      if(!file.endsWith(".js")) return;

      const event = require(path.join(__dirname, "events", file));

      let eventName = file.split(".")[0];

      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(path.join(__dirname, "events", file))];
    })
  });

  client.commands = new Enmap();

  let commandsPath = path.join(__dirname, "commands");
  fs.readdir(commandsPath, (err, files) => {
    if(err) return console.error(err);

    files.forEach(file => {
      if(!file.endsWith(".js")) return;

      let props = require(path.join(__dirname, "commands", file));
      let commandName = file.split(".")[0];

      client.commands.set(commandName, props);
    })
  });
}
