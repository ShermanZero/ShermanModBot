import * as Discord from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';
import TwitchClient from 'twitch';
import ChatClient from 'twitch-chat-client';

import secrets from '../secrets';

export default class TwitchIntegration {
  commands: Map<string, any>;
  aliases: Map<string, string>;

  async start(client: Discord.Client) {
    const clientID = secrets.twitch.client_id;
    const accessToken = secrets.twitch.access_token;

    `...\n${"Beginning Twitch integration".inverse}`.normal();
    "  *Attempting to authorize to Twitch...".normal();
    const twitchClient = await TwitchClient.withCredentials(clientID, accessToken);

    "  *Attempting to authorize chat client...".normal();
    const chatClient = await ChatClient.forTwitchClient(twitchClient);

    "    *Successful authorization to Twitch!".success();
    await chatClient.connect();

    "  *Connected to chat client, awaiting registration...".normal();
    await chatClient.waitForRegistration();

    "  *Got registration, attempting to join....".normal();
    await chatClient.join("ShermanZero");
    "    *Joined chat!".success();

    this.loadCommands();

    `${"Twitch chat has been linked".inverse}\n...`.normal();
    chatClient.onPrivmsg((channel: string, username: string, message: string) => {
      if (message.indexOf(client.global_config.prefix) !== 0) return;

      let guildUsername: string = client.hasUser(client.defaultGuild, username, true);
      let guildUserContent: any;

      if (guildUsername) {
        guildUserContent = client.getUserContent(client.defaultGuild, guildUsername);

        `Member ${guildUserContent.hidden.username} just posted "${message}" in Twitch chat`.userLog(client, client.defaultGuild, guildUserContent, client.global_config.files.logs.twitch);
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

  loadCommands() {
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

        `--registering command ${commandName.cyan}`.normal();

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
