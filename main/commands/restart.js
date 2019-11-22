require("colors");

const fs = require("fs");
const path = require("path");
const User = require(path.join(__dirname, "..", "classes", "User.js"));

let alreadyShutdown = false;

exports.props = {
  "requiresElevation": "owner",
  "description": "shuts the bot down cleanly",
  "usage": ""
};

exports.run = (client, message, args) => {
  if(alreadyShutdown) {
    console.log("Already executed clean shutdown... restarting now".magenta);
    return true;
  }

  alreadyShutdown = true;

  console.log("Attempting to restart cleanly...".magenta);

  //check if the command was user-triggered
  if(message) message.delete().catch((err) => {console.log(err)});

  client.usersInSession.forEach((content, user) => {
    User.writeUserContentToFile(client, user, content);
  });

  console.log("Successfully wrote user data to files!".magenta);

  //append all last log data to the master log
  for(var i = 0; i < client.masterLog.length; i++)
    fs.appendFileSync(path.join(__dirname, "..", "logs", client.config.files.log_all), client.masterLog[i]);

  console.log("Succesfully stored pending user logs!".magenta);

  console.log("Destroying client...".magenta);
  client.destroy();

  console.log("Done".yellow);
  process.exit(99);
}
