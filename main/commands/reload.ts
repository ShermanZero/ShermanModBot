import { Message } from 'discord.js';
import path from 'path';

exports.props = {
  "requiresElevation": "owner",
  "description": "reloads a command",
  "usage": "{command}"
};

exports.run = async (client: any, message: Message, args: string[]) => {
  if(!args || args.length < 1) try {
    return message.reply( "you must provide a command name to reload" );
  }
  catch ( err ) {
    console.log( err );
  }

  const commandName = args[0];

  //check if the command exists and is valid
  if(!client.commands.has(commandName))
    return message.reply("that command does not exist");

  delete require.cache[require.resolve(path.join(__dirname, commandName+".js"))];

  //delete and reload the command from the client.commands Enmap
  client.commands.delete(commandName);
  const props = require(path.join(__dirname, commandName+".js"));
  client.commands.set(commandName, props);

  message.reply(`the command "${commandName}" has been reloaded`).catch((err) => {console.log(err)});
};
