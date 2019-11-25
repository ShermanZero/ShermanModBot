"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const fs_1 = require("fs");
const path_1 = require("path");
const ExitHandler_1 = require("../classes/ExitHandler");
const Resources_1 = require("../classes/Resources");
module.exports = (client) => {
    client.user.setActivity(client.config.status);
    let bootFile = path_1.default.join(__dirname, "..", "resources", "misc", "boot.txt");
    let data = fs_1.default.readFileSync(bootFile, "utf8");
    console.log(data.red);
    ExitHandler_1.default.init(client);
    let commandArray = client.commands.keyArray().sort();
    console.log(`Loaded ${commandArray.length.toString().magenta} command(s)`, "[@everyone]".green, "[@moderator]".yellow, "[@owner]".red);
    for (var i = 0; i < commandArray.length; i++) {
        var commandName = commandArray[i];
        var command = client.commands.get(commandName);
        commandName = `[${commandName}]`;
        if (command.props.requiresElevation &&
            command.props.requiresElevation ===
                client.config.elevation_names.moderator)
            console.log(commandArray[i].yellow + " - " + command.props.description);
        else if (command.props.requiresElevation &&
            command.props.requiresElevation === client.config.elevation_names.owner)
            console.log(commandArray[i].red + " - " + command.props.description);
        else
            console.log(commandArray[i].green + " - " + command.props.description);
    }
    console.log("...");
    client.guilds.forEach((guild) => {
        let guildDir = Resources_1.default.getGuildDirectoryFromGuild(guild);
        if (!fs_1.default.existsSync(guildDir)) {
            fs_1.default.mkdirSync(guildDir);
            fs_1.default.mkdirSync(path_1.default.join(guildDir, client.config.files.removed));
        }
        let guildName = Resources_1.default.getGuildNameFromGuild(guild);
        //set the guild data to to the guild name
        client.usersInSession[guildName] = {};
        console.log(`*Registered [${guildName.magenta}] to session --- looking for existing members:`);
        fs_1.default.readdirSync(guildDir).forEach(dir => {
            let username = dir;
            //if the client does not have the user registered
            if (!client.hasUser(guild, username)) {
                let content = Resources_1.default.getUserContentsFromNameWithGuild(guild, null, username);
                if (content === null || typeof content === "undefined")
                    return;
                process.stdout.write("  ");
                client.registerUser(content);
            }
        });
        console.log(`Found all existing members of [${guildName.magenta}] (currently ${Object.keys(client.getGuild(guildName)).length.toString().green})`);
    });
    let readyMessage = `Ready to serve in ${client.channels.size} channel(s) on ${client.guilds.size} guild(s), for a total of ${client.users.size} users`
        .inverse;
    let footer = "====================================================================================="
        .red;
    console.log(`...\n${readyMessage}\n${footer}`);
};
//# sourceMappingURL=ready.js.map