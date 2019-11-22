const path = require("path");
const Resources = require(path.join(__dirname, "..", "classes", "Resources.js"));

module.exports = (client, oldMember, newMember) => {
  console.log(`old: ${oldMember.displayName} | new: ${newMember.displayName}`);

  let oldUsername = Resources.getUsernameFromMember(oldMember);
  let newUsername = Resources.getUsernameFromMember(newMember);
  let content = Resources.createUserDirectory(client, newMember.guild, newMember);

  client.usersInSession.set(newUsername, content);
  console.log(`*Registered [${newUsername}] to session`);

  const cmd = client.commands.get("merge");
  cmd.run(client, null, [oldUsername, newUsername]);
}
