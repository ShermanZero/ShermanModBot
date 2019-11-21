require("colors");

const fs = require("fs");
const path = require("path");
const User = require(path.join(__dirname, "..", "classes", "User.js"));
const ExitHandler = require(path.join(__dirname, "..", "classes", "ExitHandler.js"));

module.exports = (client) => {
  client.user.setActivity(client.config.status);

  let bootFile = path.join(__dirname, "..", "resources", "misc", "boot.txt");
  let data = fs.readFileSync(bootFile, "utf8");
  console.log(data.brightRed);

  ExitHandler.init(client);

  let commandArray = client.commands.keyArray().sort();
  console.log(`Loaded ${commandArray.length} command(s)`, "[anyone]".green, "[moderator]".yellow, "[owner]".red);

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

  console.log(`...\nReady to serve in ${client.channels.size.toString().green} channel(s) on ${client.guilds.size.toString().green} server(s), for a total of ${client.users.size.toString().green} users.\n`);

  let userDir = path.join(__dirname, "..", "users");
  fs.readdirSync(userDir).forEach(dir => {
    let user = dir;

    if(!client.usersInSession.has(user)) {
      let content = User.getUserContentsFromName(user);
      if(content == null)
        return;

      client.usersInSession.set(user, content);
      console.log(`*Registered [${user}] to session`.gray);
    }
  });
}
