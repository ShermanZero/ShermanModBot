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

    console.log(`...\n${"Beginning Twitch integration".inverse}`);

    console.log("  *Attempting to authorize to Twitch...");
    const twitchClient = await TwitchClient.withCredentials(clientID, accessToken);

    console.log("  *Attempting to authorize chat client...");
    const chatClient = await ChatClient.forTwitchClient(twitchClient);

    console.log("    *Successful authorization to Twitch!".green);

    await chatClient.connect();

    console.log("  *Connected to chat client, awaiting registration...");
    await chatClient.waitForRegistration();

    console.log("  *Got registration, attempting to join....");
    await chatClient.join("ShermanZero");

    console.log("    *Joined chat!".green);

    this.loadCommands();

    console.log(`${"Twitch chat has been linked".inverse}\n...`);

    chatClient.onPrivmsg((channel: string, username: string, message: string) => {
      if (message.indexOf(client.global_config.prefix) !== 0) return;

      let guildUsername: string = client.hasUser(client.defaultGuild, username, true);
      let guildUser: any;

      console.log("username:", username, "guildUsername:", guildUsername);

      if (guildUsername) {
        guildUser = client.getUserContent(client.defaultGuild, guildUsername);
        console.log(`Member ${guildUser.hidden.name} just posted "${message}" in Twitch chat`);
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
      if (err) return console.error(err);
      files.forEach(function(file) {
        if (!file.endsWith(".js")) return;

        let command: any = require(path.join(commandsPath, file));
        let commandName = file.split(".")[0];

        console.log("--registering command", commandName, command);

        //store the command
        commands.set(commandName, command);

        //store the aliases as well
        command.aliases?.forEach((alias: string) => {
          aliases.set(alias, commandName);
        });

        console.log("--completed".green);
      });
    });

    this.commands = commands;
    this.aliases = aliases;
  }
}
