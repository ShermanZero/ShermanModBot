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
const ranks = require("../resources/ranks/ranks.json");
class stats {
    constructor() {
        this.props = {
            description: "replies to the member with their current server stats",
        };
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
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
            message.channel
                .send(this.getEmbed(client, member, content))
                .catch(err => {
                console.log(err);
            });
            message.delete().catch(err => {
                console.log(err);
            });
        });
    }
    getEmbed(client, member, content) {
        var _a;
        let name = "**" +
            content.hidden.username
                .substring(0, content.hidden.username.lastIndexOf("_"))
                .toUpperCase() +
            "**";
        let rankColor = (_a = member.guild.roles.find(role => role.name === content.rank.name)) === null || _a === void 0 ? void 0 : _a.color;
        const embed = new discord_js_1.MessageEmbed();
        embed.setTitle(name + " | " + this.calculatePosition(client, content));
        embed.setColor(rankColor);
        embed.setThumbnail(ranks.urls[content.rank.name]);
        let levelStats = "";
        if (content.rank.name !== null)
            levelStats += `**rank:**  *${content.rank.name}*\n`.toUpperCase();
        if (content.rank.level !== null)
            levelStats += `**level:**  *${content.rank.level}*\n`.toUpperCase();
        if (content.rank.xp !== null)
            levelStats += `**xp:**  *${this.getFormattedNumber(content.rank.xp)} / ${this.getFormattedNumber(content.rank.levelup)}*\n`.toUpperCase();
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
    getFormattedNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    calculatePosition(client, content) {
        let guild = client.getGuild(content.hidden.guildname);
        let usersHigher = 0;
        let entries = Object.entries(guild);
        for (let [username, userContent] of entries)
            if (username != content.hidden.username &&
                userContent.rank.xp > content.rank.xp)
                usersHigher++;
        return "*RANK #" + (usersHigher + 1) + "*";
    }
}
exports.default = stats;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvc3RhdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBaUY7QUFFakYsb0RBQXdDO0FBQ3hDLHVEQUF1RDtBQUV2RCxNQUFxQixLQUFLO0lBQTFCO1FBQ0UsVUFBSyxHQUFHO1lBQ04sV0FBVyxFQUFFLHVEQUF1RDtTQUNyRSxDQUFDO0lBNkdKLENBQUM7SUEzR08sR0FBRyxDQUFDLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWM7O1lBQ3JELElBQUksUUFBUSxHQUFHLG1CQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzdELElBQUksTUFBTSxHQUFnQixPQUFPLENBQUMsTUFBcUIsQ0FBQztZQUV4RCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtnQkFDcEUsTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBUSxDQUFDLEtBQUssRUFBaUIsQ0FBQztnQkFDMUQsUUFBUSxHQUFHLG1CQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzlDLE9BQU8sR0FBRyxtQkFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQzthQUMzRDtZQUVELElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gs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QztJQUVELGlCQUFpQixDQUFDLE1BQVcsRUFBRSxPQUFZO1FBQ3pDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFFcEIsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLElBQUksT0FBTztZQUN6QyxJQUNFLFFBQVEsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVE7Z0JBQ2xDLFdBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBRTlDLFdBQVcsRUFBRSxDQUFDO1FBRWxCLE9BQU8sU0FBUyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUM3QyxDQUFDO0NBQ0Y7QUFoSEQsd0JBZ0hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sb3JSZXNvbHZhYmxlLCBHdWlsZE1lbWJlciwgTWVzc2FnZSwgTWVzc2FnZUVtYmVkIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5pbXBvcnQgcnNyYyBmcm9tICcuLi9jbGFzc2VzL1Jlc291cmNlcyc7XHJcbmltcG9ydCAqIGFzIHJhbmtzIGZyb20gJy4uL3Jlc291cmNlcy9yYW5rcy9yYW5rcy5qc29uJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHN0YXRzIHtcclxuICBwcm9wcyA9IHtcclxuICAgIGRlc2NyaXB0aW9uOiBcInJlcGxpZXMgdG8gdGhlIG1lbWJlciB3aXRoIHRoZWlyIGN1cnJlbnQgc2VydmVyIHN0YXRzXCIsXHJcbiAgfTtcclxuXHJcbiAgYXN5bmMgcnVuKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkge1xyXG4gICAgbGV0IHVzZXJuYW1lID0gcnNyYy5nZXRVc2VybmFtZUZyb21NZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgbGV0IGNvbnRlbnQgPSBjbGllbnQuZ2V0VXNlckNvbnRlbnQobWVzc2FnZS5ndWlsZCwgdXNlcm5hbWUpO1xyXG4gICAgbGV0IG1lbWJlcjogR3VpbGRNZW1iZXIgPSBtZXNzYWdlLm1lbWJlciBhcyBHdWlsZE1lbWJlcjtcclxuXHJcbiAgICBpZiAoIW1lc3NhZ2UubWVudGlvbnMubWVtYmVycyB8fCBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMuc2l6ZSAhPT0gMCkge1xyXG4gICAgICBtZW1iZXIgPSBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMhLmZpcnN0KCkgYXMgR3VpbGRNZW1iZXI7XHJcbiAgICAgIHVzZXJuYW1lID0gcnNyYy5nZXRVc2VybmFtZUZyb21NZW1iZXIobWVtYmVyKTtcclxuICAgICAgY29udGVudCA9IHJzcmMuZ2V0VXNlckNvbnRlbnRzRnJvbU5hbWUobWVzc2FnZSwgdXNlcm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY29udGVudCkge1xyXG4gICAgICBtZXNzYWdlLmRlbGV0ZSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXHJcbiAgICAgICAgICBgJHtcclxuICAgICAgICAgICAgbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzIS5maXJzdCgpIS5kaXNwbGF5TmFtZVxyXG4gICAgICAgICAgfSBkb2VzIG5vdCB5ZXQgaGF2ZSBhbnkgc3RhdHMgOiggdGhleSBuZWVkIHRvIHBvc3QgYSBtZXNzYWdlIGluIHRoZSBzZXJ2ZXIgdG8gYmUgcmVnaXN0ZXJlZCBieSBtZS5gXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBjYXRjaCAoZXJyXzEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJfMSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtZXNzYWdlLmNoYW5uZWxcclxuICAgICAgLnNlbmQodGhpcy5nZXRFbWJlZChjbGllbnQsIG1lbWJlciwgY29udGVudCkpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIH0pO1xyXG4gICAgbWVzc2FnZS5kZWxldGUoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRFbWJlZChjbGllbnQ6IGFueSwgbWVtYmVyOiBHdWlsZE1lbWJlciwgY29udGVudDogYW55KSB7XHJcbiAgICBsZXQgbmFtZSA9XHJcbiAgICAgIFwiKipcIiArXHJcbiAgICAgIGNvbnRlbnQuaGlkZGVuLnVzZXJuYW1lXHJcbiAgICAgICAgLnN1YnN0cmluZygwLCBjb250ZW50LmhpZGRlbi51c2VybmFtZS5sYXN0SW5kZXhPZihcIl9cIikpXHJcbiAgICAgICAgLnRvVXBwZXJDYXNlKCkgK1xyXG4gICAgICBcIioqXCI7XHJcblxyXG4gICAgbGV0IHJhbmtDb2xvciA9IG1lbWJlci5ndWlsZC5yb2xlcy5maW5kKFxyXG4gICAgICByb2xlID0+IHJvbGUubmFtZSA9PT0gY29udGVudC5yYW5rLm5hbWVcclxuICAgICk/LmNvbG9yO1xyXG5cclxuICAgIGNvbnN0IGVtYmVkID0gbmV3IE1lc3NhZ2VFbWJlZCgpO1xyXG4gICAgZW1iZWQuc2V0VGl0bGUobmFtZSArIFwiIHwgXCIgKyB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKGNsaWVudCwgY29udGVudCkpO1xyXG4gICAgZW1iZWQuc2V0Q29sb3IocmFua0NvbG9yIGFzIENvbG9yUmVzb2x2YWJsZSk7XHJcbiAgICBlbWJlZC5zZXRUaHVtYm5haWwocmFua3MudXJsc1tjb250ZW50LnJhbmsubmFtZV0pO1xyXG5cclxuICAgIGxldCBsZXZlbFN0YXRzID0gXCJcIjtcclxuICAgIGlmIChjb250ZW50LnJhbmsubmFtZSAhPT0gbnVsbClcclxuICAgICAgbGV2ZWxTdGF0cyArPSBgKipyYW5rOioqICAqJHtjb250ZW50LnJhbmsubmFtZX0qXFxuYC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgaWYgKGNvbnRlbnQucmFuay5sZXZlbCAhPT0gbnVsbClcclxuICAgICAgbGV2ZWxTdGF0cyArPSBgKipsZXZlbDoqKiAgKiR7Y29udGVudC5yYW5rLmxldmVsfSpcXG5gLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBpZiAoY29udGVudC5yYW5rLnhwICE9PSBudWxsKVxyXG4gICAgICBsZXZlbFN0YXRzICs9IGAqKnhwOioqICAqJHt0aGlzLmdldEZvcm1hdHRlZE51bWJlcihcclxuICAgICAgICBjb250ZW50LnJhbmsueHBcclxuICAgICAgKX0gLyAke3RoaXMuZ2V0Rm9ybWF0dGVkTnVtYmVyKGNvbnRlbnQucmFuay5sZXZlbHVwKX0qXFxuYC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgaWYgKGxldmVsU3RhdHMgIT09IFwiXCIpIGVtYmVkLmFkZEZpZWxkKFwiKipMRVZFTCBTVEFUUyoqXCIsIGxldmVsU3RhdHMpO1xyXG5cclxuICAgIGxldCByYWNlU3RhdHMgPSBcIlwiO1xyXG4gICAgaWYgKGNvbnRlbnQucmFjZS53aW5zICE9PSBudWxsKVxyXG4gICAgICByYWNlU3RhdHMgKz0gYCoqd2luczoqKiAgKiR7Y29udGVudC5yYWNlLndpbnN9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICAgIGlmIChyYWNlU3RhdHMgIT09IFwiXCIpIGVtYmVkLmFkZEZpZWxkKFwiKipNQVJCTEUgUkFDRSBTVEFUUyoqXCIsIHJhY2VTdGF0cyk7XHJcblxyXG4gICAgbGV0IG1pc2NTdGF0cyA9IFwiXCI7XHJcbiAgICBpZiAoY29udGVudC5taXNjLmpvaW5lZCAhPT0gbnVsbClcclxuICAgICAgbWlzY1N0YXRzICs9IGAqKmpvaW5lZDoqKiAgKiR7Y29udGVudC5taXNjLmpvaW5lZH0qXFxuYC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgaWYgKGNvbnRlbnQubWlzYy5maXJzdF9tZXNzYWdlICE9PSBudWxsKVxyXG4gICAgICBtaXNjU3RhdHMgKz0gYCoqZmlyc3QgbWVzc2FnZToqKiAgKiR7Y29udGVudC5taXNjLmZpcnN0X21lc3NhZ2V9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICAgIGlmIChjb250ZW50Lm1pc2Mud2FybmluZ3MgIT09IG51bGwpXHJcbiAgICAgIG1pc2NTdGF0cyArPSBgKip3YXJuaW5nczoqKiAgKiR7Y29udGVudC5taXNjLndhcm5pbmdzfSpcXG5gLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBpZiAobWlzY1N0YXRzICE9PSBcIlwiKSBlbWJlZC5hZGRGaWVsZChcIioqTUlTQy4gU1RBVFMqKlwiLCBtaXNjU3RhdHMpO1xyXG5cclxuICAgIGlmIChtZW1iZXIucm9sZXMuaGFzKGNsaWVudC5jb25maWcucm9sZXMubW9kKSkge1xyXG4gICAgICBlbWJlZC5zZXRGb290ZXIoXHJcbiAgICAgICAgXCJCRSBSRVNQRUNURlVMIFRPIEFMTCAtIEVTUEVDSUFMTFkgTU9ERVJBVE9SU1wiLFxyXG4gICAgICAgIFwiaHR0cHM6Ly9pLmliYi5jby9NQzUzODlxL2Nyb3NzZWQtc3dvcmRzLTI2OTQucG5nXCJcclxuICAgICAgKTtcclxuICAgICAgZW1iZWQuc2V0RGVzY3JpcHRpb24oXCJgU0VSVkVSIE1PRGBcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGVtYmVkO1xyXG4gIH1cclxuXHJcbiAgZ2V0Rm9ybWF0dGVkTnVtYmVyKG51bWJlcjogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbnVtYmVyLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIsXCIpO1xyXG4gIH1cclxuXHJcbiAgY2FsY3VsYXRlUG9zaXRpb24oY2xpZW50OiBhbnksIGNvbnRlbnQ6IGFueSkge1xyXG4gICAgbGV0IGd1aWxkID0gY2xpZW50LmdldEd1aWxkKGNvbnRlbnQuaGlkZGVuLmd1aWxkbmFtZSk7XHJcbiAgICBsZXQgdXNlcnNIaWdoZXIgPSAwO1xyXG5cclxuICAgIGxldCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoZ3VpbGQpO1xyXG4gICAgZm9yIChsZXQgW3VzZXJuYW1lLCB1c2VyQ29udGVudF0gb2YgZW50cmllcylcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHVzZXJuYW1lICE9IGNvbnRlbnQuaGlkZGVuLnVzZXJuYW1lICYmXHJcbiAgICAgICAgKHVzZXJDb250ZW50IGFzIGFueSkucmFuay54cCA+IGNvbnRlbnQucmFuay54cFxyXG4gICAgICApXHJcbiAgICAgICAgdXNlcnNIaWdoZXIrKztcclxuXHJcbiAgICByZXR1cm4gXCIqUkFOSyAjXCIgKyAodXNlcnNIaWdoZXIgKyAxKSArIFwiKlwiO1xyXG4gIH1cclxufVxyXG4iXX0=