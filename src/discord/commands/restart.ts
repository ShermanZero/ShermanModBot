import { Client, Message } from "discord.js";
import * as fs from "fs";
import * as path from "path";

import { CommandType } from "../@interfaces/@commands";
import { GuildElevationTypes } from "../@interfaces/@guild_config";
import { DiscordSecrets } from "../secrets/discord-secrets";

const properties: CommandType["properties"] = {
  elevation: GuildElevationTypes.botowner,
  description: "restarts the bot (but doesn't shut it down) any .js files will still need to be regenerate with a full !shutdown"
};

const run: CommandType["run"] = async (client: Client, message: Message, memberTriggered: boolean): Promise<boolean> => {
  await client.writeAllData();

  //check if the command was member-triggered
  if (memberTriggered) await message.delete();

  //append all last log data to the master log
  for (let i = 0; i < client.masterLog.length; i++) fs.appendFileSync(path.join(__dirname, "..", "guilds", "logs", client.discordConfig.logs.all), client.masterLog[i]);

  "Destroying client...".magenta.mention();
  client.destroy();

  client.destroy();

  "Done".yellow.print();

  "Logging back in...".highlight();
  client.login(DiscordSecrets.token);

  return true;
};

module.exports.run = run;
module.exports.properties = properties;
