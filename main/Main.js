const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./resources/config.json");
const Enmap = require("enmap");
const fs = require("fs");

const RaceManager = require("./classes/RaceManager.js");

client.config = config;
client.usersInSession = new Enmap();
client.masterLog = [];
client.guild = null;

start();

client.login(config.token);

function start() {
  fs.readdir("./events/", (err, files) => {
    if(err) return console.error(err);

    files.forEach(file => {
      if(!file.endsWith(".js")) return;

      const event = require(`./events/${file}`);

      let eventName = file.split(".")[0];

      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
    })
  });

  client.commands = new Enmap();

  fs.readdir("./commands/", (err, files) => {
    if(err) return console.error(err);

    files.forEach(file => {
      if(!file.endsWith(".js")) return;

      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];

      client.commands.set(commandName, props);
    })
  });

}

function readCommands() {
  var str = "";
  while(str.toLowerCase().trim() !== "exit") {
    str = InputHandler.readInput("> ").toLowerCase().trim();
    this.doCommand(str);
  }
}

function doCommand(command) {
  switch(command) {
    case "race": {
      console.log("resources: " + this.resources);
      var rm = new RaceManager(this.resources);
      rm.startRace();
      break;
    }
    case "exit": {
      process.exit();
      break;
    }
    default: console.log("! COMMAND NOT RECOGNIZED !");
  }
}
