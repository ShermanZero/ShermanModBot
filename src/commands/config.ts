import { Message, Role, TextChannel } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';

import rsrc from '../classes/Resources';
import config from '../resources/global_config';
import guild_config from '../resources/guild_config';

module.exports.props = {
  requiresElevation: config.elevation_names.owner,
  description: "sets up the discord bot for the server"
};

module.exports.run = async (client: any, message: Message) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return;

  let guildDir: string;

  if (message.guild) guildDir = rsrc.getGuildDirectoryFromGuild(message.guild);
  else guildDir = null as any;

  if (!guildDir) return await message.reply("you are not messaging me from a guild!");

  let configFile = path.resolve(guildDir, client.global_config.files.guild_config);
  if (!fs.existsSync(configFile)) await message.reply("you don't appear to have a configuration set up for your guild, let's create one");

  await getRole(client.global_config.elevation_names.owner, message).then(result => {
    if (!result) return message.channel.send("You will need to rerun the setup before commands become available");
  });
  await getRole(client.global_config.elevation_names.moderator, message).then(result => {
    if (!result) return message.channel.send("You will need to rerun the setup before commands become available");
  });

  await getChannel(client.global_config.channel_names.default, "default/welcome", "welcome new members of the guild as they arrive", message);
  await getChannel(client.global_config.channel_names.mod_logs, "mod logs", "log any moderation action taken by mods and me", message);

  guild_config.setup = true;

  client.guild_configs[rsrc.getGuildNameFromGuild(message.guild)] = guild_config;

  //create the config file
  fs.writeFile(configFile, JSON.stringify(guild_config, null, "\t"), error => {
    if (error) {
      message.reply("there was a problem creating your config file, you will need to rerun the setup");
    } else {
      message.reply("your configuration has been stored!  You can rerun this setup at any time");
    }
  });
};

async function getChannel(nameOfChannel: string, alias: string, purpose: string, message: Message) {
  let channel: TextChannel;

  await rsrc
    .askQuestion(
      message.channel as TextChannel,
      `Do you have a ${alias} channel?  This will be used to ${purpose}.  If you do, and want to enable this feature, simply mention the name of the channel (using #), otherwise, press enter`
    )
    .then(response => {
      let channelByID = message.guild.channels.find(channel => channel.id === response);

      if (channelByID) channel = channelByID as TextChannel;
    })
    .catch(() => {
      message.reply("Your config has been partially generated, but you can rerun at any time");
      return false;
    });

  if (channel) {
    guild_config.channels[nameOfChannel] = channel.id;
    await message.channel.send(`\`\`\`${channel} has been set as the ${alias} channel!\`\`\``);
  }

  return true;
}

async function getRole(nameOfRole: string, message: Message) {
  let role: Role;

  await rsrc
    .askQuestion(
      message.channel as TextChannel,
      `What is the ${nameOfRole} role ID?  You can mention a member with this role, the role itself, input the role's name, or input the ID directly if you know it`
    )
    .then(response => {
      let roleByName = message.guild.roles.find(role => role.name === response);
      let roleByID = message.guild.roles.find(role => role.id === response);
      let roleByUser: Role;

      message.guild.members.fetch(response).then(member => {
        roleByUser = member.roles.highest;
      });

      if (roleByName) role = roleByName;
      else if (roleByID) role = roleByID;
      else if (roleByUser) role = roleByUser;
      else message.reply(`I could not find the ${nameOfRole} role based on your input`);
    })
    .catch(() => {
      message.reply("You will need to rerun the setup, your config file was not generated");
      return false;
    });

  if (role) {
    guild_config.roles[nameOfRole] = role.id;
    await message.channel.send(`\`\`\`${role} has been set as the ${nameOfRole} role!\`\`\``);
  }

  return true;
}
