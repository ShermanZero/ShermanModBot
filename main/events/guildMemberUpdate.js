const User = require("../classes/User.js");

module.exports = (client, oldMember, newMember) => {
  console.log(`old: ${oldMember.displayName} | new: ${newMember.displayName}`);

  let oldUsername = User.getUsernameFromMember(oldMember);
  let newUsername = User.getUsernameFromMember(newMember);
  let content = User.createUserDirectory(newUsername);

  client.usersInSession.set(newUsername, content);
  console.log(`*Registered [${newUsername}] to session`);

  const cmd = client.commands.get("merge");
  cmd.run(client, null, [oldUsername, newUsername]);
}
