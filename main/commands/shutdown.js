const User = require("../classes/User.js");
const fs = require("fs");

exports.props = {
  "requiresElevation": true,
  "description": "shuts the bot down cleanly",
  "usage": ""
};

exports.run = (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR"))
    return;

  message.delete().catch((err) => {console.log(err)})
    .then(() => {
      //update all current users with their new content
      client.usersInSession.forEach((content, user) => {
        User.writeUserContentToFile(client, user, content);
      });

      //append all last log data to the master log
      for(var i = 0; i < client.masterLog.length; i++)
        fs.appendFileSync(`./logs/${client.config.files.log_all}`, client.masterLog[i]);

      client.destroy();
      process.exit();
    });;
}
