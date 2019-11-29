import { Client, Message } from "discord.js";
import * as fs from "fs";
import * as path from "path";

import rsrc from "../discord-resources";
import { MemberConfig } from "../configs/member_config";

module.exports.props = {
  requiresElevation: DiscordConfig.elevation_names.botowner,
  description: "shuts the bot down cleanly"
};

module.exports.run = async (client: Client, message: Message, memberTriggered: boolean = true): Promise<boolean> => {
  if (client.alreadyShutdown) {
    "Already executed clean shutdown... restarting now".mention();
    return true;
  }

  client.alreadyShutdown = true;
  "Attempting to restart cleanly...".mention();

  let entries = Object.entries(client.members_in_session);
  for (const [, members] of entries) {
    let allMembers = Object.entries(members);

    for (const [username, memberConfig] of allMembers) rsrc.writeMemberConfigToFile(client, username, memberConfig as MemberConfig);
  }

  //check if the command was member-triggered
  if (memberTriggered) await message.delete();

  "Successfully wrote member data to files!".mention();

  //append all last log data to the master log
  for (let i = 0; i < client.masterLog.length; i++) fs.appendFileSync(path.join(__dirname, "..", "discord", "logs", DiscordConfig.logs.all), client.masterLog[i]);

  "Successfully stored pending member logs!".mention();

  "Destroying client...".magenta.mention();
  client.destroy();

  "Done".highlight();
  process.exit();
};
