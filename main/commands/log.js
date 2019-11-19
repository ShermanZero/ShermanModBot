const fs = require("fs");
const User = require("../classes/User.js");

exports.props = {
  "requiresElevation": "mod",
  "description": "displays the last number of messages a user has posted",
  "usage": "{amount} {user}"
};

exports.run = (client, message, args) => {
  const user = message.mentions.users.first();

  if(!user) return message.reply("you need to specify a user").catch((err) => {console.log(err)});

  let username = User.getUsernameFromMember(user);
  let file = `./users/${username}/logs/${client.config.files.log_all}`;
  //parse amount
  let amount = !!parseInt(args[1]) ? parseInt(args[1]) : parseInt(args[2]);

  if(!amount || amount > 100) amount = 100;
  if(amount < 1) amount = 1;

  fs.readFile(file, "utf8", (error, data) => {
    if(error) return message.reply("that user does not have a log file");

    let logs = data.split("\n");

    if(logs[logs.length - 1].trim() === "")
      logs = logs.slice(0, -1);

    if(amount > logs.length)
      amount = logs.length;

    logs = logs.slice(-amount);
    let result = (amount == 1 ? logs[0] : logs.join("\n"));

    message.channel.send(`Here are the last ${amount} message(s) [${username}] sent:\n${result}`, { split: true });
  });
}
