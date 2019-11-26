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
module.exports = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    let username = Resources_1.default.getUsernameFromMessage(message);
    let content = client.getUserContent(message.guild, username);
    let member = message.member;
    if (!message.mentions.members || message.mentions.members.size !== 0) {
        member = message.mentions.members.first();
        username = Resources_1.default.getUsernameFromMember(member);
        content = Resources_1.default.getUserContentsFromName(message, username);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvc3RhdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBaUY7QUFFakYsb0RBQXdDO0FBQ3hDLG9EQUE2QztBQUU3QyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixXQUFXLEVBQUUsdURBQXVEO0NBQ3JFLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLENBQU8sTUFBVyxFQUFFLE9BQWdCLEVBQUUsSUFBYyxFQUFFLEVBQUU7SUFDdkUsSUFBSSxRQUFRLEdBQUcsbUJBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwRCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDN0QsSUFBSSxNQUFNLEdBQWdCLE9BQU8sQ0FBQyxNQUFxQixDQUFDO0lBRXhELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ3BFLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQVEsQ0FBQyxLQUFLLEVBQWlCLENBQUM7UUFDMUQsUUFBUSxHQUFHLG1CQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUMsT0FBTyxHQUFHLG1CQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzNEO0lBRUQsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNaLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztR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RSxPQUFZO0lBQ2xELElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0RCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFFcEIsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLElBQUksT0FBTztRQUN6QyxJQUNFLFFBQVEsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVE7WUFDbEMsV0FBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUU5QyxXQUFXLEVBQUUsQ0FBQztJQUVsQixPQUFPLFNBQVMsR0FBRyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDN0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbG9yUmVzb2x2YWJsZSwgR3VpbGRNZW1iZXIsIE1lc3NhZ2UsIE1lc3NhZ2VFbWJlZCB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5cclxuaW1wb3J0IHJzcmMgZnJvbSAnLi4vY2xhc3Nlcy9SZXNvdXJjZXMnO1xyXG5pbXBvcnQgcmFua3MgZnJvbSAnLi4vcmVzb3VyY2VzL3JhbmtzL3JhbmtzJztcclxuXHJcbm1vZHVsZS5leHBvcnRzLnByb3BzID0ge1xyXG4gIGRlc2NyaXB0aW9uOiBcInJlcGxpZXMgdG8gdGhlIG1lbWJlciB3aXRoIHRoZWlyIGN1cnJlbnQgc2VydmVyIHN0YXRzXCJcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkgPT4ge1xyXG4gIGxldCB1c2VybmFtZSA9IHJzcmMuZ2V0VXNlcm5hbWVGcm9tTWVzc2FnZShtZXNzYWdlKTtcclxuICBsZXQgY29udGVudCA9IGNsaWVudC5nZXRVc2VyQ29udGVudChtZXNzYWdlLmd1aWxkLCB1c2VybmFtZSk7XHJcbiAgbGV0IG1lbWJlcjogR3VpbGRNZW1iZXIgPSBtZXNzYWdlLm1lbWJlciBhcyBHdWlsZE1lbWJlcjtcclxuXHJcbiAgaWYgKCFtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMgfHwgbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLnNpemUgIT09IDApIHtcclxuICAgIG1lbWJlciA9IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycyEuZmlyc3QoKSBhcyBHdWlsZE1lbWJlcjtcclxuICAgIHVzZXJuYW1lID0gcnNyYy5nZXRVc2VybmFtZUZyb21NZW1iZXIobWVtYmVyKTtcclxuICAgIGNvbnRlbnQgPSByc3JjLmdldFVzZXJDb250ZW50c0Zyb21OYW1lKG1lc3NhZ2UsIHVzZXJuYW1lKTtcclxuICB9XHJcblxyXG4gIGlmICghY29udGVudCkge1xyXG4gICAgbWVzc2FnZS5kZWxldGUoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcclxuICAgICAgICBgJHtcclxuICAgICAgICAgIG1lc3NhZ2UubWVudGlvbnMubWVtYmVycyEuZmlyc3QoKSEuZGlzcGxheU5hbWVcclxuICAgICAgICB9IGRvZXMgbm90IHlldCBoYXZlIGFueSBzdGF0cyA6KCB0aGV5IG5lZWQgdG8gcG9zdCBhIG1lc3NhZ2UgaW4gdGhlIHNlcnZlciB0byBiZSByZWdpc3RlcmVkIGJ5IG1lLmBcclxuICAgICAgKTtcclxuICAgIH0gY2F0Y2ggKGVycl8xKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycl8xKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGdldEVtYmVkKGNsaWVudCwgbWVtYmVyLCBjb250ZW50KSkuY2F0Y2goZXJyID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgfSk7XHJcbiAgbWVzc2FnZS5kZWxldGUoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZXJyKTtcclxuICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGdldEVtYmVkKGNsaWVudDogYW55LCBtZW1iZXI6IEd1aWxkTWVtYmVyLCBjb250ZW50OiBhbnkpIHtcclxuICBsZXQgbmFtZSA9XHJcbiAgICBcIioqXCIgK1xyXG4gICAgY29udGVudC5oaWRkZW4udXNlcm5hbWVcclxuICAgICAgLnN1YnN0cmluZygwLCBjb250ZW50LmhpZGRlbi51c2VybmFtZS5sYXN0SW5kZXhPZihcIl9cIikpXHJcbiAgICAgIC50b1VwcGVyQ2FzZSgpICtcclxuICAgIFwiKipcIjtcclxuXHJcbiAgbGV0IHJhbmtDb2xvciA9IG1lbWJlci5ndWlsZC5yb2xlcy5maW5kKFxyXG4gICAgcm9sZSA9PiByb2xlLm5hbWUgPT09IGNvbnRlbnQucmFuay5uYW1lXHJcbiAgKT8uY29sb3I7XHJcblxyXG4gIGNvbnN0IGVtYmVkID0gbmV3IE1lc3NhZ2VFbWJlZCgpO1xyXG4gIGVtYmVkLnNldFRpdGxlKG5hbWUgKyBcIiB8IFwiICsgY2FsY3VsYXRlUG9zaXRpb24oY2xpZW50LCBjb250ZW50KSk7XHJcbiAgZW1iZWQuc2V0Q29sb3IocmFua0NvbG9yIGFzIENvbG9yUmVzb2x2YWJsZSk7XHJcbiAgZW1iZWQuc2V0VGh1bWJuYWlsKHJhbmtzLnVybHNbY29udGVudC5yYW5rLm5hbWVdKTtcclxuXHJcbiAgbGV0IGxldmVsU3RhdHMgPSBcIlwiO1xyXG4gIGlmIChjb250ZW50LnJhbmsubmFtZSAhPT0gbnVsbClcclxuICAgIGxldmVsU3RhdHMgKz0gYCoqcmFuazoqKiAgKiR7Y29udGVudC5yYW5rLm5hbWV9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICBpZiAoY29udGVudC5yYW5rLmxldmVsICE9PSBudWxsKVxyXG4gICAgbGV2ZWxTdGF0cyArPSBgKipsZXZlbDoqKiAgKiR7Y29udGVudC5yYW5rLmxldmVsfSpcXG5gLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKGNvbnRlbnQucmFuay54cCAhPT0gbnVsbClcclxuICAgIGxldmVsU3RhdHMgKz0gYCoqeHA6KiogICoke2dldEZvcm1hdHRlZE51bWJlcihcclxuICAgICAgY29udGVudC5yYW5rLnhwXHJcbiAgICApfSAvICR7Z2V0Rm9ybWF0dGVkTnVtYmVyKGNvbnRlbnQucmFuay5sZXZlbHVwKX0qXFxuYC50b1VwcGVyQ2FzZSgpO1xyXG4gIGlmIChsZXZlbFN0YXRzICE9PSBcIlwiKSBlbWJlZC5hZGRGaWVsZChcIioqTEVWRUwgU1RBVFMqKlwiLCBsZXZlbFN0YXRzKTtcclxuXHJcbiAgbGV0IHJhY2VTdGF0cyA9IFwiXCI7XHJcbiAgaWYgKGNvbnRlbnQucmFjZS53aW5zICE9PSBudWxsKVxyXG4gICAgcmFjZVN0YXRzICs9IGAqKndpbnM6KiogICoke2NvbnRlbnQucmFjZS53aW5zfSpcXG5gLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKHJhY2VTdGF0cyAhPT0gXCJcIikgZW1iZWQuYWRkRmllbGQoXCIqKk1BUkJMRSBSQUNFIFNUQVRTKipcIiwgcmFjZVN0YXRzKTtcclxuXHJcbiAgbGV0IG1pc2NTdGF0cyA9IFwiXCI7XHJcbiAgaWYgKGNvbnRlbnQubWlzYy5qb2luZWQgIT09IG51bGwpXHJcbiAgICBtaXNjU3RhdHMgKz0gYCoqam9pbmVkOioqICAqJHtjb250ZW50Lm1pc2Muam9pbmVkfSpcXG5gLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKGNvbnRlbnQubWlzYy5maXJzdF9tZXNzYWdlICE9PSBudWxsKVxyXG4gICAgbWlzY1N0YXRzICs9IGAqKmZpcnN0IG1lc3NhZ2U6KiogICoke2NvbnRlbnQubWlzYy5maXJzdF9tZXNzYWdlfSpcXG5gLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKGNvbnRlbnQubWlzYy53YXJuaW5ncyAhPT0gbnVsbClcclxuICAgIG1pc2NTdGF0cyArPSBgKip3YXJuaW5nczoqKiAgKiR7Y29udGVudC5taXNjLndhcm5pbmdzfSpcXG5gLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKG1pc2NTdGF0cyAhPT0gXCJcIikgZW1iZWQuYWRkRmllbGQoXCIqKk1JU0MuIFNUQVRTKipcIiwgbWlzY1N0YXRzKTtcclxuXHJcbiAgaWYgKG1lbWJlci5yb2xlcy5oYXMoY2xpZW50LmNvbmZpZy5yb2xlcy5tb2QpKSB7XHJcbiAgICBlbWJlZC5zZXRGb290ZXIoXHJcbiAgICAgIFwiQkUgUkVTUEVDVEZVTCBUTyBBTEwgLSBFU1BFQ0lBTExZIE1PREVSQVRPUlNcIixcclxuICAgICAgXCJodHRwczovL2kuaWJiLmNvL01DNTM4OXEvY3Jvc3NlZC1zd29yZHMtMjY5NC5wbmdcIlxyXG4gICAgKTtcclxuICAgIGVtYmVkLnNldERlc2NyaXB0aW9uKFwiYFNFUlZFUiBNT0RgXCIpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVtYmVkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRGb3JtYXR0ZWROdW1iZXIobnVtYmVyOiBzdHJpbmcpIHtcclxuICByZXR1cm4gbnVtYmVyLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIsXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjYWxjdWxhdGVQb3NpdGlvbihjbGllbnQ6IGFueSwgY29udGVudDogYW55KSB7XHJcbiAgbGV0IGd1aWxkID0gY2xpZW50LmdldEd1aWxkKGNvbnRlbnQuaGlkZGVuLmd1aWxkbmFtZSk7XHJcbiAgbGV0IHVzZXJzSGlnaGVyID0gMDtcclxuXHJcbiAgbGV0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhndWlsZCk7XHJcbiAgZm9yIChsZXQgW3VzZXJuYW1lLCB1c2VyQ29udGVudF0gb2YgZW50cmllcylcclxuICAgIGlmIChcclxuICAgICAgdXNlcm5hbWUgIT0gY29udGVudC5oaWRkZW4udXNlcm5hbWUgJiZcclxuICAgICAgKHVzZXJDb250ZW50IGFzIGFueSkucmFuay54cCA+IGNvbnRlbnQucmFuay54cFxyXG4gICAgKVxyXG4gICAgICB1c2Vyc0hpZ2hlcisrO1xyXG5cclxuICByZXR1cm4gXCIqUkFOSyAjXCIgKyAodXNlcnNIaWdoZXIgKyAxKSArIFwiKlwiO1xyXG59XHJcbiJdfQ==