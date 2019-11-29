import { Client, Guild, Message } from "discord.js";
import * as fs from "fs";
import * as path from "path";

import { BuildOptions } from "../..";
import boot from "../../shared/resources/boot";
import rsrc from "../discord-resources";
import TwitchIntegration from "../../twitch/twitchIntegration";
import exit from "../handlers/exitHandler";

module.exports = async (client: Client): Promise<boolean> => {
  boot.red.print();

  exit.init(client);

  let commandArray: string[] = [...client.commands.keys()].sort();
  `Loaded ${commandArray.length.toString().magenta} command(s) ${"[@everyone]".green}, ${"[@moderator]".yellow}, ${"[@owner]".red}, ${
    "[@botowner]".cyan
  }`.print();

  for (let i = 0; i < commandArray.length; i++) {
    let commandName = commandArray[i];
    let command = client.getCommand(commandName);

    if (command.props.requiresElevation) {
      if (command.props.requiresElevation === client.discordConfig.elevation_names.moderator) {
        commandName = commandName.yellow;
      } else if (command.props.requiresElevation === client.discordConfig.elevation_names.owner) {
        commandName = commandName.red;
      } else if (command.props.requiresElevation === client.discordConfig.elevation_names.botowner) {
        commandName = commandName.cyan;
      }
    } else {
      commandName = commandName.green;
    }

    `${("[" + commandName + "]").padEnd(30, ".")} ${command.props.description}`.print();
  }

  "...".print();

  client.guilds.forEach((guild: Guild) => {
    if (guild.id === DiscordSecrets.guild_id) client.defaultGuild = guild;

    let guildDir = rsrc.getGuildDirectoryFromGuild(guild);

    if (!fs.existsSync(guildDir)) {
      fs.mkdirSync(guildDir, { recursive: true });
      fs.mkdirSync(path.join(guildDir, client.discordConfig.files.removed), {
        recursive: true
      });
    }
    let guildName = rsrc.getGuildNameFromGuild(guild);

    //set the guild data to to the guild name
    client.members_in_session.set(guildName, {});
    client.guild_configs.set(guildName, null);

    let guildConfig = path.resolve(guildDir, "guild_config.json");
    if (fs.existsSync(guildConfig)) client.guild_configs.set(guildName, require(guildConfig));

    `*Registered [${guildName.magenta}] to session --- looking for existing members:`.print();

    fs.readdirSync(guildDir).forEach(dir => {
      let username = dir;

      //if the client does not have the member registered
      if (!client.hasMember(guild, username)) {
        const response = rsrc.getMemberConfigFromNameWithGuild(client, guild, (null as unknown) as Message, username);
        if (!response) return;

        process.stdout.write("  ");
        client.registerMember(response);
      }
    });

    `Found all existing members of [${guildName.magenta}] (currently ${Object.keys(client.getGuild(guildName)).length.toString().green})`.print();
  });

  let readyMessage = `Ready to serve in ${client.channels.size} channel(s) on ${client.guilds.size} guild(s), for a total of ${client.users.size} users`
    .inverse;
  let footer = "=====================================================================================".red;

  "...".print();
  `${readyMessage}\n${footer}`.print();

  let twitch = new TwitchIntegration();
  await twitch.start(client);

  client.user.setActivity(client.discordConfig.status);
  client.user.setStatus(BuildOptions.development ? "invisible" : "online");

  client.ready = true;

  return true;
};
