const fs = require("graceful-fs");
const rimraf = require("rimraf");
const path = require("path");

exports.props = {
  "requiresElevation": "owner",
  "description": "copies a user's data to another user, and deletes the original",
  "usage": "{user} {user}"
};

exports.run = (client, message, args) => {
  if(args.length != 2)
    return message.reply("you need to specify two users").catch((err) => {console.log(err)});

  //the user to copy from
  const oldUser = args[0].trim().toLowerCase();
  //the user to copy to
  const newUser = args[1].trim().toLowerCase();

  let oldUsername = Resources.getUsernameFromMember(oldUser);
  let newUsername = Resources.getUsernameFromMember(newUser);

  if (!client.hasUser(message.guild, oldUsername))
    if(message) return message.reply(`I could not find OLD [${oldUser}] in my database`);
    else return console.log(`I could not find OLD [${oldUser}] in my database`);

  if (!client.hasUser(message.guild, newUsername))
    if(message) return message.reply(`I could not find NEW [${newUser}] in my database`);
    else return console.log(`I could not find NEW [${newUser}] in my database`);

  let content = client.getUserContent(message.guild, oldUsername);
  content.hidden.username = newUsername;

  let source = Resources.getUserDirectoryFromGuild(message.guild, oldUsername);
  let destination = Resources.getUserDirectoryFromGuild(message.guild, newUsername);

  fs.writeFileSync(path.join(destination, newUsername+".json"), JSON.stringify(content, null, "\t"));
  rimraf(source, (err) => { if(err) console.log(err); });

  client.usersInSession.delete(oldUser);
  console.log(`*Removed [${oldUser}] from session`);

  if(message) message.delete().catch((err) => {console.log(err)});
}
