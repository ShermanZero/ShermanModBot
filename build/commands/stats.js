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
const ranks_1 = require("../resources/ranks");
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
    let name = "**" + content.hidden.username.substring(0, content.hidden.username.lastIndexOf("_")).toUpperCase() + "**";
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
        if (username != content.hidden.username && userContent.rank.xp > content.rank.xp)
            usersHigher++;
    return "*RANK #" + (usersHigher + 1) + "*";
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvc3RhdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBaUY7QUFFakYsb0RBQXdDO0FBQ3hDLDhDQUF1QztBQUV2QyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixXQUFXLEVBQUUsdURBQXVEO0NBQ3JFLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWMsRUFBRSxFQUFFO0lBQzNFLElBQUksUUFBUSxHQUFHLG1CQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdELElBQUksTUFBTSxHQUFnQixPQUFPLENBQUMsTUFBcUIsQ0FBQztJQUV4RCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtRQUNwRSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFRLENBQUMsS0FBSyxFQUFpQixDQUFDO1FBQzFELFFBQVEsR0FBRyxtQkFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLE9BQU8sR0FBRyxtQkFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDbkU7SUFFRCxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FB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VyxFQUFFLE9BQVk7SUFDbEQsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RELElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztJQUVwQixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsSUFBSSxPQUFPO1FBQUUsSUFBSSxRQUFRLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUssV0FBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUFFLFdBQVcsRUFBRSxDQUFDO0lBRXRKLE9BQU8sU0FBUyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUM3QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sb3JSZXNvbHZhYmxlLCBHdWlsZE1lbWJlciwgTWVzc2FnZSwgTWVzc2FnZUVtYmVkIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5pbXBvcnQgcnNyYyBmcm9tICcuLi9jbGFzc2VzL1Jlc291cmNlcyc7XHJcbmltcG9ydCByYW5rcyBmcm9tICcuLi9yZXNvdXJjZXMvcmFua3MnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XHJcbiAgZGVzY3JpcHRpb246IFwicmVwbGllcyB0byB0aGUgbWVtYmVyIHdpdGggdGhlaXIgY3VycmVudCBzZXJ2ZXIgc3RhdHNcIlxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMucnVuID0gYXN5bmMgKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkgPT4ge1xyXG4gIGxldCB1c2VybmFtZSA9IHJzcmMuZ2V0VXNlcm5hbWVGcm9tTWVzc2FnZShtZXNzYWdlKTtcclxuICBsZXQgY29udGVudCA9IGNsaWVudC5nZXRVc2VyQ29udGVudChtZXNzYWdlLmd1aWxkLCB1c2VybmFtZSk7XHJcbiAgbGV0IG1lbWJlcjogR3VpbGRNZW1iZXIgPSBtZXNzYWdlLm1lbWJlciBhcyBHdWlsZE1lbWJlcjtcclxuXHJcbiAgaWYgKCFtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMgfHwgbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLnNpemUgIT09IDApIHtcclxuICAgIG1lbWJlciA9IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycyEuZmlyc3QoKSBhcyBHdWlsZE1lbWJlcjtcclxuICAgIHVzZXJuYW1lID0gcnNyYy5nZXRVc2VybmFtZUZyb21NZW1iZXIobWVtYmVyKTtcclxuICAgIGNvbnRlbnQgPSByc3JjLmdldFVzZXJDb250ZW50c0Zyb21OYW1lKGNsaWVudCwgbWVzc2FnZSwgdXNlcm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFjb250ZW50KSB7XHJcbiAgICBtZXNzYWdlLmRlbGV0ZSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGAke21lc3NhZ2UubWVudGlvbnMubWVtYmVycyEuZmlyc3QoKSEuZGlzcGxheU5hbWV9IGRvZXMgbm90IHlldCBoYXZlIGFueSBzdGF0cyA6KCB0aGV5IG5lZWQgdG8gcG9zdCBhIG1lc3NhZ2UgaW4gdGhlIHNlcnZlciB0byBiZSByZWdpc3RlcmVkIGJ5IG1lLmApO1xyXG4gICAgfSBjYXRjaCAoZXJyXzEpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyXzEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbWVzc2FnZS5jaGFubmVsLnNlbmQoZ2V0RW1iZWQoY2xpZW50LCBtZW1iZXIsIGNvbnRlbnQpKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZXJyKTtcclxuICB9KTtcclxuICBtZXNzYWdlLmRlbGV0ZSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gZ2V0RW1iZWQoY2xpZW50OiBhbnksIG1lbWJlcjogR3VpbGRNZW1iZXIsIGNvbnRlbnQ6IGFueSkge1xyXG4gIGxldCBuYW1lID0gXCIqKlwiICsgY29udGVudC5oaWRkZW4udXNlcm5hbWUuc3Vic3RyaW5nKDAsIGNvbnRlbnQuaGlkZGVuLnVzZXJuYW1lLmxhc3RJbmRleE9mKFwiX1wiKSkudG9VcHBlckNhc2UoKSArIFwiKipcIjtcclxuXHJcbiAgbGV0IHJhbmtDb2xvciA9IG1lbWJlci5ndWlsZC5yb2xlcy5maW5kKHJvbGUgPT4gcm9sZS5uYW1lID09PSBjb250ZW50LnJhbmsubmFtZSk/LmNvbG9yO1xyXG5cclxuICBjb25zdCBlbWJlZCA9IG5ldyBNZXNzYWdlRW1iZWQoKTtcclxuICBlbWJlZC5zZXRUaXRsZShuYW1lICsgXCIgfCBcIiArIGNhbGN1bGF0ZVBvc2l0aW9uKGNsaWVudCwgY29udGVudCkpO1xyXG4gIGVtYmVkLnNldENvbG9yKHJhbmtDb2xvciBhcyBDb2xvclJlc29sdmFibGUpO1xyXG4gIGVtYmVkLnNldFRodW1ibmFpbChyYW5rcy51cmxzW2NvbnRlbnQucmFuay5uYW1lXSk7XHJcblxyXG4gIGxldCBsZXZlbFN0YXRzID0gXCJcIjtcclxuICBpZiAoY29udGVudC5yYW5rLm5hbWUgIT09IG51bGwpIGxldmVsU3RhdHMgKz0gYCoqcmFuazoqKiAgKiR7Y29udGVudC5yYW5rLm5hbWV9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICBpZiAoY29udGVudC5yYW5rLmxldmVsICE9PSBudWxsKSBsZXZlbFN0YXRzICs9IGAqKmxldmVsOioqICAqJHtjb250ZW50LnJhbmsubGV2ZWx9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICBpZiAoY29udGVudC5yYW5rLnhwICE9PSBudWxsKSBsZXZlbFN0YXRzICs9IGAqKnhwOioqICAqJHtnZXRGb3JtYXR0ZWROdW1iZXIoY29udGVudC5yYW5rLnhwKX0gLyAke2dldEZvcm1hdHRlZE51bWJlcihjb250ZW50LnJhbmsubGV2ZWx1cCl9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICBpZiAobGV2ZWxTdGF0cyAhPT0gXCJcIikgZW1iZWQuYWRkRmllbGQoXCIqKkxFVkVMIFNUQVRTKipcIiwgbGV2ZWxTdGF0cyk7XHJcblxyXG4gIGxldCByYWNlU3RhdHMgPSBcIlwiO1xyXG4gIGlmIChjb250ZW50LnJhY2Uud2lucyAhPT0gbnVsbCkgcmFjZVN0YXRzICs9IGAqKndpbnM6KiogICoke2NvbnRlbnQucmFjZS53aW5zfSpcXG5gLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKHJhY2VTdGF0cyAhPT0gXCJcIikgZW1iZWQuYWRkRmllbGQoXCIqKk1BUkJMRSBSQUNFIFNUQVRTKipcIiwgcmFjZVN0YXRzKTtcclxuXHJcbiAgbGV0IG1pc2NTdGF0cyA9IFwiXCI7XHJcbiAgaWYgKGNvbnRlbnQubWlzYy5qb2luZWQgIT09IG51bGwpIG1pc2NTdGF0cyArPSBgKipqb2luZWQ6KiogICoke2NvbnRlbnQubWlzYy5qb2luZWR9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICBpZiAoY29udGVudC5taXNjLmZpcnN0X21lc3NhZ2UgIT09IG51bGwpIG1pc2NTdGF0cyArPSBgKipmaXJzdCBtZXNzYWdlOioqICAqJHtjb250ZW50Lm1pc2MuZmlyc3RfbWVzc2FnZX0qXFxuYC50b1VwcGVyQ2FzZSgpO1xyXG4gIGlmIChjb250ZW50Lm1pc2Mud2FybmluZ3MgIT09IG51bGwpIG1pc2NTdGF0cyArPSBgKip3YXJuaW5nczoqKiAgKiR7Y29udGVudC5taXNjLndhcm5pbmdzfSpcXG5gLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKG1pc2NTdGF0cyAhPT0gXCJcIikgZW1iZWQuYWRkRmllbGQoXCIqKk1JU0MuIFNUQVRTKipcIiwgbWlzY1N0YXRzKTtcclxuXHJcbiAgaWYgKG1lbWJlci5yb2xlcy5oYXMoY2xpZW50LmNvbmZpZy5yb2xlcy5tb2QpKSB7XHJcbiAgICBlbWJlZC5zZXRGb290ZXIoXCJCRSBSRVNQRUNURlVMIFRPIEFMTCAtIEVTUEVDSUFMTFkgTU9ERVJBVE9SU1wiLCBcImh0dHBzOi8vaS5pYmIuY28vTUM1Mzg5cS9jcm9zc2VkLXN3b3Jkcy0yNjk0LnBuZ1wiKTtcclxuICAgIGVtYmVkLnNldERlc2NyaXB0aW9uKFwiYFNFUlZFUiBNT0RgXCIpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVtYmVkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRGb3JtYXR0ZWROdW1iZXIobnVtYmVyOiBzdHJpbmcpIHtcclxuICByZXR1cm4gbnVtYmVyLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIsXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjYWxjdWxhdGVQb3NpdGlvbihjbGllbnQ6IGFueSwgY29udGVudDogYW55KSB7XHJcbiAgbGV0IGd1aWxkID0gY2xpZW50LmdldEd1aWxkKGNvbnRlbnQuaGlkZGVuLmd1aWxkbmFtZSk7XHJcbiAgbGV0IHVzZXJzSGlnaGVyID0gMDtcclxuXHJcbiAgbGV0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhndWlsZCk7XHJcbiAgZm9yIChsZXQgW3VzZXJuYW1lLCB1c2VyQ29udGVudF0gb2YgZW50cmllcykgaWYgKHVzZXJuYW1lICE9IGNvbnRlbnQuaGlkZGVuLnVzZXJuYW1lICYmICh1c2VyQ29udGVudCBhcyBhbnkpLnJhbmsueHAgPiBjb250ZW50LnJhbmsueHApIHVzZXJzSGlnaGVyKys7XHJcblxyXG4gIHJldHVybiBcIipSQU5LICNcIiArICh1c2Vyc0hpZ2hlciArIDEpICsgXCIqXCI7XHJcbn1cclxuIl19