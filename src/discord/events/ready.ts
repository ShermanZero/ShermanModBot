import { Client, Guild, Message } from "discord.js";
import * as fs from "fs";
import * as path from "path";

import { BuildOptions } from "../..";
import bootLogo, { bootFooter } from "../../shared/resources/boot";
import TwitchIntegration from "../../twitch/twitchIntegration";
import rsrc from "../discord-resources";
import exitHandler from "../handlers/exitHandler";
import { GuildConfigType, guildConfigFileName, GuildElevationTypes } from "../@interfaces/@guild_config";

module.exports = async (client: Client): Promise<boolean> => {
  client.user.setActivity(client.discordConfig.status);

  bootLogo.red.print();

  if (BuildOptions.development) {
    let pad = "".padEnd(bootFooter.length / 2 - 5, "~");
    `${pad.cyan} ${"DEV BUILD".red} ${pad.cyan}`.print();

    client.user.setStatus("invisible");
  } else {
    bootFooter.red.print();
  }

  exitHandler.init(client);

  let commandArray: string[] = [...client.commands.keys()].sort();

  `Loaded ${commandArray.length.toString().magenta} command(s) [${("@" + GuildElevationTypes.everyone).toLowerCase().green}] [${("@" + GuildElevationTypes.moderator).toLowerCase().yellow}] [${
    ("@" + GuildElevationTypes.administrator).toLowerCase().red
  }] [${("@" + GuildElevationTypes.botowner).toLowerCase().cyan}]`.print();

  for (let i = 0; i < commandArray.length; i++) {
    let commandName = commandArray[i];

    let commandProps = client.getCommandProperties(commandName);

    if (commandProps.elevation === GuildElevationTypes.moderator) {
      commandName = commandName.yellow;
    } else if (commandProps.elevation === GuildElevationTypes.administrator) {
      commandName = commandName.red;
    } else if (commandProps.elevation === GuildElevationTypes.botowner) {
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

    let guildConfigFile = path.resolve(guildDir, guildConfigFileName);
    if (fs.existsSync(guildConfigFile)) {
      let guildConfig = (await import(guildConfigFile)) as GuildConfigType;
      client.registerGuild(guildname, guildConfig);
    } else {
      client.registerGuild(guildname, null);
    }

    fs.readdirSync(guildDir).forEach(async dir => {
      let username = dir;

      //ignore the removed directory
      if (username === ".removed") return;

      //if the client does not have the member registered in the cache (but their directory exists)
      if (!client.hasMember(guild, username)) {
        const memberConfig = await rsrc.getMemberConfigFromNameWithGuild(client, guild, (null as unknown) as Message, username);
        if (!memberConfig) return;

        process.stdout.write("  ");
        client.registerMember(memberConfig);
      }
    });

    let membersInSession = client.getGuildMembers(guildname);
    let memberCount = membersInSession ? membersInSession.size : 0;

    `Found all existing members of [${guildname.magenta}] (currently ${memberCount.toString().green})`.print();

    let readyMessage = `Ready to serve in ${client.channels.size} channel(s) on ${client.guilds.size} guild(s), for a total of ${client.users.size} users`.inverse;

    "...".print();
    `${readyMessage}\n${bootFooter.red}`.print();

    startTwitch(client);
  });

  return true;
};

async function startTwitch(client: Client) {
  let twitch = new TwitchIntegration();
  await twitch.start(client);

  if (!BuildOptions.development) client.user.setStatus("online");

  client.ready = true;
}
