//.on("guildMemberAdd") event
//called when a new member joins the server

module.exports = (client, member) => {
  const guild = member.guild;
  const defaultChannel = guild.channels.find(channel => channel.name === "welcome");

  let unrankedRole = guild.roles.get("609248072706424863");
  member.addRole(unrankedRole).catch((err) => {console.log(err)});

  defaultChannel.send(`Welcome ${member.user} to **${guild.name}**!  You are member **#${guild.memberCount}!  Check out the #server-rules and #server-information regarding the different channels.  **Please change your nickname to match your Twitch account name, and link your Twitch and Discord together.**  Be sure to assign yourself some roles over in #auto-roles, based on what you want to see!  Get to know everyone, have a great time, and thanks for joining!`).catch((err) => {console.log(err)});
}
