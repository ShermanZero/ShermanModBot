"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const fs = require("fs");
const path = require("path");
const ExitHandler_1 = require("../classes/ExitHandler");
const Resources_1 = require("../classes/Resources");
const boot_1 = require("../resources/misc/boot");
module.exports = (client) => {
    client.user.setActivity(client.config.status);
    console.log(boot_1.default.red);
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
        if (!fs.existsSync(guildDir)) {
            fs.mkdirSync(guildDir);
            fs.mkdirSync(path.join(guildDir, client.config.files.removed));
        }
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
        console.log(`Found all existing members of [${guildName.magenta}] (currently ${Object.keys(client.getGuild(guildName)).length.toString().green})`);
    });
    let readyMessage = `Ready to serve in ${client.channels.size} channel(s) on ${client.guilds.size} guild(s), for a total of ${client.users.size} users`
        .inverse;
    let footer = "====================================================================================="
        .red;
    console.log(`...\n${readyMessage}\n${footer}`);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXZlbnRzL3JlYWR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWdCO0FBR2hCLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFFN0Isd0RBQTBDO0FBQzFDLG9EQUF3QztBQUN4QyxpREFBMEM7QUFFMUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQVcsRUFBRSxFQUFFO0lBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFdEIscUJBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFbEIsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyRCxPQUFPLENBQUMsR0FBRyxDQUNULFVBQVUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLGFBQWEsRUFDN0QsYUFBYSxDQUFDLEtBQUssRUFDbkIsY0FBYyxDQUFDLE1BQU0sRUFDckIsVUFBVSxDQUFDLEdBQUcsQ0FDZixDQUFDO0lBRUYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDNUMsSUFBSSxXQUFXLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRS9DLFdBQVcsR0FBRyxJQUFJLFdBQVcsR0FBRyxDQUFDO1FBRWpDLElBQ0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7WUFDL0IsT0FBTyxDQUFD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RyxHQUFHLENBQUM7SUFFUCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsWUFBWSxLQUFLLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDakQsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdjb2xvcnMnO1xyXG5cclxuaW1wb3J0IHsgR3VpbGQsIE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuaW1wb3J0IGV4aXQgZnJvbSAnLi4vY2xhc3Nlcy9FeGl0SGFuZGxlcic7XHJcbmltcG9ydCByc3JjIGZyb20gJy4uL2NsYXNzZXMvUmVzb3VyY2VzJztcclxuaW1wb3J0IGJvb3QgZnJvbSAnLi4vcmVzb3VyY2VzL21pc2MvYm9vdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChjbGllbnQ6IGFueSkgPT4ge1xyXG4gIGNsaWVudC51c2VyLnNldEFjdGl2aXR5KGNsaWVudC5jb25maWcuc3RhdHVzKTtcclxuXHJcbiAgY29uc29sZS5sb2coYm9vdC5yZWQpO1xyXG5cclxuICBleGl0LmluaXQoY2xpZW50KTtcclxuXHJcbiAgbGV0IGNvbW1hbmRBcnJheSA9IGNsaWVudC5jb21tYW5kcy5rZXlBcnJheSgpLnNvcnQoKTtcclxuICBjb25zb2xlLmxvZyhcclxuICAgIGBMb2FkZWQgJHtjb21tYW5kQXJyYXkubGVuZ3RoLnRvU3RyaW5nKCkubWFnZW50YX0gY29tbWFuZChzKWAsXHJcbiAgICBcIltAZXZlcnlvbmVdXCIuZ3JlZW4sXHJcbiAgICBcIltAbW9kZXJhdG9yXVwiLnllbGxvdyxcclxuICAgIFwiW0Bvd25lcl1cIi5yZWRcclxuICApO1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbW1hbmRBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGNvbW1hbmROYW1lID0gY29tbWFuZEFycmF5W2ldO1xyXG4gICAgdmFyIGNvbW1hbmQgPSBjbGllbnQuY29tbWFuZHMuZ2V0KGNvbW1hbmROYW1lKTtcclxuXHJcbiAgICBjb21tYW5kTmFtZSA9IGBbJHtjb21tYW5kTmFtZX1dYDtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIGNvbW1hbmQucHJvcHMucmVxdWlyZXNFbGV2YXRpb24gJiZcclxuICAgICAgY29tbWFuZC5wcm9wcy5yZXF1aXJlc0VsZXZhdGlvbiA9PT1cclxuICAgICAgICBjbGllbnQuY29uZmlnLmVsZXZhdGlvbl9uYW1lcy5tb2RlcmF0b3JcclxuICAgIClcclxuICAgICAgY29uc29sZS5sb2coY29tbWFuZEFycmF5W2ldLnllbGxvdyArIFwiIC0gXCIgKyBjb21tYW5kLnByb3BzLmRlc2NyaXB0aW9uKTtcclxuICAgIGVsc2UgaWYgKFxyXG4gICAgICBjb21tYW5kLnByb3BzLnJlcXVpcmVzRWxldmF0aW9uICYmXHJcbiAgICAgIGNvbW1hbmQucHJvcHMucmVxdWlyZXNFbGV2YXRpb24gPT09IGNsaWVudC5jb25maWcuZWxldmF0aW9uX25hbWVzLm93bmVyXHJcbiAgICApXHJcbiAgICAgIGNvbnNvbGUubG9nKGNvbW1hbmRBcnJheVtpXS5yZWQgKyBcIiAtIFwiICsgY29tbWFuZC5wcm9wcy5kZXNjcmlwdGlvbik7XHJcbiAgICBlbHNlIGNvbnNvbGUubG9nKGNvbW1hbmRBcnJheVtpXS5ncmVlbiArIFwiIC0gXCIgKyBjb21tYW5kLnByb3BzLmRlc2NyaXB0aW9uKTtcclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKFwiLi4uXCIpO1xyXG5cclxuICBjbGllbnQuZ3VpbGRzLmZvckVhY2goKGd1aWxkOiBHdWlsZCkgPT4ge1xyXG4gICAgbGV0IGd1aWxkRGlyID0gcnNyYy5nZXRHdWlsZERpcmVjdG9yeUZyb21HdWlsZChndWlsZCk7XHJcblxyXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGd1aWxkRGlyKSkge1xyXG4gICAgICBmcy5ta2RpclN5bmMoZ3VpbGREaXIpO1xyXG4gICAgICBmcy5ta2RpclN5bmMocGF0aC5qb2luKGd1aWxkRGlyLCBjbGllbnQuY29uZmlnLmZpbGVzLnJlbW92ZWQpKTtcclxuICAgIH1cclxuICAgIGxldCBndWlsZE5hbWUgPSByc3JjLmdldEd1aWxkTmFtZUZyb21HdWlsZChndWlsZCk7XHJcblxyXG4gICAgLy9zZXQgdGhlIGd1aWxkIGRhdGEgdG8gdG8gdGhlIGd1aWxkIG5hbWVcclxuICAgIGNsaWVudC51c2Vyc0luU2Vzc2lvbltndWlsZE5hbWVdID0ge307XHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgYCpSZWdpc3RlcmVkIFske2d1aWxkTmFtZS5tYWdlbnRhfV0gdG8gc2Vzc2lvbiAtLS0gbG9va2luZyBmb3IgZXhpc3RpbmcgbWVtYmVyczpgXHJcbiAgICApO1xyXG5cclxuICAgIGZzLnJlYWRkaXJTeW5jKGd1aWxkRGlyKS5mb3JFYWNoKGRpciA9PiB7XHJcbiAgICAgIGxldCB1c2VybmFtZSA9IGRpcjtcclxuXHJcbiAgICAgIC8vaWYgdGhlIGNsaWVudCBkb2VzIG5vdCBoYXZlIHRoZSB1c2VyIHJlZ2lzdGVyZWRcclxuICAgICAgaWYgKCFjbGllbnQuaGFzVXNlcihndWlsZCwgdXNlcm5hbWUpKSB7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSByc3JjLmdldFVzZXJDb250ZW50c0Zyb21OYW1lV2l0aEd1aWxkKFxyXG4gICAgICAgICAgZ3VpbGQsXHJcbiAgICAgICAgICBudWxsIGFzIHVua25vd24gYXMgTWVzc2FnZSxcclxuICAgICAgICAgIHVzZXJuYW1lXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoY29udGVudCA9PT0gbnVsbCB8fCB0eXBlb2YgY29udGVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG5cclxuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShcIiAgXCIpO1xyXG4gICAgICAgIGNsaWVudC5yZWdpc3RlclVzZXIoY29udGVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICBgRm91bmQgYWxsIGV4aXN0aW5nIG1lbWJlcnMgb2YgWyR7Z3VpbGROYW1lLm1hZ2VudGF9XSAoY3VycmVudGx5ICR7XHJcbiAgICAgICAgT2JqZWN0LmtleXMoY2xpZW50LmdldEd1aWxkKGd1aWxkTmFtZSkpLmxlbmd0aC50b1N0cmluZygpLmdyZWVuXHJcbiAgICAgIH0pYFxyXG4gICAgKTtcclxuICB9KTtcclxuXHJcbiAgbGV0IHJlYWR5TWVzc2FnZSA9IGBSZWFkeSB0byBzZXJ2ZSBpbiAke2NsaWVudC5jaGFubmVscy5zaXplfSBjaGFubmVsKHMpIG9uICR7Y2xpZW50Lmd1aWxkcy5zaXplfSBndWlsZChzKSwgZm9yIGEgdG90YWwgb2YgJHtjbGllbnQudXNlcnMuc2l6ZX0gdXNlcnNgXHJcbiAgICAuaW52ZXJzZTtcclxuICBsZXQgZm9vdGVyID0gXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCJcclxuICAgIC5yZWQ7XHJcblxyXG4gIGNvbnNvbGUubG9nKGAuLi5cXG4ke3JlYWR5TWVzc2FnZX1cXG4ke2Zvb3Rlcn1gKTtcclxufTtcclxuIl19