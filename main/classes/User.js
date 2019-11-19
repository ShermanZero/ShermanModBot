const fs = require("fs");

class User {

  static getUserFromMessage(message) {
    return message.member.displayName.replace(/[^\w\s]/gi, '').toLowerCase();
  }

  static getUserContentsFromName(name) {
    let jsonFile = `./users/${name}/${name}.json`;

    let json = fs.readFileSync(jsonFile);
    let content = JSON.parse(json);

    return content;
  }

  static getUserDirectoryFromName(name) {
    return "./users/" + name;
  }

  //creates the user directory
  static createUserDirectory(user) {
    let json = fs.readFileSync("./users/base.json");
    let content = JSON.parse(json);

    content.name = user;

    let dir = "./users/" + user;

    fs.mkdirSync(dir);
    fs.writeFileSync(`${dir}/${user}.json`, JSON.stringify(content, null, "\t"));
    fs.mkdirSync(`${dir}/logs`);
  }

}

module.exports = User;
