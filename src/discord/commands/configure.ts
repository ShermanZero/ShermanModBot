import { Client, Message, Role, TextChannel } from "discord.js";
import * as fs from "fs";
import * as path from "path";

import rsrc from "../resources";
import GuildConfig from "../configs/guild_config";
import { CommandType } from "../@interfaces/@commands";
import { GuildConfigType, guildConfigFileName, GuildChannelTypes, GuildElevationTypes } from "../@interfaces/@guild_config";

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.administrator,
  description: "sets up the discord bot for the server",
  aliases: ["config"]
};

const run: CommandType["run"] = async (client: Client, message: Message, args: any): Promise<boolean> => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return false;

  client.setUpGuild(message.guild);

  let guildDir: string;
  if (message.guild) guildDir = rsrc.getGuildDirectoryFromGuild(message.guild);
  else guildDir = null as any;

  if (!guildDir) {
    await message.reply("you are not messaging me from a guild!");
    return false;
  }

  let configFile = path.resolve(guildDir, guildConfigFileName);
  if (!fs.existsSync(configFile)) await message.reply("you don't appear to have a configuration set up for your guild, let's create one");
  let successful: boolean;

  let guildConfig: GuildConfigType = new GuildConfig();
  successful = await getRole(guildConfig, GuildElevationTypes.guildowner, message, "Who is the owner of this guild?  Please mention them");
  successful = await getRole(guildConfig, GuildElevationTypes.administrator, message);
  successful = await getRole(guildConfig, GuildElevationTypes.moderator, message);

  successful = await getChannel(guildConfig, GuildChannelTypes.default, "default/welcome", "welcome new members of the guild as they arrive", message);
  successful = await getChannel(guildConfig, GuildChannelTypes.mod_logs, "mod logs", "log any moderation action taken by mods and me", message);

  if (!successful) {
    client.removeGuildFromSetup(message.guild);
    return false;
  }

  guildConfig.setup = true;
  client.setGuildConfig(rsrc.getGuildNameFromGuild(message.guild), guildConfig);

  await message.reply("your configuration has been saved!  You can adjust it at any time by rerunning this command");
  return true;
};

async function getRole(guildConfig: GuildConfigType, nameOfRole: string, message: Message, question?: string): Promise<boolean> {
  let role: Role;

  if (!question) question = `What is the ${nameOfRole} role ID?  You can mention a member with this role, the role itself, input the role's name, or input the ID directly if you know it`;

  const response = (await rsrc.askQuestion(message.member, message.channel as TextChannel, question)) as string;

  if (!response) {
    await message.reply(`I could not find the ${nameOfRole} role based on your input`);
    return false;
  }

  let roleByName = message.guild.roles.find(role => role.name === response);
  let roleByID = message.guild.roles.find(role => role.id === response);
  let roleByMember = message.guild.members.get(response)?.roles?.highest;

  if (roleByName) role = roleByName;
  else if (roleByID) role = roleByID;
  else if (roleByMember) role = roleByMember;
  else message.channel.send(`I could not find the ${nameOfRole} role based on your input`);

  if (role) {
    guildConfig.roles[nameOfRole] = role.id;
    guildConfig.role_names[nameOfRole] = role.name;

    await message.channel.send(`\`\`\`${role} has been set as the ${nameOfRole} role!\`\`\``);
  } else {
    return false;
  }

  return true;
}

async function getChannel(guildConfig: GuildConfigType, nameOfChannel: string, alias: string, purpose: string, message: Message, question?: string): Promise<boolean> {
  let channel: TextChannel;

  if (!question) question = `Do you have a ${alias} channel?  This will be used to ${purpose}.  If you do, and want to enable this feature, simply mention the name of the channel (using #), otherwise, enter 'none'`;

  const response = (await rsrc.askQuestion(message.member, message.channel as TextChannel, question)) as string;

  if (response === "none") {
    return true;
  }

  if (!response) {
    message.reply("Your config has been partially generated, but you can rerun at any time");
    return false;
  }

  let channelByID = message.guild.channels.find(channel => channel.id === response);
  if (channelByID) channel = channelByID as TextChannel;

  if (channel) {
    guildConfig.channels[nameOfChannel] = channel.id;
    await message.channel.send(`\`\`\`${channel} has been set as the ${alias} channel!\`\`\``);
  } else {
    return false;
  }

  return true;
}

module.exports.run = run;
module.exports.properties = properties;
