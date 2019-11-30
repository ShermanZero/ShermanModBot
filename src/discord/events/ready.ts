import { Client, Guild, Message } from "discord.js";
import * as fs from "fs";
import * as path from "path";

import { BuildOptions } from "../..";
import boot from "../../shared/resources/boot";
import TwitchIntegration from "../../twitch/twitchIntegration";
import rsrc from "../discord-resources";
import exitHandler from "../handlers/exitHandler";
import { ElevationTypes } from "../@interfaces/@commands";
import { GuildConfigType, guildConfigFileName } from "../@interfaces/@guild_config";

module.exports = async (client: Client): Promise<boolean> => {
  client.user.setActivity(client.discordConfig.status);

  boot.red.print();

  exitHandler.init(client);

  if (BuildOptions.development) {
    let pad = "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";
    `${pad.cyan} ${"DEV BUILD".green} ${pad.cyan}`.print();

    client.user.setStatus("invisible");
  } else {
    client.user.setStatus("online");
  }

  let commandArray: string[] = [...client.commands.keys()].sort();

  `Loaded ${commandArray.length.toString().magenta} command(s) [${("@" + ElevationTypes.everyone).toLowerCase().green}] [${
    ("@" + ElevationTypes.moderator).toLowerCase().yellow
  }] [${("@" + ElevationTypes.administrator).toLowerCase().red}] [${("@" + ElevationTypes.botowner).toLowerCase().cyan}]`.print();

  for (let i = 0; i < commandArray.length; i++) {
    let commandName = commandArray[i];

    let commandProps = client.getCommandProperties(commandName);

    if (commandProps.elevation === ElevationTypes.moderator) {
      commandName = commandName.yellow;
    } else if (commandProps.elevation === ElevationTypes.administrator) {
      commandName = commandName.red;
    } else if (commandProps.elevation === ElevationTypes.botowner) {
      commandName = commandName.cyan;
    } else {
      commandName = commandName.green;
    }

    `${("[" + commandName + "]").padEnd(30, ".")} ${commandProps.description}`.print();
  }

  "...".print();

  client.guilds.forEach(async (guild: Guild) => {
    let guildDir = rsrc.getGuildDirectoryFromGuild(guild);

    if (!fs.existsSync(guildDir)) {
      fs.mkdirSync(guildDir, { recursive: true });
      fs.mkdirSync(path.join(guildDir, client.discordConfig.files.removed), {
        recursive: true
      });
    }
    let guildname = rsrc.getGuildNameFromGuild(guild);

    //set the guild data to to the guild name
    client.guildsInSession.set(guildname, null);

    let guildConfigFile = path.resolve(guildDir, guildConfigFileName);
    if (fs.existsSync(guildConfigFile)) {
      let guildConfig = (await import(guildConfigFile)) as GuildConfigType;
      client.registerGuild(guildname, guildConfig);
    }

    `*Registered [${guildname.magenta}] to session --- looking for existing members:`.print();

    fs.readdirSync(guildDir).forEach(dir => {
      let username = dir;

      //ignore the removed directory
      if (username === ".removed") return;

      //if the client does not have the member registered in the cache (but their directory exists)
      if (!client.hasMember(guild, username)) {
        const memberConfig = rsrc.getMemberConfigFromNameWithGuild(client, guild, (null as unknown) as Message, username);
        if (!memberConfig) return;

        process.stdout.write("  ");
        client.registerMember(memberConfig);
      }
    });

    `Found all existing members of [${guildname.magenta}] (currently ${Object.keys(client.getGuildMembers(guildname)).length.toString().green})`.print();
  });

  let readyMessage = `Ready to serve in ${client.channels.size} channel(s) on ${client.guilds.size} guild(s), for a total of ${client.users.size} users`
    .inverse;
  let footer = "=====================================================================================".red;

  "...".print();
  `${readyMessage}\n${footer}`.print();

  let twitch = new TwitchIntegration();
  await twitch.start(client);

  client.ready = true;

  return true;
};
