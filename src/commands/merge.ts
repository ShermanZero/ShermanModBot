import 'colors';

import { Message } from 'discord.js';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

import rsrc from '../classes/Resources';

exports.props = {
  requiresElevation: "owner",
  description: "copies a user's data to another user, and deletes the original",
  usage: "{user} {user}"
};

exports.run = (client: any, message: Message, args: string[]) => {
  if (args.length != 2)
    return message.reply("you need to specify two users").catch(err => {
      console.log(err);
    });

  //the user to copy from
  const oldUser = args[0].trim().toLowerCase();
  //the user to copy to
  const newUser = args[1].trim().toLowerCase();

  let oldUsername = rsrc.getUsernameFromMember(oldUser);
  let newUsername = rsrc.getUsernameFromMember(newUser);

  if (!client.hasUser(message.guild, oldUsername))
    if (message)
      return message.reply(`I could not find OLD [${oldUser}] in my database`);
    else
      return console.error(
        `!! I could not find OLD [${oldUser}] in my database`.red
      );

  if (!client.hasUser(message.guild, newUsername))
    if (message)
      return message.reply(`I could not find NEW [${newUser}] in my database`);
    else
      return console.error(
        `!! I could not find NEW [${newUser}] in my database`.red
      );

  let content = client.getUserContent(message.guild, oldUsername);
  content.hidden.username = newUsername;

  let source = rsrc.getUserDirectoryFromGuild(message.guild, oldUsername);
  let destination = rsrc.getUserDirectoryFromGuild(message.guild, newUsername);

  fs.writeFileSync(
    path.join(destination, newUsername + ".json"),
    JSON.stringify(content, null, "\t")
  );
  rimraf(source, err => {
    if (err) console.log(err);
  });

  client.usersInSession.delete(oldUser);
  console.log(`*Removed [${oldUser}] from session`);

  if (message)
    message.delete().catch(err => {
      console.log(err);
    });
};
