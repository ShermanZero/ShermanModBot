"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const ExitHandler_1 = __importDefault(require("../classes/ExitHandler"));
const Resources_1 = __importDefault(require("../classes/Resources"));
module.exports = (client) => {
    client.user.setActivity(client.config.status);
    let bootFile = path.join(__dirname, "..", "resources", "misc", "boot.txt");
    let data = fs.readFileSync(bootFile, "utf8");
    console.log(data.red);
    ExitHandler_1.default.init(client);
    let commandArray = client.commands.keyArray().sort();
    console.log(`Loaded ${commandArray.length.toString().magenta} command(s)`, "[@everyone]".green, "[@moderator]".yellow, "[@owner]".red);
    for (var i = 0; i < commandArray.length; i++) {
        var commandName = commandArray[i];
        var command = client.commands.get(commandName);
        commandName = `[${commandName}]`;
        if (command.props.requiresElevation && command.props.requiresElevation === client.config.elevation_names.moderator)
            console.log(commandArray[i].yellow + " - " + command.props.description);
        else if (command.props.requiresElevation && command.props.requiresElevation === client.config.elevation_names.owner)
            console.log(commandArray[i].red + " - " + command.props.description);
        else
            console.log(commandArray[i].green + " - " + command.props.description);
    }
    console.log("...");
    client.guilds.forEach(guild => {
        let guildDir = Resources_1.default.getGuildDirectoryFromGuild(guild);
        if (!fs.existsSync(guildDir)) {
            fs.mkdirSync(guildDir);
            fs.mkdirSync(path.join(guildDir, client.config.files.removed));
        }
        else if (guild.deleted)
            return fs.rmdirSync(guildDir);
        let guildName = Resources_1.default.getGuildNameFromGuild(guild);
        client.usersInSession[guildName] = {};
        console.log(`*Registered [${guildName.magenta}] to session --- looking for existing members:`);
        fs.readdirSync(guildDir).forEach(dir => {
            let username = dir;
            if (!client.hasUser(guild, username)) {
                let content = Resources_1.default.getUserContentsFromNameWithGuild(guild, null, username);
                if (content === null || typeof content === "undefined")
                    return;
                process.stdout.write("  ");
                client.registerUser(content);
            }
        });
        console.log(`Found all existing members of [${guildName.magenta}] (currently ${(Object.keys(client.getGuild(guildName)).length).toString().green})`);
    });
    let readyMessage = `Ready to serve in ${client.channels.size} channel(s) on ${client.guilds.size} guild(s), for a total of ${client.users.size} users`.inverse;
    let footer = "=====================================================================================".red;
    console.log(`...\n${readyMessage}\n${footer}`);
};
//# sourceMappingURL=ready.js.map