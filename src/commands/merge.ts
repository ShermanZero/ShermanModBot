import { Guild, Message } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";

import config from "../resources/global_config";
import rsrc from "../resources/resources";

module.exports.props = {
  requiresElevation: config.elevation_names.botowner,
  description: "copies a user's data to another user, and deletes the original",
  usage: "<old_member> <new_member>"
};

module.exports.run = async (client: any, message: Message, args: string[]) => {
  if (args.length != 2) await message.reply("you need to specify two users");

  //the user to copy from
  const oldUser = args[0].trim().toLowerCase();
  //the user to copy to
  const newUser = args[1].trim().toLowerCase();

  let oldUsername = rsrc.getUsernameFromMember(oldUser);
  let newUsername = rsrc.getUsernameFromMember(newUser);

  if (!client.hasUser(message.guild, oldUsername))
    if (message) return message.reply(`I could not find OLD [${oldUser}] in my database`);
    else return `I could not find OLD [${oldUser}] in my database`.error();

  if (!client.hasUser(message.guild, newUsername))
    if (message) return message.reply(`I could not find NEW [${newUser}] in my database`);
    else return `I could not find NEW [${newUser}] in my database`.error();

  let content = client.getUserContent(message.guild, oldUsername);
  content.hidden.username = newUsername;

  let source = rsrc.getMemerDirectoryFromGuild(message.guild as Guild, oldUsername);
  let destination = rsrc.getMemerDirectoryFromGuild(message.guild as Guild, newUsername);

  fs.writeFileSync(path.join(destination, newUsername + ".json"), JSON.stringify(content, null, "\t"));
  rimraf(source, (err: string) => {
    if (err) err.print(true);
  });

  client.usersInSession.delete(oldUser);
  `*Removed [${oldUser}] from session`.warning(true);

  if (message) await message.delete();
};
