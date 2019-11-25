"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const fs_1 = require("fs");
const path_1 = require("path");
const Resources_1 = require("../classes/Resources");
exports.props = {
    requiresElevation: "owner",
    description: "shuts the bot down cleanly",
    usage: ""
};
exports.run = (client, message, userTriggered = true) => {
    if (client.alreadyShutdown) {
        console.log("Already executed clean shutdown... restarting now".magenta);
        return true;
    }
    client.alreadyShutdown = true;
    console.log("Attempting to restart cleanly...".magenta);
    let entries = Object.entries(client.usersInSession);
    for (const [, users] of entries) {
        let allUsers = Object.entries(users);
        for (const [username, userContent] of allUsers)
            Resources_1.default.writeUserContentToFile(client, username, userContent);
    }
    //check if the command was user-triggered
    if (userTriggered)
        message.delete().catch(err => {
            console.log(err);
        });
    console.log("Successfully wrote user data to files!".magenta);
    //append all last log data to the master log
    for (var i = 0; i < client.masterLog.length; i++)
        fs_1.default.appendFileSync(path_1.default.join(__dirname, "..", "logs", client.config.files.log_all), client.masterLog[i]);
    console.log("Successfully stored pending user logs!".magenta);
    console.log("Destroying client...".magenta);
    client.destroy();
    console.log("Done".yellow);
    process.exit();
};
//# sourceMappingURL=restart.js.map