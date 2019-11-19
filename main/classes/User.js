const fs = require("fs");

class User {

  static getUsernameFromMessage(message) {
    let username = message.member.user.tag.replace("#", "_");
    username = username.replace(/[^\w\s]/gi, '').toLowerCase();

    return username;
  }

  static getUsernameFromMember(member) {
    let username = member.user ? member.user.tag : member.tag;
    username = username.replace("#", "_").replace(/[^\w\s]/gi, '').toLowerCase();

    return username;
  }

  static getUserContentsFromName(name) {
    let jsonFile = `./users/${name}/${name}.json`;

    if(!fs.existsSync(jsonFile))
      return null;

    let json = fs.readFileSync(jsonFile);
    let content = JSON.parse(json);

    return content;
  }

  static getUserDirectoryFromName(name) {
    return "./users/" + name;
  }

  //creates the user directory
  static createUserDirectory(name) {
    let json = fs.readFileSync("./users/base.json");
    let content = JSON.parse(json);

    content.name = name;

    let dir = "./users/" + name;

    fs.mkdirSync(dir);
    fs.writeFileSync(`${dir}/${name}.json`, JSON.stringify(content, null, "\t"));
    fs.mkdirSync(`${dir}/logs`);

    console.log(`*Created [${name}] for session`);
  }

  static writeUserContentToFile(client, name, content) {
    let dir = "./users/" + name;

    if(content.userLog.length != 0) {
      for(var i = 0; i < content.userLog.length; i++)
        fs.appendFileSync(`${dir}/logs/${client.config.files.log_all}`, content.userLog[i]);

      content.userLog = [];
    }

    fs.writeFileSync(`${dir}/${name}.json`, JSON.stringify(content, null, "\t"));
  }
}

module.exports = User;
