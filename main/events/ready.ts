import 'colors';

import * as fs from 'fs';
import * as path from 'path';

import exit from '../classes/ExitHandler';
import rsrc from '../classes/Resources';

module.exports = (client) => {
  client.user.setActivity(client.config.status);

  let bootFile = path.join(__dirname, "..", "resources", "misc", "boot.txt");
  let data: string = fs.readFileSync(bootFile, "utf8");
  console.log(data.red);

  exit.init(client);

  let commandArray = client.commands.keyArray().sort();
  console.log(`Loaded ${commandArray.length.toString().magenta} command(s)`, "[@everyone]".green, "[@moderator]".yellow, "[@owner]".red);

  for(var i = 0; i < commandArray.length; i++) {
    var commandName = commandArray[i];
    var command = client.commands.get(commandName);

    commandName = `[${commandName}]`;

    if(command.props.requiresElevation && command.props.requiresElevation === client.config.elevation_names.moderator)
      console.log(commandArray[i].yellow + " - " + command.props.description);
    else if (command.props.requiresElevation && command.props.requiresElevation === client.config.elevation_names.owner)
      console.log(commandArray[i].red + " - " + command.props.description);
    else
      console.log(commandArray[i].green + " - " + command.props.description);
  }

  console.log("...");

  client.guilds.forEach(guild => {
    let guildDir = rsrc.getGuildDirectoryFromGuild(guild);

    if (!fs.existsSync(guildDir)) {
      fs.mkdirSync(guildDir);
      fs.mkdirSync(path.join(guildDir, client.config.files.removed));
    }
    else if(guild.deleted)
      return fs.rmdirSync(guildDir);

    let guildName = rsrc.getGuildNameFromGuild(guild);

    //set the guild data to to the guild name
    client.usersInSession[guildName] = {};
    console.log(`*Registered [${guildName.magenta}] to session --- looking for existing members:`);

    fs.readdirSync(guildDir).forEach(dir => {
      let username = dir;

      //if the client does not have the user registered
      if (!client.hasUser(guild, username)) {
        let content = rsrc.getUserContentsFromNameWithGuild(guild, null, username);
        if (content === null || typeof content === "undefined") return;

        process.stdout.write("  ");
        client.registerUser(content);
      }
    });

    console.log(`Found all existing members of [${guildName.magenta}] (currently ${(Object.keys(client.getGuild(guildName)).length).toString().green})`);
  });

  let readyMessage = `Ready to serve in ${client.channels.size} channel(s) on ${client.guilds.size} guild(s), for a total of ${client.users.size} users`.inverse;
  let footer = "=====================================================================================".red;

  console.log(`...\n${readyMessage}\n${footer}`);
}
