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

  if(!client.usersInSession.has(oldUser))
    if(message) return message.reply(`I could not find OLD [${oldUser}] in my database`);
    else return console.log(`I could not find OLD [${oldUser}] in my database`);

  if(!client.usersInSession.has(newUser))
    if(message) return message.reply(`I could not find NEW [${newUser}] in my database`);
    else return console.log(`I could not find NEW [${newUser}] in my database`);

  let content = client.usersInSession.get(oldUser);
  content.name = newUser;

  let source = path.join(__dirname, "..", "users", oldUser);
  let destination = path.join(__dirname, "..", "users", newUser);

  fs.writeFileSync(`${destination}/${newUser}.json`, JSON.stringify(content, null, "\t"));
  rimraf(source, (err) => { if(err) console.log(err); });

  client.usersInSession.delete(oldUser);
  console.log(`*Removed [${oldUser}] from session`);

  if(message) message.delete().catch((err) => {console.log(err)});
}
