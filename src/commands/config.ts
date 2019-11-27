import { Message, TextChannel } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';

import Resources from '../classes/Resources';
import user_config from '../resources/guild_config';

module.exports.props = {
  requiresElevetaion: "owner",
  description: "sets up the discord bot for the server"
};

module.exports.run = async (client: any, message: Message) => {
  let guildDir: string;

  if (message.guild) guildDir = Resources.getGuildDirectoryFromGuild(message.guild);
  else guildDir = null as any;

  if (!guildDir) return await message.reply("you are not messaging me from a guild!");

  let configFile = path.resolve(guildDir, "config.js");
  if (!fs.existsSync(configFile)) await message.reply("you don't appear to have a configuration set up for your guild, let's create one");

  fs.writeFileSync(configFile, JSON.stringify(user_config, null, "\t"));

  let response = await askQuestion(message.channel as TextChannel, "What is the owner's role ID?  You can mention them, the role, or input the ID directly if you know it");

  console.log("response", response);
};

async function askQuestion(channel: TextChannel, question: string, options = { max: 1, time: 30000, errors: ["time"] }) {
  await channel.send(question);
  await channel
    .awaitMessages(response => response.content, options)
    .then(collected => {
      return collected;
    })
    .catch(collected => {
      channel.send("No answer was given in time, aborting setup.  Run !config to rereun setup");
      return null;
    });
}
