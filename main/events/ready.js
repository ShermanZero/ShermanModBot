require("colors");

const fs = require("fs");
const path = require("path");
const Resources = require(path.join(__dirname, "..", "classes", "Resources.js"));
const ExitHandler = require(path.join(__dirname, "..", "classes", "ExitHandler.js"));
const Enmap = require("enmap");

module.exports = (client) => {
  client.user.setActivity(client.config.status);

  let bootFile = path.join(__dirname, "..", "resources", "misc", "boot.txt");
  let data = fs.readFileSync(bootFile, "utf8");
  console.log(data.brightRed);

  ExitHandler.init(client);

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
    let guildDir = Resources.getGuildDirectoryFromGuild(guild);

    if (!fs.existsSync(guildDir))
      fs.mkdirSync(guildDir);
    else if(guild.deleted)
      return fs.rmdirSync(guildDir);

    let guildName = Resources.getGuildNameFromGuild(guild);

    //set the guild data to to the guild name
    client.guildsInSession.set(guildName, guild);
    console.log(`*Registered [${guildName.magenta}] to session`);

    fs.readdirSync(guildDir).forEach(dir => {
      let username = dir;

      //if the client does not have the user registered
      if (!client.hasUser(guild, username)) {
        let content = Resources.getUserContentsFromName(guild, username);
        if (content == null) return;

        client.registerUser(content);
      }
    });

    console.log(`...\nReady to serve in ${client.channels.size.toString().green} channel(s) on ${client.guilds.size.toString().green} guild(s), for a total of ${client.users.size.toString().green} users.\n`);
  });
}
