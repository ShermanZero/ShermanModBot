require("colors");

const fs = require("fs");
const path = require("path");
const Resources = require(path.join(__dirname, "..", "classes", "Resources.js"));

let alreadyShutdown = false;

exports.props = {
  "requiresElevation": "owner",
  "description": "shuts the bot down cleanly",
  "usage": ""
};

exports.run = (client, message, userTriggered = true) => {
  if(client.alreadyShutdown) {
    console.log("Already executed clean shutdown... restarting now".magenta);
    return true;
  }

  client.alreadyShutdown = true;
  console.log("Attempting to restart cleanly...".magenta);

  client.usersInSession.forEach((content, guildName) => {
    let usersInGuild = Object.entries(content);

    for(let [username, userContent] of usersInGuild)
      Resources.writeUserContentToFile(client, username, userContent.content);
  });

  //check if the command was user-triggered
  if (userTriggered) message.delete().catch((err) => {
    console.log(err)
  });

  console.log("Successfully wrote user data to files!".magenta);

  //append all last log data to the master log
  for(var i = 0; i < client.masterLog.length; i++)
    fs.appendFileSync(path.join(__dirname, "..", "logs", client.config.files.log_all), client.masterLog[i]);

  console.log("Successfully stored pending user logs!".magenta);

  console.log("Destroying client...".magenta);
  client.destroy();

  console.log("Done".yellow);
  process.exit();
}
