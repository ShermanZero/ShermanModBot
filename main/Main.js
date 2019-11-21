const Discord = require('discord.js');
const path = require("path");
const client = new Discord.Client();
const config = require(path.join(__dirname, "resources", "config.json"));
const Enmap = require("enmap");
const fs = require("fs");

client.config = config;
client.usersInSession = new Enmap();
client.masterLog = [];

start();

client.login(config.token);

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
