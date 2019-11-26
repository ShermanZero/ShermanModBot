"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Resources_1 = require("../classes/Resources");
const ranks_1 = require("../resources/ranks/ranks");
module.exports.props = {
    description: "replies to the member with their current server stats"
};
module.exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    let username = Resources_1.default.getUsernameFromMessage(message);
    let content = client.getUserContent(message.guild, username);
    let member = message.member;
    if (!message.mentions.members || message.mentions.members.size !== 0) {
        member = message.mentions.members.first();
        username = Resources_1.default.getUsernameFromMember(member);
        content = Resources_1.default.getUserContentsFromName(client, message, username);
    }
    if (!content) {
        message.delete().catch(err => {
            console.log(err);
        });
        try {
            return message.reply(`${message.mentions.members.first().displayName} does not yet have any stats :( they need to post a message in the server to be registered by me.`);
        }
        catch (err_1) {
            console.log(err_1);
        }
    }
    message.channel.send(getEmbed(client, member, content)).catch(err => {
        console.log(err);
    });
    message.delete().catch(err => {
        console.log(err);
    });
});
function getEmbed(client, member, content) {
    var _a;
    let name = "**" +
        content.hidden.username
            .substring(0, content.hidden.username.lastIndexOf("_"))
            .toUpperCase() +
        "**";
    let rankColor = (_a = member.guild.roles.find(role => role.name === content.rank.name)) === null || _a === void 0 ? void 0 : _a.color;
    const embed = new discord_js_1.MessageEmbed();
    embed.setTitle(name + " | " + calculatePosition(client, content));
    embed.setColor(rankColor);
    embed.setThumbnail(ranks_1.default.urls[content.rank.name]);
    let levelStats = "";
    if (content.rank.name !== null)
        levelStats += `**rank:**  *${content.rank.name}*\n`.toUpperCase();
    if (content.rank.level !== null)
        levelStats += `**level:**  *${content.rank.level}*\n`.toUpperCase();
    if (content.rank.xp !== null)
        levelStats += `**xp:**  *${getFormattedNumber(content.rank.xp)} / ${getFormattedNumber(content.rank.levelup)}*\n`.toUpperCase();
    if (levelStats !== "")
        embed.addField("**LEVEL STATS**", levelStats);
    let raceStats = "";
    if (content.race.wins !== null)
        raceStats += `**wins:**  *${content.race.wins}*\n`.toUpperCase();
    if (raceStats !== "")
        embed.addField("**MARBLE RACE STATS**", raceStats);
    let miscStats = "";
    if (content.misc.joined !== null)
        miscStats += `**joined:**  *${content.misc.joined}*\n`.toUpperCase();
    if (content.misc.first_message !== null)
        miscStats += `**first message:**  *${content.misc.first_message}*\n`.toUpperCase();
    if (content.misc.warnings !== null)
        miscStats += `**warnings:**  *${content.misc.warnings}*\n`.toUpperCase();
    if (miscStats !== "")
        embed.addField("**MISC. STATS**", miscStats);
    if (member.roles.has(client.config.roles.mod)) {
        embed.setFooter("BE RESPECTFUL TO ALL - ESPECIALLY MODERATORS", "https://i.ibb.co/MC5389q/crossed-swords-2694.png");
        embed.setDescription("`SERVER MOD`");
    }
    return embed;
}
function getFormattedNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function calculatePosition(client, content) {
    let guild = client.getGuild(content.hidden.guildname);
    let usersHigher = 0;
    let entries = Object.entries(guild);
    for (let [username, userContent] of entries)
        if (username != content.hidden.username &&
            userContent.rank.xp > content.rank.xp)
            usersHigher++;
    return "*RANK #" + (usersHigher + 1) + "*";
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvc3RhdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBaUY7QUFFakYsb0RBQXdDO0FBQ3hDLG9EQUE2QztBQUU3QyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixXQUFXLEVBQUUsdURBQXVEO0NBQ3JFLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWMsRUFBRSxFQUFFO0lBQzNFLElBQUksUUFBUSxHQUFHLG1CQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdELElBQUksTUFBTSxHQUFnQixPQUFPLENBQUMsTUFBcUIsQ0FBQztJQUV4RCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtRQUNwRSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFRLENBQUMsS0FBSyxFQUFpQixDQUFDO1FBQzFELFFBQVEsR0FBRyxtQkFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLE9BQU8sR0FBRyxtQkFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDbkU7SUFFRCxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FB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aUJBQWlCLENBQUMsTUFBVyxFQUFFLE9BQVk7SUFDbEQsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RELElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztJQUVwQixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsSUFBSSxPQUFPO1FBQ3pDLElBQ0UsUUFBUSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUTtZQUNsQyxXQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBRTlDLFdBQVcsRUFBRSxDQUFDO0lBRWxCLE9BQU8sU0FBUyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUM3QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sb3JSZXNvbHZhYmxlLCBHdWlsZE1lbWJlciwgTWVzc2FnZSwgTWVzc2FnZUVtYmVkIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5pbXBvcnQgcnNyYyBmcm9tICcuLi9jbGFzc2VzL1Jlc291cmNlcyc7XHJcbmltcG9ydCByYW5rcyBmcm9tICcuLi9yZXNvdXJjZXMvcmFua3MvcmFua3MnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XHJcbiAgZGVzY3JpcHRpb246IFwicmVwbGllcyB0byB0aGUgbWVtYmVyIHdpdGggdGhlaXIgY3VycmVudCBzZXJ2ZXIgc3RhdHNcIlxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMucnVuID0gYXN5bmMgKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkgPT4ge1xyXG4gIGxldCB1c2VybmFtZSA9IHJzcmMuZ2V0VXNlcm5hbWVGcm9tTWVzc2FnZShtZXNzYWdlKTtcclxuICBsZXQgY29udGVudCA9IGNsaWVudC5nZXRVc2VyQ29udGVudChtZXNzYWdlLmd1aWxkLCB1c2VybmFtZSk7XHJcbiAgbGV0IG1lbWJlcjogR3VpbGRNZW1iZXIgPSBtZXNzYWdlLm1lbWJlciBhcyBHdWlsZE1lbWJlcjtcclxuXHJcbiAgaWYgKCFtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMgfHwgbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLnNpemUgIT09IDApIHtcclxuICAgIG1lbWJlciA9IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycyEuZmlyc3QoKSBhcyBHdWlsZE1lbWJlcjtcclxuICAgIHVzZXJuYW1lID0gcnNyYy5nZXRVc2VybmFtZUZyb21NZW1iZXIobWVtYmVyKTtcclxuICAgIGNvbnRlbnQgPSByc3JjLmdldFVzZXJDb250ZW50c0Zyb21OYW1lKGNsaWVudCwgbWVzc2FnZSwgdXNlcm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFjb250ZW50KSB7XHJcbiAgICBtZXNzYWdlLmRlbGV0ZSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFxyXG4gICAgICAgIGAke1xyXG4gICAgICAgICAgbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzIS5maXJzdCgpIS5kaXNwbGF5TmFtZVxyXG4gICAgICAgIH0gZG9lcyBub3QgeWV0IGhhdmUgYW55IHN0YXRzIDooIHRoZXkgbmVlZCB0byBwb3N0IGEgbWVzc2FnZSBpbiB0aGUgc2VydmVyIHRvIGJlIHJlZ2lzdGVyZWQgYnkgbWUuYFxyXG4gICAgICApO1xyXG4gICAgfSBjYXRjaCAoZXJyXzEpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyXzEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbWVzc2FnZS5jaGFubmVsLnNlbmQoZ2V0RW1iZWQoY2xpZW50LCBtZW1iZXIsIGNvbnRlbnQpKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZXJyKTtcclxuICB9KTtcclxuICBtZXNzYWdlLmRlbGV0ZSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gZ2V0RW1iZWQoY2xpZW50OiBhbnksIG1lbWJlcjogR3VpbGRNZW1iZXIsIGNvbnRlbnQ6IGFueSkge1xyXG4gIGxldCBuYW1lID1cclxuICAgIFwiKipcIiArXHJcbiAgICBjb250ZW50LmhpZGRlbi51c2VybmFtZVxyXG4gICAgICAuc3Vic3RyaW5nKDAsIGNvbnRlbnQuaGlkZGVuLnVzZXJuYW1lLmxhc3RJbmRleE9mKFwiX1wiKSlcclxuICAgICAgLnRvVXBwZXJDYXNlKCkgK1xyXG4gICAgXCIqKlwiO1xyXG5cclxuICBsZXQgcmFua0NvbG9yID0gbWVtYmVyLmd1aWxkLnJvbGVzLmZpbmQoXHJcbiAgICByb2xlID0+IHJvbGUubmFtZSA9PT0gY29udGVudC5yYW5rLm5hbWVcclxuICApPy5jb2xvcjtcclxuXHJcbiAgY29uc3QgZW1iZWQgPSBuZXcgTWVzc2FnZUVtYmVkKCk7XHJcbiAgZW1iZWQuc2V0VGl0bGUobmFtZSArIFwiIHwgXCIgKyBjYWxjdWxhdGVQb3NpdGlvbihjbGllbnQsIGNvbnRlbnQpKTtcclxuICBlbWJlZC5zZXRDb2xvcihyYW5rQ29sb3IgYXMgQ29sb3JSZXNvbHZhYmxlKTtcclxuICBlbWJlZC5zZXRUaHVtYm5haWwocmFua3MudXJsc1tjb250ZW50LnJhbmsubmFtZV0pO1xyXG5cclxuICBsZXQgbGV2ZWxTdGF0cyA9IFwiXCI7XHJcbiAgaWYgKGNvbnRlbnQucmFuay5uYW1lICE9PSBudWxsKVxyXG4gICAgbGV2ZWxTdGF0cyArPSBgKipyYW5rOioqICAqJHtjb250ZW50LnJhbmsubmFtZX0qXFxuYC50b1VwcGVyQ2FzZSgpO1xyXG4gIGlmIChjb250ZW50LnJhbmsubGV2ZWwgIT09IG51bGwpXHJcbiAgICBsZXZlbFN0YXRzICs9IGAqKmxldmVsOioqICAqJHtjb250ZW50LnJhbmsubGV2ZWx9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICBpZiAoY29udGVudC5yYW5rLnhwICE9PSBudWxsKVxyXG4gICAgbGV2ZWxTdGF0cyArPSBgKip4cDoqKiAgKiR7Z2V0Rm9ybWF0dGVkTnVtYmVyKFxyXG4gICAgICBjb250ZW50LnJhbmsueHBcclxuICAgICl9IC8gJHtnZXRGb3JtYXR0ZWROdW1iZXIoY29udGVudC5yYW5rLmxldmVsdXApfSpcXG5gLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKGxldmVsU3RhdHMgIT09IFwiXCIpIGVtYmVkLmFkZEZpZWxkKFwiKipMRVZFTCBTVEFUUyoqXCIsIGxldmVsU3RhdHMpO1xyXG5cclxuICBsZXQgcmFjZVN0YXRzID0gXCJcIjtcclxuICBpZiAoY29udGVudC5yYWNlLndpbnMgIT09IG51bGwpXHJcbiAgICByYWNlU3RhdHMgKz0gYCoqd2luczoqKiAgKiR7Y29udGVudC5yYWNlLndpbnN9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICBpZiAocmFjZVN0YXRzICE9PSBcIlwiKSBlbWJlZC5hZGRGaWVsZChcIioqTUFSQkxFIFJBQ0UgU1RBVFMqKlwiLCByYWNlU3RhdHMpO1xyXG5cclxuICBsZXQgbWlzY1N0YXRzID0gXCJcIjtcclxuICBpZiAoY29udGVudC5taXNjLmpvaW5lZCAhPT0gbnVsbClcclxuICAgIG1pc2NTdGF0cyArPSBgKipqb2luZWQ6KiogICoke2NvbnRlbnQubWlzYy5qb2luZWR9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICBpZiAoY29udGVudC5taXNjLmZpcnN0X21lc3NhZ2UgIT09IG51bGwpXHJcbiAgICBtaXNjU3RhdHMgKz0gYCoqZmlyc3QgbWVzc2FnZToqKiAgKiR7Y29udGVudC5taXNjLmZpcnN0X21lc3NhZ2V9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICBpZiAoY29udGVudC5taXNjLndhcm5pbmdzICE9PSBudWxsKVxyXG4gICAgbWlzY1N0YXRzICs9IGAqKndhcm5pbmdzOioqICAqJHtjb250ZW50Lm1pc2Mud2FybmluZ3N9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICBpZiAobWlzY1N0YXRzICE9PSBcIlwiKSBlbWJlZC5hZGRGaWVsZChcIioqTUlTQy4gU1RBVFMqKlwiLCBtaXNjU3RhdHMpO1xyXG5cclxuICBpZiAobWVtYmVyLnJvbGVzLmhhcyhjbGllbnQuY29uZmlnLnJvbGVzLm1vZCkpIHtcclxuICAgIGVtYmVkLnNldEZvb3RlcihcclxuICAgICAgXCJCRSBSRVNQRUNURlVMIFRPIEFMTCAtIEVTUEVDSUFMTFkgTU9ERVJBVE9SU1wiLFxyXG4gICAgICBcImh0dHBzOi8vaS5pYmIuY28vTUM1Mzg5cS9jcm9zc2VkLXN3b3Jkcy0yNjk0LnBuZ1wiXHJcbiAgICApO1xyXG4gICAgZW1iZWQuc2V0RGVzY3JpcHRpb24oXCJgU0VSVkVSIE1PRGBcIik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZW1iZWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEZvcm1hdHRlZE51bWJlcihudW1iZXI6IHN0cmluZykge1xyXG4gIHJldHVybiBudW1iZXIudG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIixcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZVBvc2l0aW9uKGNsaWVudDogYW55LCBjb250ZW50OiBhbnkpIHtcclxuICBsZXQgZ3VpbGQgPSBjbGllbnQuZ2V0R3VpbGQoY29udGVudC5oaWRkZW4uZ3VpbGRuYW1lKTtcclxuICBsZXQgdXNlcnNIaWdoZXIgPSAwO1xyXG5cclxuICBsZXQgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKGd1aWxkKTtcclxuICBmb3IgKGxldCBbdXNlcm5hbWUsIHVzZXJDb250ZW50XSBvZiBlbnRyaWVzKVxyXG4gICAgaWYgKFxyXG4gICAgICB1c2VybmFtZSAhPSBjb250ZW50LmhpZGRlbi51c2VybmFtZSAmJlxyXG4gICAgICAodXNlckNvbnRlbnQgYXMgYW55KS5yYW5rLnhwID4gY29udGVudC5yYW5rLnhwXHJcbiAgICApXHJcbiAgICAgIHVzZXJzSGlnaGVyKys7XHJcblxyXG4gIHJldHVybiBcIipSQU5LICNcIiArICh1c2Vyc0hpZ2hlciArIDEpICsgXCIqXCI7XHJcbn1cclxuIl19