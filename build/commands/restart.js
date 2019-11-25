"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Resources_1 = __importDefault(require("../classes/Resources"));
exports.props = {
    requiresElevation: "owner",
    description: "shuts the bot down cleanly",
    usage: ""
};
exports.run = function (client, message, userTriggered) {
    if (userTriggered === void 0) { userTriggered = true; }
    if (client.alreadyShutdown) {
        console.log("Already executed clean shutdown... restarting now".magenta);
        return true;
    }
    client.alreadyShutdown = true;
    console.log("Attempting to restart cleanly...".magenta);
    var entries = Object.entries(client.usersInSession);
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var _a = entries_1[_i], users = _a[1];
        var allUsers = Object.entries(users);
        for (var _b = 0, allUsers_1 = allUsers; _b < allUsers_1.length; _b++) {
            var _c = allUsers_1[_b], username = _c[0], userContent = _c[1];
            Resources_1.default.writeUserContentToFile(client, username, userContent);
        }
    }
    //check if the command was user-triggered
    if (userTriggered)
        message.delete().catch(function (err) {
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