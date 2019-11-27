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
        catch (err) {
            console.log(err);
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
        embed.addField("**LEVEL STATS**", levelStats, true);
    let raceStats = "";
    if (content.race.wins !== null)
        raceStats += `**wins:**  *${content.race.wins}*\n`.toUpperCase();
    if (raceStats !== "")
        embed.addField("**MARBLE RACE STATS**", raceStats, true);
    let miscStats = "";
    if (content.misc.joined !== null)
        miscStats += `**joined:**  *${content.misc.joined}*\n`.toUpperCase();
    if (content.misc.first_message !== null)
        miscStats += `**first message:**  "*${content.misc.first_message}*"\n`;
    if (content.misc.warnings !== null)
        miscStats += `**warnings:**  *${content.misc.warnings}*\n`.toUpperCase();
    if (miscStats !== "")
        embed.addField("**MISC. STATS**", miscStats, true);
    let guildName = Resources_1.default.getGuildNameFromGuild(member.guild);
    if (member.roles.has(client.guild_configs[guildName].roles.mod)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvc3RhdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBaUY7QUFFakYsb0RBQXdDO0FBQ3hDLDhDQUF1QztBQUV2QyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixXQUFXLEVBQUUsdURBQXVEO0NBQ3JFLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWMsRUFBRSxFQUFFO0lBQzNFLElBQUksUUFBUSxHQUFHLG1CQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdELElBQUksTUFBTSxHQUFnQixPQUFPLENBQUMsTUFBcUIsQ0FBQztJQUV4RCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtRQUNwRSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFRLENBQUMsS0FBSyxFQUFpQixDQUFDO1FBQzFELFFBQVEsR0FBRyxtQkFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLE9BQU8sR0FBRyxtQkFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDbkU7SUFFRCxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FB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LE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDakUsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUMsTUFBVyxFQUFFLE9BQVk7SUFDbEQsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RELElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztJQUVwQixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsSUFBSSxPQUFPO1FBQUUsSUFBSSxRQUFRLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUssV0FBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUFFLFdBQVcsRUFBRSxDQUFDO0lBRXRKLE9BQU8sU0FBUyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUM3QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sb3JSZXNvbHZhYmxlLCBHdWlsZE1lbWJlciwgTWVzc2FnZSwgTWVzc2FnZUVtYmVkIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5pbXBvcnQgcnNyYyBmcm9tICcuLi9jbGFzc2VzL1Jlc291cmNlcyc7XHJcbmltcG9ydCByYW5rcyBmcm9tICcuLi9yZXNvdXJjZXMvcmFua3MnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XHJcbiAgZGVzY3JpcHRpb246IFwicmVwbGllcyB0byB0aGUgbWVtYmVyIHdpdGggdGhlaXIgY3VycmVudCBzZXJ2ZXIgc3RhdHNcIlxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMucnVuID0gYXN5bmMgKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkgPT4ge1xyXG4gIGxldCB1c2VybmFtZSA9IHJzcmMuZ2V0VXNlcm5hbWVGcm9tTWVzc2FnZShtZXNzYWdlKTtcclxuICBsZXQgY29udGVudCA9IGNsaWVudC5nZXRVc2VyQ29udGVudChtZXNzYWdlLmd1aWxkLCB1c2VybmFtZSk7XHJcbiAgbGV0IG1lbWJlcjogR3VpbGRNZW1iZXIgPSBtZXNzYWdlLm1lbWJlciBhcyBHdWlsZE1lbWJlcjtcclxuXHJcbiAgaWYgKCFtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMgfHwgbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLnNpemUgIT09IDApIHtcclxuICAgIG1lbWJlciA9IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycyEuZmlyc3QoKSBhcyBHdWlsZE1lbWJlcjtcclxuICAgIHVzZXJuYW1lID0gcnNyYy5nZXRVc2VybmFtZUZyb21NZW1iZXIobWVtYmVyKTtcclxuICAgIGNvbnRlbnQgPSByc3JjLmdldFVzZXJDb250ZW50c0Zyb21OYW1lKGNsaWVudCwgbWVzc2FnZSwgdXNlcm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFjb250ZW50KSB7XHJcbiAgICBtZXNzYWdlLmRlbGV0ZSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KGAke21lc3NhZ2UubWVudGlvbnMubWVtYmVycyEuZmlyc3QoKSEuZGlzcGxheU5hbWV9IGRvZXMgbm90IHlldCBoYXZlIGFueSBzdGF0cyA6KCB0aGV5IG5lZWQgdG8gcG9zdCBhIG1lc3NhZ2UgaW4gdGhlIHNlcnZlciB0byBiZSByZWdpc3RlcmVkIGJ5IG1lLmApO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtZXNzYWdlLmNoYW5uZWwuc2VuZChnZXRFbWJlZChjbGllbnQsIG1lbWJlciwgY29udGVudCkpLmNhdGNoKGVyciA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gIH0pO1xyXG4gIG1lc3NhZ2UuZGVsZXRlKCkuY2F0Y2goZXJyID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBnZXRFbWJlZChjbGllbnQ6IGFueSwgbWVtYmVyOiBHdWlsZE1lbWJlciwgY29udGVudDogYW55KSB7XHJcbiAgbGV0IG5hbWUgPSBcIioqXCIgKyBjb250ZW50LmhpZGRlbi51c2VybmFtZS5zdWJzdHJpbmcoMCwgY29udGVudC5oaWRkZW4udXNlcm5hbWUubGFzdEluZGV4T2YoXCJfXCIpKS50b1VwcGVyQ2FzZSgpICsgXCIqKlwiO1xyXG5cclxuICBsZXQgcmFua0NvbG9yID0gbWVtYmVyLmd1aWxkLnJvbGVzLmZpbmQocm9sZSA9PiByb2xlLm5hbWUgPT09IGNvbnRlbnQucmFuay5uYW1lKT8uY29sb3I7XHJcblxyXG4gIGNvbnN0IGVtYmVkID0gbmV3IE1lc3NhZ2VFbWJlZCgpO1xyXG4gIGVtYmVkLnNldFRpdGxlKG5hbWUgKyBcIiB8IFwiICsgY2FsY3VsYXRlUG9zaXRpb24oY2xpZW50LCBjb250ZW50KSk7XHJcbiAgZW1iZWQuc2V0Q29sb3IocmFua0NvbG9yIGFzIENvbG9yUmVzb2x2YWJsZSk7XHJcbiAgZW1iZWQuc2V0VGh1bWJuYWlsKHJhbmtzLnVybHNbY29udGVudC5yYW5rLm5hbWVdKTtcclxuXHJcbiAgbGV0IGxldmVsU3RhdHMgPSBcIlwiO1xyXG4gIGlmIChjb250ZW50LnJhbmsubmFtZSAhPT0gbnVsbCkgbGV2ZWxTdGF0cyArPSBgKipyYW5rOioqICAqJHtjb250ZW50LnJhbmsubmFtZX0qXFxuYC50b1VwcGVyQ2FzZSgpO1xyXG4gIGlmIChjb250ZW50LnJhbmsubGV2ZWwgIT09IG51bGwpIGxldmVsU3RhdHMgKz0gYCoqbGV2ZWw6KiogICoke2NvbnRlbnQucmFuay5sZXZlbH0qXFxuYC50b1VwcGVyQ2FzZSgpO1xyXG4gIGlmIChjb250ZW50LnJhbmsueHAgIT09IG51bGwpIGxldmVsU3RhdHMgKz0gYCoqeHA6KiogICoke2dldEZvcm1hdHRlZE51bWJlcihjb250ZW50LnJhbmsueHApfSAvICR7Z2V0Rm9ybWF0dGVkTnVtYmVyKGNvbnRlbnQucmFuay5sZXZlbHVwKX0qXFxuYC50b1VwcGVyQ2FzZSgpO1xyXG4gIGlmIChsZXZlbFN0YXRzICE9PSBcIlwiKSBlbWJlZC5hZGRGaWVsZChcIioqTEVWRUwgU1RBVFMqKlwiLCBsZXZlbFN0YXRzLCB0cnVlKTtcclxuXHJcbiAgbGV0IHJhY2VTdGF0cyA9IFwiXCI7XHJcbiAgaWYgKGNvbnRlbnQucmFjZS53aW5zICE9PSBudWxsKSByYWNlU3RhdHMgKz0gYCoqd2luczoqKiAgKiR7Y29udGVudC5yYWNlLndpbnN9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICBpZiAocmFjZVN0YXRzICE9PSBcIlwiKSBlbWJlZC5hZGRGaWVsZChcIioqTUFSQkxFIFJBQ0UgU1RBVFMqKlwiLCByYWNlU3RhdHMsIHRydWUpO1xyXG5cclxuICBsZXQgbWlzY1N0YXRzID0gXCJcIjtcclxuICBpZiAoY29udGVudC5taXNjLmpvaW5lZCAhPT0gbnVsbCkgbWlzY1N0YXRzICs9IGAqKmpvaW5lZDoqKiAgKiR7Y29udGVudC5taXNjLmpvaW5lZH0qXFxuYC50b1VwcGVyQ2FzZSgpO1xyXG4gIGlmIChjb250ZW50Lm1pc2MuZmlyc3RfbWVzc2FnZSAhPT0gbnVsbCkgbWlzY1N0YXRzICs9IGAqKmZpcnN0IG1lc3NhZ2U6KiogIFwiKiR7Y29udGVudC5taXNjLmZpcnN0X21lc3NhZ2V9KlwiXFxuYDtcclxuICBpZiAoY29udGVudC5taXNjLndhcm5pbmdzICE9PSBudWxsKSBtaXNjU3RhdHMgKz0gYCoqd2FybmluZ3M6KiogICoke2NvbnRlbnQubWlzYy53YXJuaW5nc30qXFxuYC50b1VwcGVyQ2FzZSgpO1xyXG4gIGlmIChtaXNjU3RhdHMgIT09IFwiXCIpIGVtYmVkLmFkZEZpZWxkKFwiKipNSVNDLiBTVEFUUyoqXCIsIG1pc2NTdGF0cywgdHJ1ZSk7XHJcblxyXG4gIGxldCBndWlsZE5hbWUgPSByc3JjLmdldEd1aWxkTmFtZUZyb21HdWlsZChtZW1iZXIuZ3VpbGQpO1xyXG4gIGlmIChtZW1iZXIucm9sZXMuaGFzKGNsaWVudC5ndWlsZF9jb25maWdzW2d1aWxkTmFtZV0ucm9sZXMubW9kKSkge1xyXG4gICAgZW1iZWQuc2V0Rm9vdGVyKFwiQkUgUkVTUEVDVEZVTCBUTyBBTEwgLSBFU1BFQ0lBTExZIE1PREVSQVRPUlNcIiwgXCJodHRwczovL2kuaWJiLmNvL01DNTM4OXEvY3Jvc3NlZC1zd29yZHMtMjY5NC5wbmdcIik7XHJcbiAgICBlbWJlZC5zZXREZXNjcmlwdGlvbihcImBTRVJWRVIgTU9EYFwiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBlbWJlZDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Rm9ybWF0dGVkTnVtYmVyKG51bWJlcjogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIG51bWJlci50b1N0cmluZygpLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiLFwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2FsY3VsYXRlUG9zaXRpb24oY2xpZW50OiBhbnksIGNvbnRlbnQ6IGFueSkge1xyXG4gIGxldCBndWlsZCA9IGNsaWVudC5nZXRHdWlsZChjb250ZW50LmhpZGRlbi5ndWlsZG5hbWUpO1xyXG4gIGxldCB1c2Vyc0hpZ2hlciA9IDA7XHJcblxyXG4gIGxldCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoZ3VpbGQpO1xyXG4gIGZvciAobGV0IFt1c2VybmFtZSwgdXNlckNvbnRlbnRdIG9mIGVudHJpZXMpIGlmICh1c2VybmFtZSAhPSBjb250ZW50LmhpZGRlbi51c2VybmFtZSAmJiAodXNlckNvbnRlbnQgYXMgYW55KS5yYW5rLnhwID4gY29udGVudC5yYW5rLnhwKSB1c2Vyc0hpZ2hlcisrO1xyXG5cclxuICByZXR1cm4gXCIqUkFOSyAjXCIgKyAodXNlcnNIaWdoZXIgKyAxKSArIFwiKlwiO1xyXG59XHJcbiJdfQ==