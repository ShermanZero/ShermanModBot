import 'colors';

import { Guild, Message } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';

import exit from '../classes/ExitHandler';
import rsrc from '../classes/Resources';
import boot from '../resources/boot';

module.exports = (client: any) => {
  client.user.setActivity(client.config.status);

  console.log(boot.red);

  exit.init(client);

  let commandArray: string[] = [...client.commands.keys()].sort();
  console.log(`Loaded ${commandArray.length.toString().magenta} command(s)`, "[@everyone]".green, "[@moderator]".yellow, "[@owner]".red);

  for (var i = 0; i < commandArray.length; i++) {
    var commandName = commandArray[i];
    var command = client.commands.get(commandName);

    commandName = `[${commandName}]`;

    if (command.props.requiresElevation && command.props.requiresElevation === client.config.elevation_names.moderator) console.log(commandArray[i].yellow + " - " + command.props.description);
    else if (command.props.requiresElevation && command.props.requiresElevation === client.config.elevation_names.owner) console.log(commandArray[i].red + " - " + command.props.description);
    else console.log(commandArray[i].green + " - " + command.props.description);
  }

  console.log("...");

  client.guilds.forEach((guild: Guild) => {
    let guildDir = rsrc.getGuildDirectoryFromGuild(guild);

    if (!fs.existsSync(guildDir)) {
      fs.mkdirSync(guildDir, { recursive: true });
      fs.mkdirSync(path.join(guildDir, client.config.files.removed), {
        recursive: true
      });
    }
    let guildName = rsrc.getGuildNameFromGuild(guild);

    //set the guild data to to the guild name
    client.usersInSession[guildName] = {};
    console.log(`*Registered [${guildName.magenta}] to session --- looking for existing members:`);

    fs.readdirSync(guildDir).forEach(dir => {
      let username = dir;

      //if the client does not have the user registered
      if (!client.hasUser(guild, username)) {
        let content = rsrc.getUserContentsFromNameWithGuild(client, guild, (null as unknown) as Message, username);
        if (content === null || typeof content === "undefined") return;

        process.stdout.write("  ");
        client.registerUser(content);
      }
    });

    console.log(`Found all existing members of [${guildName.magenta}] (currently ${Object.keys(client.getGuild(guildName)).length.toString().green})`);
  });

  let readyMessage = `Ready to serve in ${client.channels.size} channel(s) on ${client.guilds.size} guild(s), for a total of ${client.users.size} users`.inverse;
  let footer = "=====================================================================================".red;

  console.log(`...\n${readyMessage}\n${footer}`);
};
