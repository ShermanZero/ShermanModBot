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
  static createUserDirectory(name) {
    let json = fs.readFileSync("./users/base.json");
    let content = JSON.parse(json);

    content.name = name;

    let dir = "./users/" + name;

    fs.mkdirSync(dir);
    fs.writeFileSync(`${dir}/${name}.json`, JSON.stringify(content, null, "\t"));
    fs.mkdirSync(`${dir}/logs`);
  }

  static writeUserContentToFile(client, name, content) {
    let dir = "./users/" + name;

    if(content.log.length != 0) {
      for(var i = 0; i < content.log.length; i++)
        fs.appendFileSync(`${dir}/logs/${client.config.files.log_all}`, content.log[i]);

      content.log = [];
    }

    fs.writeFileSync(`${dir}/${name}.json`, JSON.stringify(content, null, "\t"));
  }
}

module.exports = User;
