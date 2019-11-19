const User = require("../classes/User.js");

exports.props = {
  "requiresElevation": true,
  "description": "shuts the bot down cleanly",
  "usage": ""
};

exports.run = (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR"))
    return;

  client.usersInSession.forEach((content, user) => {
    User.writeUserContentToFile(client, user, content);
  });

  client.destroy();
  process.exit();
}
