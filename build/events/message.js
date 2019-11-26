"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const fs = require("fs");
const path = require("path");
const Resources_1 = require("../classes/Resources");
const blacklist_1 = require("../resources/misc/blacklist");
const ranks_1 = require("../resources/ranks/ranks");
module.exports = (client, message) => {
    var _a;
    if (message.author.bot)
        return;
    if (!registerMessage(client, message))
        return console.error(`!! Could not register message sent by [${Resources_1.default.getUsernameFromMessage(message)}]`.red);
    if (blacklist_1.default.words.some(substring => message.content.includes(substring))) {
        message.delete().catch(err => {
            console.log(err);
        });
        message.reply("that is not allowed here.").catch(err => {
            console.log(err);
        });
    }
    awardExperience(client, message);
    if (message.content.indexOf(client.config.prefix) !== 0)
        return;
    const args = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);
    let command;
    if (args)
        command = args.shift().toLowerCase();
    if (!command)
        return;
    const cmd = client.commands.get(command);
    if (!cmd)
        return;
    if (cmd.props.requiresElevation && cmd.props.requiresElevation !== "")
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.roles.has(client.config.roles[cmd.props.requiresElevation])))
            return;
    cmd.run(client, message, args);
};
function registerMessage(client, message) {
    let username = Resources_1.default.getUsernameFromMessage(message);
    if (!message.guild)
        return;
    let guildName = Resources_1.default.getGuildNameFromGuild(message.guild);
    let userDir = Resources_1.default.getUserDirectoryFromGuild(message.guild, username);
    let content;
    if (!fs.existsSync(userDir))
        Resources_1.default.createUserDirectory(client, message.guild, message.member);
    if (!client.hasUser(message.guild, username)) {
        content = Resources_1.default.getUserContentsFromName(message, username);
        client.registerUser(message.member.user, content);
    }
    else {
        content = client.getUserContent(message.guild, username);
    }
    if (content === null || typeof content === "undefined") {
        console.error(`!! Could not retrieve contents for [${username}]`.red);
        return false;
    }
    if (content.misc.first_message === null ||
        typeof content.misc.first_message === "undefined") {
        content.misc.first_message = message.content;
        client.updateUser(content);
    }
    let logMessage = `[${getTimestamp(message)}] (#${message.channel.name}): ${message.content}\n`;
    client.masterLog.push(`/${guildName}/>  ${username} ${logMessage}`);
    updateMasterLog(client);
    content.userLog.push(logMessage);
    updateUserLog(client, message.guild, content);
    return true;
}
function getTimestamp(message) {
    let timestamp = message.createdAt;
    let date = (timestamp.getMonth() + 1 + "/" + timestamp.getDate()).replace(/.*(\d{2}\/\d{2}).*/, "$1");
    let time = timestamp.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    return date + "  " + time;
}
function updateMasterLog(client) {
    let masterLog = path.join(__dirname, "..", "logs", client.config.files.log_all);
    if (!fs.existsSync(masterLog))
        fs.writeFileSync(masterLog, "");
    if (client.masterLog.length >= client.config.preferences.log_threshold_master) {
        for (var i = 0; i < client.masterLog.length; i++)
            fs.appendFileSync(masterLog, client.masterLog[i]);
        client.masterLog = [];
    }
}
function updateUserLog(client, guild, content) {
    let logsDir = path.join(Resources_1.default.getUserDirectoryFromGuild(guild, content.hidden.username), "logs");
    let userLog = path.join(logsDir, client.config.files.log_all);
    if (content.userLog.length >= client.config.preferences.log_threshold_user) {
        for (var i = 0; i < content.userLog.length; i++)
            fs.appendFileSync(userLog, content.userLog[i]);
        content.userLog = [];
    }
    client.updateUser(content);
    console.log(`[${content.hidden.guildname.magenta}] =>`, `[${content.hidden.username.magenta}] =>`, content);
}
function awardExperience(client, message) {
    let username = Resources_1.default.getUsernameFromMessage(message);
    let content = client.getUserContent(message.guild, username);
    if (!content) {
        return console.error(`!! Could not retrieve contents from [${username}]`);
    }
    content.rank.xp += 1;
    if (content.rank.xp >= content.rank.levelup) {
        content.rank.level += 1;
        var rank = ranks_1.default.levels[content.rank.level];
        if (rank) {
            var lastRank = content.rank.name;
            content.rank.name = rank;
            let oldRole = message.guild.roles.find(role => role.name.toLowerCase() === lastRank.toLowerCase());
            let newRole = message.guild.roles.find(role => role.name.toLowerCase() === rank.toLowerCase());
            if (oldRole)
                message.member.removeRole(oldRole).catch(err => {
                    console.log(err);
                });
            message.member.addRole(newRole).catch(err => {
                console.log(err);
            });
        }
        content.rank.levelup = Resources_1.default.getXPToLevelUp(content.rank.xp, content.rank.level);
        levelUp(client, message, content);
    }
    client.updateUser(content);
    if (content.rank.xp % client.config.preferences.xp_threshold === 0) {
        let jsonFile = path.join(Resources_1.default.getUserDirectoryFromGuild(message.guild, username), username + ".json");
        let newJson = JSON.stringify(content, null, "\t");
        fs.writeFileSync(jsonFile, newJson);
    }
}
function levelUp(client, message, content) {
    var stats = client.commands.get("stats");
    let embed = stats.getEmbed(client, message.member, content);
    message.channel.send(`Congratulations ${message.author}!  You just leveled up!  Keep chatting to earn more XP and unlock roles and special perks!`);
    message.channel.send(embed);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldmVudHMvbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtCQUFnQjtBQUdoQix5QkFBeUI7QUFDekIsNkJBQTZCO0FBRTdCLG9EQUF3QztBQUN4QywyREFBb0Q7QUFDcEQsb0RBQTZDO0FBRTdDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxFQUFFOztJQUVqRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRztRQUFFLE9BQU87SUFHL0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO1FBQ25DLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FDbEIsMENBQTBDLG1CQUFJLENBQUMsc0JBQXNCLENBQ25FLE9BQU8sQ0FDUixHQUFHLENBQUMsR0FBRyxDQUNULENBQUM7SUFHSixJQUFJLG1CQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUU7UUFDMUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNyRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxlQUFlLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBR2pDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0s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R0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDckM7QUFDSCxDQUFDO0FBRUQsU0FBUyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPO0lBQ3ZDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFNUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ2xCLG1CQUFtQixPQUFPLENBQUMsTUFBTSw0RkFBNEYsQ0FDOUgsQ0FBQztJQUNGLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2NvbG9ycyc7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlLCBUZXh0Q2hhbm5lbCB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5pbXBvcnQgcnNyYyBmcm9tICcuLi9jbGFzc2VzL1Jlc291cmNlcyc7XHJcbmltcG9ydCBibGFja2xpc3QgZnJvbSAnLi4vcmVzb3VyY2VzL21pc2MvYmxhY2tsaXN0JztcclxuaW1wb3J0IHJhbmtzIGZyb20gJy4uL3Jlc291cmNlcy9yYW5rcy9yYW5rcyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSkgPT4ge1xyXG4gIC8vaWdub3JlIGFsbCBib3RzXHJcbiAgaWYgKG1lc3NhZ2UuYXV0aG9yLmJvdCkgcmV0dXJuO1xyXG5cclxuICAvL3JlZ2lzdGVyIHRoZSB1c2VyXHJcbiAgaWYgKCFyZWdpc3Rlck1lc3NhZ2UoY2xpZW50LCBtZXNzYWdlKSlcclxuICAgIHJldHVybiBjb25zb2xlLmVycm9yKFxyXG4gICAgICBgISEgQ291bGQgbm90IHJlZ2lzdGVyIG1lc3NhZ2Ugc2VudCBieSBbJHtyc3JjLmdldFVzZXJuYW1lRnJvbU1lc3NhZ2UoXHJcbiAgICAgICAgbWVzc2FnZVxyXG4gICAgICApfV1gLnJlZFxyXG4gICAgKTtcclxuXHJcbiAgLy9jaGVjayBhZ2FpbnN0IGJsYWNrbGlzdFxyXG4gIGlmIChibGFja2xpc3Qud29yZHMuc29tZShzdWJzdHJpbmcgPT4gbWVzc2FnZS5jb250ZW50LmluY2x1ZGVzKHN1YnN0cmluZykpKSB7XHJcbiAgICBtZXNzYWdlLmRlbGV0ZSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxuICAgIG1lc3NhZ2UucmVwbHkoXCJ0aGF0IGlzIG5vdCBhbGxvd2VkIGhlcmUuXCIpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGF3YXJkRXhwZXJpZW5jZShjbGllbnQsIG1lc3NhZ2UpO1xyXG5cclxuICAvL2lnbm9yZSBtZXNzYWdlcyBub3Qgc3RhcnRpbmcgd2l0aCB0aGUgcHJlZml4XHJcbiAgaWYgKG1lc3NhZ2UuY29udGVudC5pbmRleE9mKGNsaWVudC5jb25maWcucHJlZml4KSAhPT0gMCkgcmV0dXJuO1xyXG5cclxuICAvL3N0YW5kYXJkIGFyZ3VtZW50L2NvbW1hbmQgbmFtZSBkZWZpbml0aW9uXHJcbiAgY29uc3QgYXJnczogYW55ID0gbWVzc2FnZS5jb250ZW50XHJcbiAgICAuc2xpY2UoY2xpZW50LmNvbmZpZy5wcmVmaXgubGVuZ3RoKVxyXG4gICAgLnRyaW0oKVxyXG4gICAgLnNwbGl0KC8gKy9nKTtcclxuXHJcbiAgbGV0IGNvbW1hbmQ6IGFueTtcclxuICBpZiAoYXJncykgY29tbWFuZCA9IGFyZ3Muc2hpZnQoKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGlmICghY29tbWFuZCkgcmV0dXJuO1xyXG5cclxuICAvL2dyYWIgdGhlIGNvbW1hbmQgZGF0YSBmcm9tIHRoZSBjbGllbnQuY29tbWFuZHMgRW5tYXBcclxuICBjb25zdCBjbWQgPSBjbGllbnQuY29tbWFuZHMuZ2V0KGNvbW1hbmQpO1xyXG5cclxuICAvL2lmIHRoZSBjb21tYW5kIGRvZXNuJ3QgZXhpc3RcclxuICBpZiAoIWNtZCkgcmV0dXJuO1xyXG5cclxuICBpZiAoY21kLnByb3BzLnJlcXVpcmVzRWxldmF0aW9uICYmIGNtZC5wcm9wcy5yZXF1aXJlc0VsZXZhdGlvbiAhPT0gXCJcIilcclxuICAgIGlmIChcclxuICAgICAgIW1lc3NhZ2UubWVtYmVyPy5yb2xlcy5oYXMoXHJcbiAgICAgICAgY2xpZW50LmNvbmZpZy5yb2xlc1tjbWQucHJvcHMucmVxdWlyZXNFbGV2YXRpb25dXHJcbiAgICAgIClcclxuICAgIClcclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAvL3J1biB0aGUgY29tbWFuZFxyXG4gIGNtZC5ydW4oY2xpZW50LCBtZXNzYWdlLCBhcmdzKTtcclxufTtcclxuXHJcbi8vcmVnaXN0ZXJzIHRoZSBtZXNzYWdlXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyTWVzc2FnZShjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSkge1xyXG4gIGxldCB1c2VybmFtZSA9IHJzcmMuZ2V0VXNlcm5hbWVGcm9tTWVzc2FnZShtZXNzYWdlKTtcclxuXHJcbiAgaWYoIW1lc3NhZ2UuZ3VpbGQpIHJldHVybjtcclxuICBcclxuICBsZXQgZ3VpbGROYW1lID0gcnNyYy5nZXRHdWlsZE5hbWVGcm9tR3VpbGQobWVzc2FnZS5ndWlsZCk7XHJcbiAgbGV0IHVzZXJEaXIgPSByc3JjLmdldFVzZXJEaXJlY3RvcnlGcm9tR3VpbGQobWVzc2FnZS5ndWlsZCwgdXNlcm5hbWUpO1xyXG5cclxuICBsZXQgY29udGVudDogYW55O1xyXG5cclxuICAvL2lmIHRoZSB1c2VyIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkXHJcbiAgaWYgKCFmcy5leGlzdHNTeW5jKHVzZXJEaXIpKVxyXG4gICAgcnNyYy5jcmVhdGVVc2VyRGlyZWN0b3J5KGNsaWVudCwgbWVzc2FnZS5ndWlsZCwgbWVzc2FnZS5tZW1iZXIhKTtcclxuXHJcbiAgLy91c2VyIE5PVCBzdG9yZWQgaW4gbG9jYWwgY2xpZW50IHNlc3Npb25cclxuICBpZiAoIWNsaWVudC5oYXNVc2VyKG1lc3NhZ2UuZ3VpbGQsIHVzZXJuYW1lKSkge1xyXG4gICAgY29udGVudCA9IHJzcmMuZ2V0VXNlckNvbnRlbnRzRnJvbU5hbWUobWVzc2FnZSwgdXNlcm5hbWUpO1xyXG4gICAgY2xpZW50LnJlZ2lzdGVyVXNlcihtZXNzYWdlLm1lbWJlciEudXNlciwgY29udGVudCk7XHJcbiAgICAvL3VzZXIgc3RvcmVkIGluIGxvY2FsIGNsaWVudCBzZXNzaW9uXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnRlbnQgPSBjbGllbnQuZ2V0VXNlckNvbnRlbnQobWVzc2FnZS5ndWlsZCwgdXNlcm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGNvbnRlbnQgPT09IG51bGwgfHwgdHlwZW9mIGNvbnRlbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoYCEhIENvdWxkIG5vdCByZXRyaWV2ZSBjb250ZW50cyBmb3IgWyR7dXNlcm5hbWV9XWAucmVkKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmIChcclxuICAgIGNvbnRlbnQubWlzYy5maXJzdF9tZXNzYWdlID09PSBudWxsIHx8XHJcbiAgICB0eXBlb2YgY29udGVudC5taXNjLmZpcnN0X21lc3NhZ2UgPT09IFwidW5kZWZpbmVkXCJcclxuICApIHtcclxuICAgIGNvbnRlbnQubWlzYy5maXJzdF9tZXNzYWdlID0gbWVzc2FnZS5jb250ZW50O1xyXG4gICAgY2xpZW50LnVwZGF0ZVVzZXIoY29udGVudCk7XHJcbiAgfVxyXG5cclxuICBsZXQgbG9nTWVzc2FnZSA9IGBbJHtnZXRUaW1lc3RhbXAobWVzc2FnZSl9XSAoIyR7XHJcbiAgICAobWVzc2FnZS5jaGFubmVsIGFzIFRleHRDaGFubmVsKS5uYW1lXHJcbiAgfSk6ICR7bWVzc2FnZS5jb250ZW50fVxcbmA7XHJcblxyXG4gIC8vcHVzaCB0aGUgbWVzc2FnZSB0byB0aGUgbWFzdGVyIGxvZyBicmFuY2hcclxuICBjbGllbnQubWFzdGVyTG9nLnB1c2goYC8ke2d1aWxkTmFtZX0vPiAgJHt1c2VybmFtZX0gJHtsb2dNZXNzYWdlfWApO1xyXG4gIC8vaWYgdGhlIGxvZyBsZW5ndGggZXhjZWVkcyB0aGUgdGhyZXNob2xkLCB1cGRhdGUgdGhlIG1hc3RlciBsb2dcclxuICB1cGRhdGVNYXN0ZXJMb2coY2xpZW50KTtcclxuXHJcbiAgLy9wdXNoIHRoZSB1c2VyJ3MgbWVzc2FnZSBkaXJlY3RseSB0byB0aGUgdXNlcidzIGxvZ1xyXG4gIGNvbnRlbnQudXNlckxvZy5wdXNoKGxvZ01lc3NhZ2UpO1xyXG4gIC8vaWYgdGhlIGxvZyBsZW5ndGggZXhjZWVkcyB0aGUgdGhyZXNob2xkLCB1cGRhdGUgdGhlIHVzZXIgbG9nXHJcbiAgdXBkYXRlVXNlckxvZyhjbGllbnQsIG1lc3NhZ2UuZ3VpbGQsIGNvbnRlbnQpO1xyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VGltZXN0YW1wKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcclxuICBsZXQgdGltZXN0YW1wID0gbWVzc2FnZS5jcmVhdGVkQXQ7XHJcbiAgbGV0IGRhdGUgPSAodGltZXN0YW1wLmdldE1vbnRoKCkgKyAxICsgXCIvXCIgKyB0aW1lc3RhbXAuZ2V0RGF0ZSgpKS5yZXBsYWNlKFxyXG4gICAgLy4qKFxcZHsyfVxcL1xcZHsyfSkuKi8sXHJcbiAgICBcIiQxXCJcclxuICApO1xyXG4gIGxldCB0aW1lID0gdGltZXN0YW1wLnRvVGltZVN0cmluZygpLnJlcGxhY2UoLy4qKFxcZHsyfTpcXGR7Mn06XFxkezJ9KS4qLywgXCIkMVwiKTtcclxuXHJcbiAgcmV0dXJuIGRhdGUgKyBcIiAgXCIgKyB0aW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVNYXN0ZXJMb2coY2xpZW50KSB7XHJcbiAgbGV0IG1hc3RlckxvZyA9IHBhdGguam9pbihcclxuICAgIF9fZGlybmFtZSxcclxuICAgIFwiLi5cIixcclxuICAgIFwibG9nc1wiLFxyXG4gICAgY2xpZW50LmNvbmZpZy5maWxlcy5sb2dfYWxsXHJcbiAgKTtcclxuXHJcbiAgaWYgKCFmcy5leGlzdHNTeW5jKG1hc3RlckxvZykpIGZzLndyaXRlRmlsZVN5bmMobWFzdGVyTG9nLCBcIlwiKTtcclxuXHJcbiAgLy9pZiB0aGUgbG9nIGxlbmd0aCBleGNlZWRzIHRoZSB0aHJlc2hvbGQsIHVwZGF0ZSB0aGUgbWFzdGVyIGxvZ1xyXG4gIGlmIChcclxuICAgIGNsaWVudC5tYXN0ZXJMb2cubGVuZ3RoID49IGNsaWVudC5jb25maWcucHJlZmVyZW5jZXMubG9nX3RocmVzaG9sZF9tYXN0ZXJcclxuICApIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xpZW50Lm1hc3RlckxvZy5sZW5ndGg7IGkrKylcclxuICAgICAgZnMuYXBwZW5kRmlsZVN5bmMobWFzdGVyTG9nLCBjbGllbnQubWFzdGVyTG9nW2ldKTtcclxuXHJcbiAgICBjbGllbnQubWFzdGVyTG9nID0gW107XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVVc2VyTG9nKGNsaWVudCwgZ3VpbGQsIGNvbnRlbnQpIHtcclxuICBsZXQgbG9nc0RpciA9IHBhdGguam9pbihcclxuICAgIHJzcmMuZ2V0VXNlckRpcmVjdG9yeUZyb21HdWlsZChndWlsZCwgY29udGVudC5oaWRkZW4udXNlcm5hbWUpLFxyXG4gICAgXCJsb2dzXCJcclxuICApO1xyXG4gIGxldCB1c2VyTG9nID0gcGF0aC5qb2luKGxvZ3NEaXIsIGNsaWVudC5jb25maWcuZmlsZXMubG9nX2FsbCk7XHJcblxyXG4gIC8vaWYgdGhlIGxvZyBsZW5ndGggZXhjZWVkcyB0aGUgdGhyZXNob2xkLCB1cGRhdGUgdGhlIG1hc3RlciBsb2dcclxuICBpZiAoY29udGVudC51c2VyTG9nLmxlbmd0aCA+PSBjbGllbnQuY29uZmlnLnByZWZlcmVuY2VzLmxvZ190aHJlc2hvbGRfdXNlcikge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250ZW50LnVzZXJMb2cubGVuZ3RoOyBpKyspXHJcbiAgICAgIGZzLmFwcGVuZEZpbGVTeW5jKHVzZXJMb2csIGNvbnRlbnQudXNlckxvZ1tpXSk7XHJcblxyXG4gICAgY29udGVudC51c2VyTG9nID0gW107XHJcbiAgfVxyXG5cclxuICAvL2hhdmUgdG8gdXBkYXRlIHRoZSBFbm1hcFxyXG4gIGNsaWVudC51cGRhdGVVc2VyKGNvbnRlbnQpO1xyXG5cclxuICAvL2xvZyBpdCB0byB0aGUgY29uc29sZVxyXG4gIGNvbnNvbGUubG9nKFxyXG4gICAgYFske2NvbnRlbnQuaGlkZGVuLmd1aWxkbmFtZS5tYWdlbnRhfV0gPT5gLFxyXG4gICAgYFske2NvbnRlbnQuaGlkZGVuLnVzZXJuYW1lLm1hZ2VudGF9XSA9PmAsXHJcbiAgICBjb250ZW50XHJcbiAgKTtcclxufVxyXG5cclxuLy9hd2FyZHMgdGhlIHVzZXIgZXhwZXJpZW5jZSBmb3IgcG9zdGluZyBhIG1lc3NhZ2VcclxuZnVuY3Rpb24gYXdhcmRFeHBlcmllbmNlKGNsaWVudCwgbWVzc2FnZSkge1xyXG4gIGxldCB1c2VybmFtZSA9IHJzcmMuZ2V0VXNlcm5hbWVGcm9tTWVzc2FnZShtZXNzYWdlKTtcclxuXHJcbiAgLy9nZXQgdGhlIGNvbnRlbnQgZnJvbSB0aGUgc2Vzc2lvbiBpbnN0ZWFkIG9mIGZyb20gdGhlIGZpbGVcclxuICBsZXQgY29udGVudCA9IGNsaWVudC5nZXRVc2VyQ29udGVudChtZXNzYWdlLmd1aWxkLCB1c2VybmFtZSk7XHJcblxyXG4gIGlmICghY29udGVudCkge1xyXG4gICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoYCEhIENvdWxkIG5vdCByZXRyaWV2ZSBjb250ZW50cyBmcm9tIFske3VzZXJuYW1lfV1gKTtcclxuICB9XHJcblxyXG4gIGNvbnRlbnQucmFuay54cCArPSAxO1xyXG5cclxuICBpZiAoY29udGVudC5yYW5rLnhwID49IGNvbnRlbnQucmFuay5sZXZlbHVwKSB7XHJcbiAgICBjb250ZW50LnJhbmsubGV2ZWwgKz0gMTtcclxuXHJcbiAgICB2YXIgcmFuayA9IHJhbmtzLmxldmVsc1tjb250ZW50LnJhbmsubGV2ZWxdO1xyXG4gICAgaWYgKHJhbmspIHtcclxuICAgICAgdmFyIGxhc3RSYW5rID0gY29udGVudC5yYW5rLm5hbWU7XHJcblxyXG4gICAgICBjb250ZW50LnJhbmsubmFtZSA9IHJhbms7XHJcbiAgICAgIGxldCBvbGRSb2xlID0gbWVzc2FnZS5ndWlsZC5yb2xlcy5maW5kKFxyXG4gICAgICAgIHJvbGUgPT4gcm9sZS5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IGxhc3RSYW5rLnRvTG93ZXJDYXNlKClcclxuICAgICAgKTtcclxuICAgICAgbGV0IG5ld1JvbGUgPSBtZXNzYWdlLmd1aWxkLnJvbGVzLmZpbmQoXHJcbiAgICAgICAgcm9sZSA9PiByb2xlLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gcmFuay50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAob2xkUm9sZSlcclxuICAgICAgICBtZXNzYWdlLm1lbWJlci5yZW1vdmVSb2xlKG9sZFJvbGUpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgbWVzc2FnZS5tZW1iZXIuYWRkUm9sZShuZXdSb2xlKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRlbnQucmFuay5sZXZlbHVwID0gcnNyYy5nZXRYUFRvTGV2ZWxVcChcclxuICAgICAgY29udGVudC5yYW5rLnhwLFxyXG4gICAgICBjb250ZW50LnJhbmsubGV2ZWxcclxuICAgICk7XHJcbiAgICBsZXZlbFVwKGNsaWVudCwgbWVzc2FnZSwgY29udGVudCk7XHJcbiAgfVxyXG5cclxuICBjbGllbnQudXBkYXRlVXNlcihjb250ZW50KTtcclxuXHJcbiAgLy9vbmx5IHdyaXRlIFhQIGNoYW5nZXMgdG8gdGhlIGZpbGUgZXZlcnkgMTAgbWVzc2FnZXNcclxuICBpZiAoY29udGVudC5yYW5rLnhwICUgY2xpZW50LmNvbmZpZy5wcmVmZXJlbmNlcy54cF90aHJlc2hvbGQgPT09IDApIHtcclxuICAgIGxldCBqc29uRmlsZSA9IHBhdGguam9pbihcclxuICAgICAgcnNyYy5nZXRVc2VyRGlyZWN0b3J5RnJvbUd1aWxkKG1lc3NhZ2UuZ3VpbGQsIHVzZXJuYW1lKSxcclxuICAgICAgdXNlcm5hbWUgKyBcIi5qc29uXCJcclxuICAgICk7XHJcbiAgICBsZXQgbmV3SnNvbiA9IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQsIG51bGwsIFwiXFx0XCIpO1xyXG4gICAgZnMud3JpdGVGaWxlU3luYyhqc29uRmlsZSwgbmV3SnNvbik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsZXZlbFVwKGNsaWVudCwgbWVzc2FnZSwgY29udGVudCkge1xyXG4gIHZhciBzdGF0cyA9IGNsaWVudC5jb21tYW5kcy5nZXQoXCJzdGF0c1wiKTtcclxuICBsZXQgZW1iZWQgPSBzdGF0cy5nZXRFbWJlZChjbGllbnQsIG1lc3NhZ2UubWVtYmVyLCBjb250ZW50KTtcclxuXHJcbiAgbWVzc2FnZS5jaGFubmVsLnNlbmQoXHJcbiAgICBgQ29uZ3JhdHVsYXRpb25zICR7bWVzc2FnZS5hdXRob3J9ISAgWW91IGp1c3QgbGV2ZWxlZCB1cCEgIEtlZXAgY2hhdHRpbmcgdG8gZWFybiBtb3JlIFhQIGFuZCB1bmxvY2sgcm9sZXMgYW5kIHNwZWNpYWwgcGVya3MhYFxyXG4gICk7XHJcbiAgbWVzc2FnZS5jaGFubmVsLnNlbmQoZW1iZWQpO1xyXG59XHJcbiJdfQ==