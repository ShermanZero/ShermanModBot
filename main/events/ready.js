//.on("ready") event

module.exports = (client) => {
  client.user.setActivity(client.config.status);

  console.log(`Ready to serve in ${client.channels.size} channel(s) on ${client.guilds.size} server(s), for a total of ${client.users.size} users.`);
}
