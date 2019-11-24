const fs = require("fs");
const path = require("path");
const Resources = require(path.join(__dirname, "..", "classes", "Resources.js"));
require(path.join(__dirname, "..", "classes", "StringHandler.js"));

exports.props = {
  "requiresElevation": "mod",
  "description": "displays all users registered in the server",
  "usage": ""
};

exports.run = (client, message, args) => {
  let guildUsers = Resources.getGuildUsersFromGuild(client, message.guild);
  let allUsers = Object.keys(guildUsers);

  message.reply(`here are the current registered users of the server:\n[**${allUsers.join("**, **")}**]`);
}
