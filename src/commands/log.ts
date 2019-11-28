import '../handlers/stringHandler';

import { Guild, Message } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';

import config from '../resources/global_config';
import rsrc from '../resources/resources';

module.exports.props = {
  requiresElevation: config.elevation_names.moderator,
  description: "displays the last number of messages a member has posted",
  usage: "<amount> <member>"
};

module.exports.run = async (client: any, message: Message, args: string[]) => {
  const user = message.mentions.users.first();

  if (!user)
    return message.reply("you need to specify a user").catch(err => {
      console.log(err);
    });

  let username = rsrc.getUsernameFromMember(user);
  let file = path.join(rsrc.getUserDirectoryFromGuild(message.guild as Guild, username), "logs", client.global_config.files.log_all);
  //parse amount
  let amount = !!parseInt(args[1]) ? parseInt(args[1]) : parseInt(args[2]);

  if (!amount || amount > 100) amount = 100;
  if (amount < 1) amount = 1;

  let logs: any;

  fs.readFile(file, "utf8", (error, data) => {
    let content = client.getUserContent(message.guild, username);

    if (content.userLog.length !== 0) data ? (data += content.userLog.join("")) : (data = content.userLog.join(""));

    if (error && !data) return message.reply("that user does not have a log file");

    logs = data.split("\n");

    if (logs[logs.length - 1].trim() === "") logs = logs.slice(0, -1);

    if (amount > logs.length) amount = logs.length;

    logs = logs.slice(-amount);
    let result = amount == 1 ? logs[0] : logs.join("\n");

    message.channel.send(`Here are the last ${amount} message(s) [${username.hideID()}] sent:\n${result}`, { split: true });
  });
};
