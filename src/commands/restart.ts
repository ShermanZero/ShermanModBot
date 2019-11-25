import 'colors';

import { Message } from 'discord.js';
import fs from 'fs';
import path from 'path';

import rsrc from '../classes/Resources';

exports.props = {
  requiresElevation: "owner",
  description: "shuts the bot down cleanly",
  usage: ""
};

exports.run = (
  client: any,
  message: Message,
  userTriggered: boolean = true
) => {
  if (client.alreadyShutdown) {
    console.log("Already executed clean shutdown... restarting now".magenta);
    return true;
  }

  client.alreadyShutdown = true;
  console.log("Attempting to restart cleanly...".magenta);

  let entries = Object.entries(client.usersInSession);
  for (const [, users] of entries) {
    let allUsers = Object.entries(users as any);

    for (const [username, userContent] of allUsers)
      rsrc.writeUserContentToFile(client, username, userContent);
  }

  //check if the command was user-triggered
  if (userTriggered)
    message.delete().catch(err => {
      console.log(err);
    });

  console.log("Successfully wrote user data to files!".magenta);

  //append all last log data to the master log
  for (var i = 0; i < client.masterLog.length; i++)
    fs.appendFileSync(
      path.join(__dirname, "..", "logs", client.config.files.log_all),
      client.masterLog[i]
    );

  console.log("Successfully stored pending user logs!".magenta);

  console.log("Destroying client...".magenta);
  client.destroy();

  console.log("Done".yellow);
  process.exit();
};
