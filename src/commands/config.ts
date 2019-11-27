import { Message, Role, TextChannel } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';

import Resources from '../classes/Resources';
import guild_config from '../resources/guild_config';

module.exports.props = {
  description: "sets up the discord bot for the server"
};

module.exports.run = async (client: any, message: Message) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return;
  
  let guildDir: string;

  if (message.guild) guildDir = Resources.getGuildDirectoryFromGuild(message.guild);
  else guildDir = null as any;

  if (!guildDir) return await message.reply("you are not messaging me from a guild!");

  let configFile = path.resolve(guildDir, client.global_config.files.guild_config);
  if (!fs.existsSync(configFile)) await message.reply("you don't appear to have a configuration set up for your guild, let's create one");

  await getRole(client.global_config.elevation_names.owner, message).then(result => {
    if(!result) return message.channel.send("You will need to rerun the setup before commands become available");
  });
  await getRole(client.global_config.elevation_names.mod, message).then(result => {
    if (!result) return message.channel.send("You will need to rerun the setup before commands become available");
  });

  await getChannel(client.global_config.channel_names.default, "default/welcome", "welcome new members of the guild as they arrive", message);
  await getChannel(client.global_config.channel_names.mod_logs, "mod logs", "log any moderation action taken by mods and me", message);

  guild_config.setup = true;

  //create the config file
  fs.writeFileSync(configFile, JSON.stringify(guild_config, null, "\t"));
};

async function getChannel(nameOfChannel: string, alias: string, purpose: string, message: Message) {
  let channel: TextChannel;

  await askQuestion(message.channel as TextChannel, `Do you have a ${alias} channel?  This will be used to ${purpose}.  If you do, and want to enable this feature, simply mention the name of the channel (using #), otherwise, press enter`).then(response => {
    console.log("response", response);

    let channelByID = message.guild.channels.find(channel => channel.id === response);

    if(channelByID) channel = channelByID as TextChannel;
  });

  if(channel) {
    guild_config.channels[nameOfChannel] = channel.id;
    await message.channel.send(`${channel} has been set as the ${alias} channel!`);
  }

  return true;
}

async function getRole(nameOfRole: string, message: Message) {
  let role: Role;

  await askQuestion(message.channel as TextChannel, `What is the ${nameOfRole} role ID?  You can mention a member with this role, the role itself, input the role's name, or input the ID directly if you know it`).then(response => {
    console.log("response", response);

    let roleByName = message.guild.roles.find(role => role.name === response);
    let roleByID = message.guild.roles.find(role => role.id === response);
    let roleByUser = message.guild.members.get(response)?.roles.highest;

    if (roleByName) role = roleByName;
    else if (roleByID) role = roleByID;
    else if (roleByUser) role = roleByUser;
    else message.reply(`I could not find the ${nameOfRole} role based on your input`);
  });

  if (role) {
    guild_config.roles[nameOfRole] = role.id;
    await message.channel.send(`${role} has been set as the ${nameOfRole} role!`);
  }

  return true;
}

async function askQuestion(channel: TextChannel, question: string, filter = () => true, options = { max: 1, time: 30000, errors: ["time"] }) {
  let value: any;

  await channel.send(question);
  await channel
    .awaitMessages(filter, options)
    .then(collected => {
      value = collected.first()?.content;
      value = (value as string).replace(/[<>@&#]/g, "");
    })
    .catch(collected => {
      channel.send("No answer was given in time, aborting setup.  Run !config to rereun setup");
    });

  return value;
}
