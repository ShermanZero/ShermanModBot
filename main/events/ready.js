const fs = require("fs");

module.exports = (client) => {
  client.user.setActivity(client.config.status);

  fs.readFile("./resources/misc/boot.txt", "utf8", (err, data) => {
    console.log(data);
    let commandArray = client.commands.keyArray().sort();

    console.log(`Loaded ${commandArray.length} command(s): [${commandArray.toString().replace(/,/g ,", ")}]`);
    console.log(`Ready to serve in ${client.channels.size} channel(s) on ${client.guilds.size} server(s), for a total of ${client.users.size} users.\n`);
  });
}
