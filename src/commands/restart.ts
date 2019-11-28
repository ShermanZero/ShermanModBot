import 'colors';

import { Message } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';

import config from '../resources/global_config';
import rsrc from '../resources/resources';

module.exports.props = {
  requiresElevation: config.elevation_names.botowner,
  description: "shuts the bot down cleanly"
};

module.exports.run = async (client: any, message: Message, userTriggered: boolean = true) => {
  if (client.alreadyShutdown) {
    "Already executed clean shutdown... restarting now".mention;
    return true;
  }

  client.alreadyShutdown = true;
  "Attempting to restart cleanly...".mention;

  let entries = Object.entries(client.usersInSession);
  for (const [, users] of entries) {
    let allUsers = Object.entries(users as any);

    for (const [username, userContent] of allUsers) rsrc.writeUserContentToFile(client, username, userContent);
  }

  //check if the command was user-triggered
  if (userTriggered) await message.delete();

  "Successfully wrote user data to files!".mention;

  //append all last log data to the master log
  for (let i = 0; i < client.masterLog.length; i++) fs.appendFileSync(path.join(__dirname, "..", "logs", client.global_config.files.logs.all), client.masterLog[i]);

  "Successfully stored pending user logs!".mention;

  "Destroying client...".magenta.mention;
  client.destroy();

  "Done".highlight(true);
  process.exit();
};
