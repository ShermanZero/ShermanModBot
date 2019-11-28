import 'colors';

import * as Discord from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';

import global_config from './resources/global_config';

let client: Discord.Client = new Discord.Client();

start();

client.login(global_config.token);

function start() {
  let eventsPath = path.join(__dirname, "events");
  fs.readdir(eventsPath, function(err, files) {
    if (err) return console.error(err);
    files.forEach(function(file) {
      if (!file.endsWith(".js")) return;
      let event = require(path.join(__dirname, "events", file)) as Function;
      let eventName = file.split(".")[0];

      console.log("--registering event", eventName);
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(path.join(__dirname, "events", file))];
    });
  });

  let commandsPath = path.join(__dirname, "commands");

  fs.readdir(commandsPath, function(err, files) {
    if (err) return console.error(err);
    files.forEach(function(file) {
      if (!file.endsWith(".js")) return;

      let command: any = require(path.join(__dirname, "commands", file));
      let commandName = file.split(".")[0];

      console.log("--registering command", commandName, command);

      //store the command
      client.commands.set(commandName, command);

      //store the aliases as well
      command.aliases?.forEach((alias: string) => {
        client.aliases.set(alias, commandName);
      });

      console.log("--set command", commandName, command);
    });
  });
}
