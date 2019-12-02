import { Client, Message } from "discord.js";
import * as fs from "fs";
import * as path from "path";

import rsrc from "../resources";
import { CommandType } from "../@interfaces/@commands";
import { GuildElevationTypes } from "../@interfaces/@guild_config";

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.moderator,
  description: "displays the last number of messages a member has posted",
  usage: "<?amount> <member | username>"
};

const run: CommandType["run"] = async (client: Client, message: Message, args: string[]): Promise<boolean> => {
  const member = message.mentions.members.first();

  let username: string;
  if (member) username = rsrc.getUsernameFromMember(member);
  if (!username) {
    const memberConfig = await rsrc.getMemberConfigFromNameWithGuild(client, message.guild, message, args[0], true);

    if (memberConfig) username = memberConfig.hidden.username;
    else {
      await message.reply("you need to specify a user");
      return false;
    }
  }

  let file = path.join(rsrc.getMemberDirectoryFromGuild(message.guild, username), "logs", client.discordConfig.logs.all);
  //parse amount
  let amount = !!parseInt(args[1]) ? parseInt(args[1]) : parseInt(args[2]);

  if (!amount || amount > 100) amount = 100;
  if (amount < 1) amount = 1;

  let logs: any;

  fs.readFile(
    file,
    "utf8",
    async (error, data): Promise<boolean> => {
      let config = client.getMemberConfig(message.guild, username);

      if (config.memberLog.length !== 0) data ? (data += config.memberLog.join("")) : (data = config.memberLog.join(""));

      if (error && !data) {
        await message.reply("that member does not have a log file");
        return false;
      }

      logs = data.split("\n");

      if (logs[logs.length - 1].trim() === "") logs = logs.slice(0, -1);

      if (amount > logs.length) amount = logs.length;

      logs = logs.slice(-amount);
      let result = amount == 1 ? logs[0] : logs.join("\n");

      await message.channel.send(`Here are the last ${amount} message(s) [${username.hideID()}] sent:\n\`\`\`json\n${result}\`\`\``, { split: { prepend: "```json\n", append: "```" } });
      return true;
    }
  );

  return true;
};

module.exports.run = run;
module.exports.properties = properties;
