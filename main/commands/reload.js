
exports.props = {
  "requiresElevation": true,
  "description": "reloads a command",
  "usage": "{command}"
};

exports.run = (client, message, args) => {
  const modRole = message.member.roles.has(client.config.modID);

  if (!modRole)
    return;

  if(!args || args.length < 1) return message.reply("you must provide a command name to reload").catch((err) => {console.log(err)});

  const commandName = args[0];

  //check if the command exists and is valid
  if(!client.commands.has(commandName))
    return message.reply("that command does not exist");

  //the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${commandName}.js`)];

  //delete and reload the command from the client.commands Enmap
  client.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);

  message.reply(`the command "${commandName}" has been reloaded`).catch((err) => {console.log(err)});
};
