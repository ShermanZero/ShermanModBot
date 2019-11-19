const FileHandler = require("../classes/FileHandler.js");

module.exports = (client, message) => {
  var forLog = "[" + message.createdAt + "] " + message.author.tag + ": " + message.content + "\n";

  //append the message to the log file
  FileHandler.appendDataToFile(forLog, "./logs/allmessages.txt");

  //ignore all bots
  if(message.author.bot) return;

  //ignore messages not starting with the prefix
  if(message.content.indexOf(client.config.prefix) !== 0) return;

  //standard argument/command name definition
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  //grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  //if the command doesn't exist
  if(!cmd) return;

  //run the command
  cmd.run(client, message, args);
}
