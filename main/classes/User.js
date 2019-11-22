const fs = require("fs");
const path = require("path");

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
    name = name.trim().toLowerCase();

    let jsonFile = path.join(__dirname, "..", "users", name, name+".json");

    if(!fs.existsSync(jsonFile)) return null;

    let json = fs.readFileSync(jsonFile);
    let content = JSON.parse(json);

    return content;
  }

  static getUserDirectoryFromName(name) {
    return path.join(__dirname, "..", "users", name);
  }

  //creates the user directory
  static createUserDirectory(name) {
    let basePath = path.join(__dirname, "..", "users", "base.json");
    let json = fs.readFileSync(basePath);
    let content = JSON.parse(json);

    content.name = name;

    let dir = path.join(__dirname, "..", "users", name);

    fs.mkdirSync(dir);
    fs.writeFileSync(`${dir}/${name}.json`, JSON.stringify(content, null, "\t"));
    fs.mkdirSync(`${dir}/logs`);

    console.log(`*Created [${name}] for session`);

    return content;
  }

  static writeUserContentToFile(client, name, content) {
    let dir = path.join(__dirname, "..", "users", name);

    if(!fs.existsSync(dir)) return;

    if(content.userLog.length != 0) {
      for(var i = 0; i < content.userLog.length; i++)
        fs.appendFileSync(`${dir}/logs/${client.config.files.log_all}`, content.userLog[i]);

      content.userLog = [];
    }

    fs.writeFileSync(`${dir}/${name}.json`, JSON.stringify(content, null, "\t"));
  }
}

module.exports = User;
