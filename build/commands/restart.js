"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Resources_1 = __importDefault(require("../classes/Resources"));
let alreadyShutdown = false;
exports.props = {
    "requiresElevation": "owner",
    "description": "shuts the bot down cleanly",
    "usage": ""
};
exports.run = (client, message, userTriggered = true) => {
    if (client.alreadyShutdown) {
        console.log("Already executed clean shutdown... restarting now".magenta);
        return true;
    }
    client.alreadyShutdown = true;
    console.log("Attempting to restart cleanly...".magenta);
    let entries = Object.entries(client.usersInSession);
    for (const [guild, users] of entries) {
        let allUsers = Object.entries(users);
        for (const [username, userContent] of allUsers)
            Resources_1.default.writeUserContentToFile(client, username, userContent);
    }
    if (userTriggered)
        message.delete().catch((err) => {
            console.log(err);
        });
    console.log("Successfully wrote user data to files!".magenta);
    for (var i = 0; i < client.masterLog.length; i++)
        fs_1.default.appendFileSync(path_1.default.join(__dirname, "..", "logs", client.config.files.log_all), client.masterLog[i]);
    console.log("Successfully stored pending user logs!".magenta);
    console.log("Destroying client...".magenta);
    client.destroy();
    console.log("Done".yellow);
    process.exit();
};
//# sourceMappingURL=restart.js.map