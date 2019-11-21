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

  //check if the command was user-triggered
  if(message) message.delete().catch((err) => {console.log(err)});

  client.usersInSession.forEach((content, user) => {
    User.writeUserContentToFile(client, user, content);
  });

  //append all last log data to the master log
  for(var i = 0; i < client.masterLog.length; i++)
    fs.appendFileSync(path.join(__dirname, "..", "logs", client.config.files.log_all), client.masterLog[i]);

  console.log("Destroying client...".magenta);
  client.destroy();

  console.log("Done".yellow);
  process.exit(99);
}
