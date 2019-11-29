import { Client, Message, Role, TextChannel } from "discord.js";
import * as fs from "fs";
import * as path from "path";

import rsrc from "../../shared/resources/resources";
import { DiscordConfig } from "../../shared/configs/discord_config";
import { GuildConfig } from "../../shared/configs/guild_config";

let discordConfig: DiscordConfig;
let guildConfig: GuildConfig;

module.exports.props = {
  requiresElevation: discordConfig.elevation_names.owner,
  description: "sets up the discord bot for the server"
};

module.exports.run = async (client: Client, message: Message): Promise<boolean> => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return false;

  let guildDir: string;

  if (message.guild) guildDir = rsrc.getGuildDirectoryFromGuild(message.guild);
  else guildDir = null as any;

  if (!guildDir) {
    await message.reply("you are not messaging me from a guild!");
    return false;
  }

  let configFile = path.resolve(guildDir, "guild_config.json");
  if (!fs.existsSync(configFile)) await message.reply("you don't appear to have a configuration set up for your guild, let's create one");

  await getRole(discordConfig.elevation_names.owner, message).then((result): any => {
    if (!result) return message.channel.send("You will need to rerun the setup before commands become available");
  });
  await getRole(discordConfig.elevation_names.moderator, message).then((result): any => {
    if (!result) return message.channel.send("You will need to rerun the setup before commands become available");
  });

  await getChannel(discordConfig.channel_names.default, "default/welcome", "welcome new members of the guild as they arrive", message);
  await getChannel(discordConfig.channel_names.mod_logs, "mod logs", "log any moderation action taken by mods and me", message);

  guildConfig.setup = true;

  client.guild_configs.set(rsrc.getGuildNameFromGuild(message.guild), guildConfig);

  //create the config file
  fs.writeFile(configFile, JSON.stringify(guildConfig, null, "\t"), error => {
    if (error) {
      message.reply("there was a problem creating your config file, you will need to rerun the setup");
    } else {
      message.reply("your configuration has been stored!  You can rerun this setup at any time");
    }
  });

  return true;
};

async function getChannel(nameOfChannel: string, alias: string, purpose: string, message: Message) {
  let channel: TextChannel;

  await rsrc
    .askQuestion(message.member, message.channel as TextChannel, `Do you have a ${alias} channel?  This will be used to ${purpose}.  If you do, and want to enable this feature, simply mention the name of the channel (using #), otherwise, press enter`)
    .then(response => {
      let channelByID = message.guild.channels.find(channel => channel.id === response);

      if (channelByID) channel = channelByID as TextChannel;
    })
    .catch(() => {
      message.reply("Your config has been partially generated, but you can rerun at any time");
      return false;
    });

  if (channel) {
    guildConfig.channels[nameOfChannel] = channel.id;
    await message.channel.send(`\`\`\`${channel} has been set as the ${alias} channel!\`\`\``);
  }

  return true;
}

async function getRole(nameOfRole: string, message: Message) {
  let role: Role;

  await rsrc
    .askQuestion(message.member, message.channel as TextChannel, `What is the ${nameOfRole} role ID?  You can mention a member with this role, the role itself, input the role's name, or input the ID directly if you know it`)
    .then(response => {
      let roleByName = message.guild.roles.find(role => role.name === response);
      let roleByID = message.guild.roles.find(role => role.id === response);
      let roleByMember = message.guild.members.get(response)?.roles?.highest;

      if (roleByName) role = roleByName;
      else if (roleByID) role = roleByID;
      else if (roleByMember) role = roleByMember;
      else message.reply(`I could not find the ${nameOfRole} role based on your input`);
    })
    .catch(() => {
      message.reply("You will need to rerun the setup, your config file was not generated");
      return false;
    });

  if (role) {
    guildConfig.roles[nameOfRole] = role.id;
    await message.channel.send(`\`\`\`${role} has been set as the ${nameOfRole} role!\`\`\``);
  }

  return true;
}
