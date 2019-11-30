import { Client } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import TwitchClient from "twitch";
import ChatClient from "twitch-chat-client";
import { TwitchSecrets } from "./secrets/twitch-secrets";
import { MemberConfigType } from "../discord/@interfaces/@member_config";

/**
 * The class for integrating the bot with Twitch
 *
 * @class TwitchIntegration
 */
export default class TwitchIntegration {
  commands: Map<string, any>;
  aliases: Map<string, string>;

  /**
   * Starts the initialization of the Twitch bot
   *
   * @param {Client} client the Discord `Client`
   */
  async start(client: Client) {
    const clientID = TwitchSecrets.client_id;
    const accessToken = TwitchSecrets.access_token;

    `...\n${"Beginning Twitch integration".inverse}`.print();
    "  *Attempting to authorize to Twitch...".print();
    const twitchClient = await TwitchClient.withCredentials(clientID, accessToken);

    "  *Attempting to authorize chat client...".print();
    const chatClient = await ChatClient.forTwitchClient(twitchClient);

    "    *Successful authorization to Twitch!".success();
    await chatClient.connect();

    "  *Connected to chat client, awaiting registration...".print();
    await chatClient.waitForRegistration();

    "  *Got registration, attempting to join....".print();
    await chatClient.join("ShermanModBot");
    "    *Joined chat!".success();

    this.loadCommands(client);

    `${"Twitch chat has been linked".inverse}\n...`.print();
    chatClient.onPrivmsg((channel: string, username: string, message: string) => {
      if (message.indexOf(TwitchConfig.prefix) !== 0) return;

      let masterGuild = client.guilds.get(client.masterGuild);
      let guildUsername: string = client.hasMember(masterGuild, username, true);
      let memberConfig: MemberConfigType;

      if (guildUsername) {
        memberConfig = client.getMemberConfig(masterGuild, guildUsername);

        let logMessage = `Member ${String(memberConfig.hidden.username).magenta} just posted "${message.magenta}" in Twitch chat`;
        logMessage.memberLog(client, client.masterGuild, memberConfig, "INSERT TWITCH LOG THINGY HERE");
        logMessage.print(true);
      }

      const commandName = message.slice(1);
      const command = this.commands.get(commandName);
      if (!command) return;

      command.run(chatClient, channel, commandName);
    });

    chatClient.onSub((channel, user) => {
      chatClient.say(channel, `Thanks to @${user} for subscribing to the channel!`);
    });

    chatClient.onResub((channel, user, subInfo) => {
      chatClient.say(channel, `Thanks to @${user} for subscribing to the channel for a total of ${subInfo.months} months!`);
    });

    chatClient.onSubGift((channel, user, subInfo) => {
      chatClient.say(channel, `Thanks to ${subInfo.gifter} for gifting a subscription to ${user}!`);
    });
  }

  /**
   * Loads the commands that the Twitch bot will listen to
   */
  loadCommands(client: Client): void {
    this.commands = new Map<string, any>();
    this.aliases = new Map<string, string>();

    let commandsPath = path.join(__dirname, "commands");
    let commands = this.commands;
    let aliases = this.aliases;

    fs.readdir(commandsPath, (err, files): boolean => {
      if (err) {
        String(err).error();
        return false;
      }
      files.forEach(function(file) {
        if (!file.endsWith(".js")) return;

        let command: any = require(path.join(commandsPath, file));
        let commandName = file.split(".")[0];

        //store the command
        commands.set(commandName, command);

        //store the aliases as well
        command.aliases?.forEach((alias: string) => {
          aliases.set(alias, commandName);
        });
      });

      return true;
    });

    this.commands = commands;
    this.aliases = aliases;

    let commandArray: string[] = [...this.commands.keys()].sort();
    `Loaded ${commandArray.length.toString().magenta} command(s) ${"[@everyone]".green}, ${"[@subscribers]".yellow}, ${"[@moderator]".red}, ${
      "[@broadcaster]".cyan
    }`.print();

    for (let i = 0; i < commandArray.length; i++) {
      let commandName = commandArray[i];
      let command = this.commands.get(commandName);

      if (command.props.requiresElevation) {
        if (command.props.requiresElevation === TwitchConfig.elevation_names.moderator) {
          commandName = commandName.yellow;
        } else if (command.props.requiresElevation === TwitchConfig.elevation_names.owner) {
          commandName = commandName.red;
        } else if (command.props.requiresElevation === TwitchConfig.elevation_names.botowner) {
          commandName = commandName.cyan;
        }
      } else {
        commandName = commandName.green;
      }

      `${("[" + commandName + "]").padEnd(30, ".")} ${command.props.description}`.print();
    }

    "...".print();
  }
}
