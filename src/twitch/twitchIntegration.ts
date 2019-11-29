import { Client } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import TwitchClient from "twitch";
import ChatClient from "twitch-chat-client";

import secrets from "../secrets";

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
    const clientID = secrets.twitch.client_id;
    const accessToken = secrets.twitch.access_token;

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
    await chatClient.join("ShermanZero");
    "    *Joined chat!".success();

    this.loadCommands();

    `${"Twitch chat has been linked".inverse}\n...`.print();
    chatClient.onPrivmsg((channel: string, username: string, message: string) => {
      if (message.indexOf(client.global_config.prefix) !== 0) return;

      let guildUsername: string = client.hasMember(client.defaultGuild, username, true);
      let guildUserContent: any;

      if (guildUsername) {
        guildUserContent = client.getMemberContent(client.defaultGuild, guildUsername);

        let logMessage = `Member ${String(guildUserContent.hidden.username).magenta} just posted "${message.magenta}" in Twitch chat`;
        logMessage.userLog(client, client.defaultGuild, guildUserContent, client.global_config.files.logs.twitch);
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
  loadCommands(): void {
    this.commands = new Map<string, any>();
    this.aliases = new Map<string, string>();

    let commandsPath = path.join(__dirname, "commands");
    let commands = this.commands;
    let aliases = this.aliases;

    fs.readdir(commandsPath, function(err, files) {
      if (err) return String(err).error();
      files.forEach(function(file) {
        if (!file.endsWith(".js")) return;

        let command: any = require(path.join(commandsPath, file));
        let commandName = file.split(".")[0];

        `--registering command ${commandName.cyan}`.print();

        //store the command
        commands.set(commandName, command);

        //store the aliases as well
        command.aliases?.forEach((alias: string) => {
          aliases.set(alias, commandName);
        });

        "--completed".success();
      });
    });

    this.commands = commands;
    this.aliases = aliases;
  }
}
