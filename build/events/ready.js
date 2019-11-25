"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var ExitHandler_1 = __importDefault(require("../classes/ExitHandler"));
var Resources_1 = __importDefault(require("../classes/Resources"));
module.exports = function (client) {
    client.user.setActivity(client.config.status);
    var bootFile = path_1.default.join(__dirname, "..", "resources", "misc", "boot.txt");
    var data = fs_1.default.readFileSync(bootFile, "utf8");
    console.log(data.red);
    ExitHandler_1.default.init(client);
    var commandArray = client.commands.keyArray().sort();
    console.log("Loaded " + commandArray.length.toString().magenta + " command(s)", "[@everyone]".green, "[@moderator]".yellow, "[@owner]".red);
    for (var i = 0; i < commandArray.length; i++) {
        var commandName = commandArray[i];
        var command = client.commands.get(commandName);
        commandName = "[" + commandName + "]";
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
    client.guilds.forEach(function (guild) {
        var guildDir = Resources_1.default.getGuildDirectoryFromGuild(guild);
        if (!fs_1.default.existsSync(guildDir)) {
            fs_1.default.mkdirSync(guildDir);
            fs_1.default.mkdirSync(path_1.default.join(guildDir, client.config.files.removed));
        }
        var guildName = Resources_1.default.getGuildNameFromGuild(guild);
        //set the guild data to to the guild name
        client.usersInSession[guildName] = {};
        console.log("*Registered [" + guildName.magenta + "] to session --- looking for existing members:");
        fs_1.default.readdirSync(guildDir).forEach(function (dir) {
            var username = dir;
            //if the client does not have the user registered
            if (!client.hasUser(guild, username)) {
                var content = Resources_1.default.getUserContentsFromNameWithGuild(guild, null, username);
                if (content === null || typeof content === "undefined")
                    return;
                process.stdout.write("  ");
                client.registerUser(content);
            }
        });
        console.log("Found all existing members of [" + guildName.magenta + "] (currently " + Object.keys(client.getGuild(guildName)).length.toString().green + ")");
    });
    var readyMessage = ("Ready to serve in " + client.channels.size + " channel(s) on " + client.guilds.size + " guild(s), for a total of " + client.users.size + " users")
        .inverse;
    var footer = "====================================================================================="
        .red;
    console.log("...\n" + readyMessage + "\n" + footer);
};
//# sourceMappingURL=ready.js.map