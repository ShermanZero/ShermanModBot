const fs = require("fs");
const path = require("path");
const User = require(path.join(__dirname, "..", "classes", "User.js"));

exports.props = {
  "requiresElevation": "mod",
  "description": "displays the user's data",
  "usage": "{user}"
};

exports.run = (client, message, args) => {
  const user = message.mentions.users.first();

  let username = null;
  let userContent = null;

  if(!user) {
    if(args.length == 1) {
      userContent = User.getUserContentsFromName(args[0]);

      if(!userContent) return message.reply("that user is not registered").catch((err) => {console.log(err)});

      username = userContent.name;
    } else return message.reply("you need to specify a user").catch((err) => {console.log(err)});
  } else {
    username = User.getUsernameFromMember(user);
    userContent = client.usersInSession.get(username);
  }

  if(!userContent) return message.reply("that user is not registered").catch((err) => {console.log(err)});

  message.delete().catch((err) => {console.log(err)});
  message.channel.send(`Here is the data for ${username}\n\`\`\`json\n${JSON.stringify(userContent, null, "\t")}\n\`\`\``).catch((err) => {console.log(err)});
}
