import '../classes/StringHandler';

import { Message } from 'discord.js';

import rsrc from '../classes/Resources';

exports.props = {
  "requiresElevation": "mod",
  "description": "displays the user's data",
  "usage": "{user}"
};

exports.run = async (client: any, message: Message, args: string[]) => {
  const user = message.mentions.users.first();

  let username = null; 
  let userContent = null;

  if(!user) {
    if(args.length == 1) {
      userContent = rsrc.getUserContentsFromName(message, args[0], true);

      if(!userContent) try {
        return message.reply( "that user is not registered" );
      }
      catch ( err ) {
        console.log( err );
      }

      username = userContent.name;
    } else try {
        return message.reply( "you need to specify a user" );
      }
      catch ( err_1 ) {
        console.log( err_1 );
      }
  } else {
    username = rsrc.getUsernameFromMember(user);
    userContent = client.getUserContent(message.guild, username);
  }


  if(!userContent) try {
    return message.reply( "that user is not registered" );
  }
  catch ( err_2 ) {
    console.log( err_2 );
  }

  message.delete().catch((err) => {console.log(err)});

  message.channel.send(`Here is the data for [${username.hideID()}]\n\`\`\`json\n${JSON.stringify(userContent, null, "\t")}\n\`\`\``).catch((err) => {
    console.log(err)
  });
}
