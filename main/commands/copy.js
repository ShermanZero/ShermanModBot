const fs = require("fs-extra");

exports.props = {
  "requiresElevation": true,
  "description": "copies a user's data to another user, and deletes the original",
  "usage": "{user} {user}"
};

exports.run = (client, message, args) => {
  const modRole = message.member.roles.has(client.config.roles.mod);

  if(!modRole)
    return;

  if(args.length != 2)
    return message.reply("you need to specify two users").catch((err) => {console.log(err)});

  //the user to copy from
  const oldUser = args[0].trim().toLowerCase();
  //the user to copy to
  const newUser = args[1].trim().toLowerCase();

  if(!client.usersInSession.has(oldUser))
    return message.reply(`I could not find [${oldUser}] in my database`);

  if(!client.usersInSession.has(newUser))
    return message.reply(`I could not find [${newUser}] in my database`);

  fs.moveSync(`./users/${oldUser}`, `./users/${newUser}`);
  message.delete().catch((err) => {console.log(err)});

  //fs.rmdir(`./users/${oldUser}`);
}
