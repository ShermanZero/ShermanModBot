import "./types/discordjs-extend";
import "./types/string-extend";
import "colors";

import { Client } from "discord.js";
import * as fs from "fs";
import * as path from "path";

import secrets from "./secrets";

let client: Client = new Client();
loadEventsAndCommands();

client.login(secrets.token);

/**
 * Loads the events and commands for the bot
 */
function loadEventsAndCommands(): void {
  let eventsPath = path.join(__dirname, "events");
  fs.readdir(eventsPath, function(err, files) {
    if (err) return String(err).error();
    files.forEach(function(file) {
      if (!file.endsWith(".js")) return;
      let event = require(path.join(__dirname, "events", file)) as Function;
      let eventName = file.split(".")[0];

      `--registering event ${eventName}`.print();
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(path.join(__dirname, "events", file))];
    });
  });

  let commandsPath = path.join(__dirname, "commands");
  fs.readdir(commandsPath, function(err, files) {
    if (err) return String(err).error();
    files.forEach(function(file) {
      if (!file.endsWith(".js")) return;

      let command: any = require(path.join(commandsPath, file));
      let commandName = file.split(".")[0];

      `--registering command ${commandName.cyan}`.print();

      //store the command
      client.commands.set(commandName, command);

      //store the aliases as well
      command.aliases?.forEach((alias: string) => {
        client.aliases.set(alias, commandName);
      });

      "--completed".success();
    });
  });
}
