const fs = require("fs");
const User = require("../classes/User.js");

exports.props = {
  "requiresElevation": "mod",
  "description": "displays the user's data",
  "usage": "{user}"
};

exports.run = (client, message, args) => {
  const user = message.mentions.users.first();

  if(!user) return message.reply("you need to specify a user").catch((err) => {console.log(err)});

  let username = User.getUsernameFromMember(user);
  let userContent = client.usersInSession.get(username);

  if(!userContent) return message.reply("that user is not registered").catch((err) => {console.log(err)});

  message.delete().catch((err) => {console.log(err)});
  message.channel.send(`Here is the data for ${username}\n\`\`\`json\n${JSON.stringify(userContent, null, "\t")}\n\`\`\``).catch((err) => {console.log(err)});
}
