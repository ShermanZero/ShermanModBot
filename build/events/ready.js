"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const fs = require("fs");
const path = require("path");
const ExitHandler_1 = require("../classes/ExitHandler");
const Resources_1 = require("../classes/Resources");
const boot_1 = require("../resources/boot");
module.exports = (client) => {
    client.user.setActivity(client.global_config.status);
    console.log(boot_1.default.red);
    ExitHandler_1.default.init(client);
    let commandArray = [...client.commands.keys()].sort();
    console.log(`Loaded ${commandArray.length.toString().magenta} command(s)`, "[@everyone]".green, "[@moderator]".yellow, "[@owner]".red, "[@botowner]".cyan);
    for (let i = 0; i < commandArray.length; i++) {
        let commandName = commandArray[i];
        let command = client.commands.get(commandName);
        if (command.props.requiresElevation) {
            if (command.props.requiresElevation === client.global_config.elevation_names.moderator) {
                commandName = commandName.yellow;
            }
            else if (command.props.requiresElevation === client.global_config.elevation_names.owner) {
                commandName = commandName.red;
            }
            else if (command.props.requiresElevation === client.global_config.elevation_names.botowner) {
                commandName = commandName.cyan;
            }
        }
        else {
            commandName = commandName.green;
        }
        console.log(`${('[' + commandName + ']').padEnd(30, ".")} ${command.props.description}`);
    }
    console.log("...");
    client.guilds.forEach((guild) => {
        let guildDir = Resources_1.default.getGuildDirectoryFromGuild(guild);
        if (!fs.existsSync(guildDir)) {
            fs.mkdirSync(guildDir, { recursive: true });
            fs.mkdirSync(path.join(guildDir, client.global_config.files.removed), {
                recursive: true
            });
        }
        let guildName = Resources_1.default.getGuildNameFromGuild(guild);
        client.usersInSession[guildName] = {};
        console.log(`*Registered [${guildName.magenta}] to session --- looking for existing members:`);
        fs.readdirSync(guildDir).forEach(dir => {
            let username = dir;
            if (!client.hasUser(guild, username)) {
                let content = Resources_1.default.getUserContentsFromNameWithGuild(client, guild, null, username);
                if (content === null || typeof content === "undefined")
                    return;
                process.stdout.write("  ");
                client.registerUser(content);
            }
        });
        console.log(`Found all existing members of [${guildName.magenta}] (currently ${Object.keys(client.getGuild(guildName)).length.toString().green})`);
    });
    let readyMessage = `Ready to serve in ${client.channels.size} channel(s) on ${client.guilds.size} guild(s), for a total of ${client.users.size} users`.inverse;
    let footer = "=====================================================================================".red;
    console.log(`...\n${readyMessage}\n${footer}`);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXZlbnRzL3JlYWR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWdCO0FBR2hCLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFFN0Isd0RBQTBDO0FBQzFDLG9EQUF3QztBQUN4Qyw0Q0FBcUM7QUFFckMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQVcsRUFBRSxFQUFFO0lBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFdEIscUJBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFbEIsSUFBSSxZQUFZLEdBQWEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLGFBQWEsRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFM0osS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDNUMsSUFBSSxXQUFXLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRS9DLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTtZQUNuQyxJQUFJLE9B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LE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxrQkFBa0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLDZCQUE2QixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUMvSixJQUFJLE1BQU0sR0FBRyx1RkFBdUYsQ0FBQyxHQUFHLENBQUM7SUFFekcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLFlBQVksS0FBSyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQ2pELENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnY29sb3JzJztcclxuXHJcbmltcG9ydCB7IEd1aWxkLCBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbmltcG9ydCBleGl0IGZyb20gJy4uL2NsYXNzZXMvRXhpdEhhbmRsZXInO1xyXG5pbXBvcnQgcnNyYyBmcm9tICcuLi9jbGFzc2VzL1Jlc291cmNlcyc7XHJcbmltcG9ydCBib290IGZyb20gJy4uL3Jlc291cmNlcy9ib290JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGNsaWVudDogYW55KSA9PiB7XHJcbiAgY2xpZW50LnVzZXIuc2V0QWN0aXZpdHkoY2xpZW50Lmdsb2JhbF9jb25maWcuc3RhdHVzKTtcclxuXHJcbiAgY29uc29sZS5sb2coYm9vdC5yZWQpO1xyXG5cclxuICBleGl0LmluaXQoY2xpZW50KTtcclxuXHJcbiAgbGV0IGNvbW1hbmRBcnJheTogc3RyaW5nW10gPSBbLi4uY2xpZW50LmNvbW1hbmRzLmtleXMoKV0uc29ydCgpO1xyXG4gIGNvbnNvbGUubG9nKGBMb2FkZWQgJHtjb21tYW5kQXJyYXkubGVuZ3RoLnRvU3RyaW5nKCkubWFnZW50YX0gY29tbWFuZChzKWAsIFwiW0BldmVyeW9uZV1cIi5ncmVlbiwgXCJbQG1vZGVyYXRvcl1cIi55ZWxsb3csIFwiW0Bvd25lcl1cIi5yZWQsIFwiW0Bib3Rvd25lcl1cIi5jeWFuKTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21tYW5kQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgIGxldCBjb21tYW5kTmFtZSA9IGNvbW1hbmRBcnJheVtpXTtcclxuICAgIGxldCBjb21tYW5kID0gY2xpZW50LmNvbW1hbmRzLmdldChjb21tYW5kTmFtZSk7XHJcblxyXG4gICAgaWYgKGNvbW1hbmQucHJvcHMucmVxdWlyZXNFbGV2YXRpb24pIHtcclxuICAgICAgaWYgKGNvbW1hbmQucHJvcHMucmVxdWlyZXNFbGV2YXRpb24gPT09IGNsaWVudC5nbG9iYWxfY29uZmlnLmVsZXZhdGlvbl9uYW1lcy5tb2RlcmF0b3IpIHtcclxuICAgICAgICBjb21tYW5kTmFtZSA9IGNvbW1hbmROYW1lLnllbGxvdztcclxuICAgICAgfSBlbHNlIGlmIChjb21tYW5kLnByb3BzLnJlcXVpcmVzRWxldmF0aW9uID09PSBjbGllbnQuZ2xvYmFsX2NvbmZpZy5lbGV2YXRpb25fbmFtZXMub3duZXIpIHtcclxuICAgICAgICBjb21tYW5kTmFtZSA9IGNvbW1hbmROYW1lLnJlZDtcclxuICAgICAgfSBlbHNlIGlmIChjb21tYW5kLnByb3BzLnJlcXVpcmVzRWxldmF0aW9uID09PSBjbGllbnQuZ2xvYmFsX2NvbmZpZy5lbGV2YXRpb25fbmFtZXMuYm90b3duZXIpIHtcclxuICAgICAgICBjb21tYW5kTmFtZSA9IGNvbW1hbmROYW1lLmN5YW47XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbW1hbmROYW1lID0gY29tbWFuZE5hbWUuZ3JlZW47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2coYCR7ICgnWycrY29tbWFuZE5hbWUrJ10nKS5wYWRFbmQoMzAsIFwiLlwiKSB9ICR7Y29tbWFuZC5wcm9wcy5kZXNjcmlwdGlvbn1gKTtcclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKFwiLi4uXCIpO1xyXG5cclxuICBjbGllbnQuZ3VpbGRzLmZvckVhY2goKGd1aWxkOiBHdWlsZCkgPT4ge1xyXG4gICAgbGV0IGd1aWxkRGlyID0gcnNyYy5nZXRHdWlsZERpcmVjdG9yeUZyb21HdWlsZChndWlsZCk7XHJcblxyXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGd1aWxkRGlyKSkge1xyXG4gICAgICBmcy5ta2RpclN5bmMoZ3VpbGREaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xyXG4gICAgICBmcy5ta2RpclN5bmMocGF0aC5qb2luKGd1aWxkRGlyLCBjbGllbnQuZ2xvYmFsX2NvbmZpZy5maWxlcy5yZW1vdmVkKSwge1xyXG4gICAgICAgIHJlY3Vyc2l2ZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGxldCBndWlsZE5hbWUgPSByc3JjLmdldEd1aWxkTmFtZUZyb21HdWlsZChndWlsZCk7XHJcblxyXG4gICAgLy9zZXQgdGhlIGd1aWxkIGRhdGEgdG8gdG8gdGhlIGd1aWxkIG5hbWVcclxuICAgIGNsaWVudC51c2Vyc0luU2Vzc2lvbltndWlsZE5hbWVdID0ge307XHJcbiAgICBjb25zb2xlLmxvZyhgKlJlZ2lzdGVyZWQgWyR7Z3VpbGROYW1lLm1hZ2VudGF9XSB0byBzZXNzaW9uIC0tLSBsb29raW5nIGZvciBleGlzdGluZyBtZW1iZXJzOmApO1xyXG5cclxuICAgIGZzLnJlYWRkaXJTeW5jKGd1aWxkRGlyKS5mb3JFYWNoKGRpciA9PiB7XHJcbiAgICAgIGxldCB1c2VybmFtZSA9IGRpcjtcclxuXHJcbiAgICAgIC8vaWYgdGhlIGNsaWVudCBkb2VzIG5vdCBoYXZlIHRoZSB1c2VyIHJlZ2lzdGVyZWRcclxuICAgICAgaWYgKCFjbGllbnQuaGFzVXNlcihndWlsZCwgdXNlcm5hbWUpKSB7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSByc3JjLmdldFVzZXJDb250ZW50c0Zyb21OYW1lV2l0aEd1aWxkKGNsaWVudCwgZ3VpbGQsIChudWxsIGFzIHVua25vd24pIGFzIE1lc3NhZ2UsIHVzZXJuYW1lKTtcclxuICAgICAgICBpZiAoY29udGVudCA9PT0gbnVsbCB8fCB0eXBlb2YgY29udGVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG5cclxuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShcIiAgXCIpO1xyXG4gICAgICAgIGNsaWVudC5yZWdpc3RlclVzZXIoY29udGVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGBGb3VuZCBhbGwgZXhpc3RpbmcgbWVtYmVycyBvZiBbJHtndWlsZE5hbWUubWFnZW50YX1dIChjdXJyZW50bHkgJHtPYmplY3Qua2V5cyhjbGllbnQuZ2V0R3VpbGQoZ3VpbGROYW1lKSkubGVuZ3RoLnRvU3RyaW5nKCkuZ3JlZW59KWApO1xyXG4gIH0pO1xyXG5cclxuICBsZXQgcmVhZHlNZXNzYWdlID0gYFJlYWR5IHRvIHNlcnZlIGluICR7Y2xpZW50LmNoYW5uZWxzLnNpemV9IGNoYW5uZWwocykgb24gJHtjbGllbnQuZ3VpbGRzLnNpemV9IGd1aWxkKHMpLCBmb3IgYSB0b3RhbCBvZiAke2NsaWVudC51c2Vycy5zaXplfSB1c2Vyc2AuaW52ZXJzZTtcclxuICBsZXQgZm9vdGVyID0gXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIucmVkO1xyXG5cclxuICBjb25zb2xlLmxvZyhgLi4uXFxuJHtyZWFkeU1lc3NhZ2V9XFxuJHtmb290ZXJ9YCk7XHJcbn07XHJcbiJdfQ==