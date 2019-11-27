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
        console.log(`${("[" + commandName + "]").padEnd(30, ".")} ${command.props.description}`);
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
        client.guild_configs[guildName] = null;
        let guildConfig = path.resolve(guildDir, client.global_config.files.guild_config);
        if (fs.existsSync(guildConfig))
            client.guild_configs[guildName] = require(guildConfig);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXZlbnRzL3JlYWR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWdCO0FBR2hCLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFFN0Isd0RBQTBDO0FBQzFDLG9EQUF3QztBQUN4Qyw0Q0FBcUM7QUFFckMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQVcsRUFBRSxFQUFFO0lBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFdEIscUJBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFbEIsSUFBSSxZQUFZLEdBQWEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLGFBQWEsRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFM0osS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDNUMsSUFBSSxXQUFXLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRS9DLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTtZQUNuQyxJQUFJLE9B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WSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxTQUFTLENBQUMsT0FBTyxnQkFBZ0IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDckosQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLFlBQVksR0FBRyxxQkFBcUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGtCQUFrQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksNkJBQTZCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDO0lBQy9KLElBQUksTUFBTSxHQUFHLHVGQUF1RixDQUFDLEdBQUcsQ0FBQztJQUV6RyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsWUFBWSxLQUFLLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDakQsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdjb2xvcnMnO1xyXG5cclxuaW1wb3J0IHsgR3VpbGQsIE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuaW1wb3J0IGV4aXQgZnJvbSAnLi4vY2xhc3Nlcy9FeGl0SGFuZGxlcic7XHJcbmltcG9ydCByc3JjIGZyb20gJy4uL2NsYXNzZXMvUmVzb3VyY2VzJztcclxuaW1wb3J0IGJvb3QgZnJvbSAnLi4vcmVzb3VyY2VzL2Jvb3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoY2xpZW50OiBhbnkpID0+IHtcclxuICBjbGllbnQudXNlci5zZXRBY3Rpdml0eShjbGllbnQuZ2xvYmFsX2NvbmZpZy5zdGF0dXMpO1xyXG5cclxuICBjb25zb2xlLmxvZyhib290LnJlZCk7XHJcblxyXG4gIGV4aXQuaW5pdChjbGllbnQpO1xyXG5cclxuICBsZXQgY29tbWFuZEFycmF5OiBzdHJpbmdbXSA9IFsuLi5jbGllbnQuY29tbWFuZHMua2V5cygpXS5zb3J0KCk7XHJcbiAgY29uc29sZS5sb2coYExvYWRlZCAke2NvbW1hbmRBcnJheS5sZW5ndGgudG9TdHJpbmcoKS5tYWdlbnRhfSBjb21tYW5kKHMpYCwgXCJbQGV2ZXJ5b25lXVwiLmdyZWVuLCBcIltAbW9kZXJhdG9yXVwiLnllbGxvdywgXCJbQG93bmVyXVwiLnJlZCwgXCJbQGJvdG93bmVyXVwiLmN5YW4pO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbW1hbmRBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgbGV0IGNvbW1hbmROYW1lID0gY29tbWFuZEFycmF5W2ldO1xyXG4gICAgbGV0IGNvbW1hbmQgPSBjbGllbnQuY29tbWFuZHMuZ2V0KGNvbW1hbmROYW1lKTtcclxuXHJcbiAgICBpZiAoY29tbWFuZC5wcm9wcy5yZXF1aXJlc0VsZXZhdGlvbikge1xyXG4gICAgICBpZiAoY29tbWFuZC5wcm9wcy5yZXF1aXJlc0VsZXZhdGlvbiA9PT0gY2xpZW50Lmdsb2JhbF9jb25maWcuZWxldmF0aW9uX25hbWVzLm1vZGVyYXRvcikge1xyXG4gICAgICAgIGNvbW1hbmROYW1lID0gY29tbWFuZE5hbWUueWVsbG93O1xyXG4gICAgICB9IGVsc2UgaWYgKGNvbW1hbmQucHJvcHMucmVxdWlyZXNFbGV2YXRpb24gPT09IGNsaWVudC5nbG9iYWxfY29uZmlnLmVsZXZhdGlvbl9uYW1lcy5vd25lcikge1xyXG4gICAgICAgIGNvbW1hbmROYW1lID0gY29tbWFuZE5hbWUucmVkO1xyXG4gICAgICB9IGVsc2UgaWYgKGNvbW1hbmQucHJvcHMucmVxdWlyZXNFbGV2YXRpb24gPT09IGNsaWVudC5nbG9iYWxfY29uZmlnLmVsZXZhdGlvbl9uYW1lcy5ib3Rvd25lcikge1xyXG4gICAgICAgIGNvbW1hbmROYW1lID0gY29tbWFuZE5hbWUuY3lhbjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29tbWFuZE5hbWUgPSBjb21tYW5kTmFtZS5ncmVlbjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhgJHsoXCJbXCIgKyBjb21tYW5kTmFtZSArIFwiXVwiKS5wYWRFbmQoMzAsIFwiLlwiKX0gJHtjb21tYW5kLnByb3BzLmRlc2NyaXB0aW9ufWApO1xyXG4gIH1cclxuXHJcbiAgY29uc29sZS5sb2coXCIuLi5cIik7XHJcblxyXG4gIGNsaWVudC5ndWlsZHMuZm9yRWFjaCgoZ3VpbGQ6IEd1aWxkKSA9PiB7XHJcbiAgICBsZXQgZ3VpbGREaXIgPSByc3JjLmdldEd1aWxkRGlyZWN0b3J5RnJvbUd1aWxkKGd1aWxkKTtcclxuXHJcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZ3VpbGREaXIpKSB7XHJcbiAgICAgIGZzLm1rZGlyU3luYyhndWlsZERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XHJcbiAgICAgIGZzLm1rZGlyU3luYyhwYXRoLmpvaW4oZ3VpbGREaXIsIGNsaWVudC5nbG9iYWxfY29uZmlnLmZpbGVzLnJlbW92ZWQpLCB7XHJcbiAgICAgICAgcmVjdXJzaXZlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbGV0IGd1aWxkTmFtZSA9IHJzcmMuZ2V0R3VpbGROYW1lRnJvbUd1aWxkKGd1aWxkKTtcclxuXHJcbiAgICAvL3NldCB0aGUgZ3VpbGQgZGF0YSB0byB0byB0aGUgZ3VpbGQgbmFtZVxyXG4gICAgY2xpZW50LnVzZXJzSW5TZXNzaW9uW2d1aWxkTmFtZV0gPSB7fTtcclxuICAgIGNsaWVudC5ndWlsZF9jb25maWdzW2d1aWxkTmFtZV0gPSBudWxsO1xyXG5cclxuICAgIGxldCBndWlsZENvbmZpZyA9IHBhdGgucmVzb2x2ZShndWlsZERpciwgY2xpZW50Lmdsb2JhbF9jb25maWcuZmlsZXMuZ3VpbGRfY29uZmlnKTtcclxuICAgIGlmKGZzLmV4aXN0c1N5bmMoZ3VpbGRDb25maWcpKVxyXG4gICAgICBjbGllbnQuZ3VpbGRfY29uZmlnc1tndWlsZE5hbWVdID0gcmVxdWlyZShndWlsZENvbmZpZyk7XHJcblxyXG4gICAgY29uc29sZS5sb2coYCpSZWdpc3RlcmVkIFske2d1aWxkTmFtZS5tYWdlbnRhfV0gdG8gc2Vzc2lvbiAtLS0gbG9va2luZyBmb3IgZXhpc3RpbmcgbWVtYmVyczpgKTtcclxuXHJcbiAgICBmcy5yZWFkZGlyU3luYyhndWlsZERpcikuZm9yRWFjaChkaXIgPT4ge1xyXG4gICAgICBsZXQgdXNlcm5hbWUgPSBkaXI7XHJcblxyXG4gICAgICAvL2lmIHRoZSBjbGllbnQgZG9lcyBub3QgaGF2ZSB0aGUgdXNlciByZWdpc3RlcmVkXHJcbiAgICAgIGlmICghY2xpZW50Lmhhc1VzZXIoZ3VpbGQsIHVzZXJuYW1lKSkge1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gcnNyYy5nZXRVc2VyQ29udGVudHNGcm9tTmFtZVdpdGhHdWlsZChjbGllbnQsIGd1aWxkLCAobnVsbCBhcyB1bmtub3duKSBhcyBNZXNzYWdlLCB1c2VybmFtZSk7XHJcbiAgICAgICAgaWYgKGNvbnRlbnQgPT09IG51bGwgfHwgdHlwZW9mIGNvbnRlbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuXHJcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoXCIgIFwiKTtcclxuICAgICAgICBjbGllbnQucmVnaXN0ZXJVc2VyKGNvbnRlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhgRm91bmQgYWxsIGV4aXN0aW5nIG1lbWJlcnMgb2YgWyR7Z3VpbGROYW1lLm1hZ2VudGF9XSAoY3VycmVudGx5ICR7T2JqZWN0LmtleXMoY2xpZW50LmdldEd1aWxkKGd1aWxkTmFtZSkpLmxlbmd0aC50b1N0cmluZygpLmdyZWVufSlgKTtcclxuICB9KTtcclxuXHJcbiAgbGV0IHJlYWR5TWVzc2FnZSA9IGBSZWFkeSB0byBzZXJ2ZSBpbiAke2NsaWVudC5jaGFubmVscy5zaXplfSBjaGFubmVsKHMpIG9uICR7Y2xpZW50Lmd1aWxkcy5zaXplfSBndWlsZChzKSwgZm9yIGEgdG90YWwgb2YgJHtjbGllbnQudXNlcnMuc2l6ZX0gdXNlcnNgLmludmVyc2U7XHJcbiAgbGV0IGZvb3RlciA9IFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiLnJlZDtcclxuXHJcbiAgY29uc29sZS5sb2coYC4uLlxcbiR7cmVhZHlNZXNzYWdlfVxcbiR7Zm9vdGVyfWApO1xyXG59O1xyXG4iXX0=