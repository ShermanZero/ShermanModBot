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
        embed.setThumbnail(ranks_1.default.urls[content.rank.name]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvc3RhdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBaUY7QUFFakYsb0RBQXdDO0FBQ3hDLG9EQUE2QztBQUU3QyxNQUFxQixLQUFLO0lBQTFCO1FBQ0UsVUFBSyxHQUFHO1lBQ04sV0FBVyxFQUFFLHVEQUF1RDtTQUNyRSxDQUFDO0lBNkdKLENBQUM7SUEzR08sR0FBRyxDQUFDLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWM7O1lBQ3JELElBQUksUUFBUSxHQUFHLG1CQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzdELElBQUksTUFBTSxHQUFnQixPQUFPLENBQUMsTUFBcUIsQ0FBQztZQUV4RCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtnQkFDcEUsTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBUSxDQUFDLEtBQUssRUFBaUIsQ0FBQztnQkFDMUQsUUFBUSxHQUFHLG1CQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzlDLE9BQU8sR0FBRyxtQkFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQzthQUMzRDtZQUVELElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gs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QztJQUVELGlCQUFpQixDQUFDLE1BQVcsRUFBRSxPQUFZO1FBQ3pDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFFcEIsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLElBQUksT0FBTztZQUN6QyxJQUNFLFFBQVEsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVE7Z0JBQ2xDLFdBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBRTlDLFdBQVcsRUFBRSxDQUFDO1FBRWxCLE9BQU8sU0FBUyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUM3QyxDQUFDO0NBQ0Y7QUFoSEQsd0JBZ0hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sb3JSZXNvbHZhYmxlLCBHdWlsZE1lbWJlciwgTWVzc2FnZSwgTWVzc2FnZUVtYmVkIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5pbXBvcnQgcnNyYyBmcm9tICcuLi9jbGFzc2VzL1Jlc291cmNlcyc7XHJcbmltcG9ydCByYW5rcyBmcm9tICcuLi9yZXNvdXJjZXMvcmFua3MvcmFua3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc3RhdHMge1xyXG4gIHByb3BzID0ge1xyXG4gICAgZGVzY3JpcHRpb246IFwicmVwbGllcyB0byB0aGUgbWVtYmVyIHdpdGggdGhlaXIgY3VycmVudCBzZXJ2ZXIgc3RhdHNcIixcclxuICB9O1xyXG5cclxuICBhc3luYyBydW4oY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UsIGFyZ3M6IHN0cmluZ1tdKSB7XHJcbiAgICBsZXQgdXNlcm5hbWUgPSByc3JjLmdldFVzZXJuYW1lRnJvbU1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICBsZXQgY29udGVudCA9IGNsaWVudC5nZXRVc2VyQ29udGVudChtZXNzYWdlLmd1aWxkLCB1c2VybmFtZSk7XHJcbiAgICBsZXQgbWVtYmVyOiBHdWlsZE1lbWJlciA9IG1lc3NhZ2UubWVtYmVyIGFzIEd1aWxkTWVtYmVyO1xyXG5cclxuICAgIGlmICghbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzIHx8IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycy5zaXplICE9PSAwKSB7XHJcbiAgICAgIG1lbWJlciA9IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycyEuZmlyc3QoKSBhcyBHdWlsZE1lbWJlcjtcclxuICAgICAgdXNlcm5hbWUgPSByc3JjLmdldFVzZXJuYW1lRnJvbU1lbWJlcihtZW1iZXIpO1xyXG4gICAgICBjb250ZW50ID0gcnNyYy5nZXRVc2VyQ29udGVudHNGcm9tTmFtZShtZXNzYWdlLCB1c2VybmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjb250ZW50KSB7XHJcbiAgICAgIG1lc3NhZ2UuZGVsZXRlKCkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB9KTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcclxuICAgICAgICAgIGAke1xyXG4gICAgICAgICAgICBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMhLmZpcnN0KCkhLmRpc3BsYXlOYW1lXHJcbiAgICAgICAgICB9IGRvZXMgbm90IHlldCBoYXZlIGFueSBzdGF0cyA6KCB0aGV5IG5lZWQgdG8gcG9zdCBhIG1lc3NhZ2UgaW4gdGhlIHNlcnZlciB0byBiZSByZWdpc3RlcmVkIGJ5IG1lLmBcclxuICAgICAgICApO1xyXG4gICAgICB9IGNhdGNoIChlcnJfMSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycl8xKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1lc3NhZ2UuY2hhbm5lbFxyXG4gICAgICAuc2VuZCh0aGlzLmdldEVtYmVkKGNsaWVudCwgbWVtYmVyLCBjb250ZW50KSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfSk7XHJcbiAgICBtZXNzYWdlLmRlbGV0ZSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldEVtYmVkKGNsaWVudDogYW55LCBtZW1iZXI6IEd1aWxkTWVtYmVyLCBjb250ZW50OiBhbnkpIHtcclxuICAgIGxldCBuYW1lID1cclxuICAgICAgXCIqKlwiICtcclxuICAgICAgY29udGVudC5oaWRkZW4udXNlcm5hbWVcclxuICAgICAgICAuc3Vic3RyaW5nKDAsIGNvbnRlbnQuaGlkZGVuLnVzZXJuYW1lLmxhc3RJbmRleE9mKFwiX1wiKSlcclxuICAgICAgICAudG9VcHBlckNhc2UoKSArXHJcbiAgICAgIFwiKipcIjtcclxuXHJcbiAgICBsZXQgcmFua0NvbG9yID0gbWVtYmVyLmd1aWxkLnJvbGVzLmZpbmQoXHJcbiAgICAgIHJvbGUgPT4gcm9sZS5uYW1lID09PSBjb250ZW50LnJhbmsubmFtZVxyXG4gICAgKT8uY29sb3I7XHJcblxyXG4gICAgY29uc3QgZW1iZWQgPSBuZXcgTWVzc2FnZUVtYmVkKCk7XHJcbiAgICBlbWJlZC5zZXRUaXRsZShuYW1lICsgXCIgfCBcIiArIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oY2xpZW50LCBjb250ZW50KSk7XHJcbiAgICBlbWJlZC5zZXRDb2xvcihyYW5rQ29sb3IgYXMgQ29sb3JSZXNvbHZhYmxlKTtcclxuICAgIGVtYmVkLnNldFRodW1ibmFpbChyYW5rcy51cmxzW2NvbnRlbnQucmFuay5uYW1lXSk7XHJcblxyXG4gICAgbGV0IGxldmVsU3RhdHMgPSBcIlwiO1xyXG4gICAgaWYgKGNvbnRlbnQucmFuay5uYW1lICE9PSBudWxsKVxyXG4gICAgICBsZXZlbFN0YXRzICs9IGAqKnJhbms6KiogICoke2NvbnRlbnQucmFuay5uYW1lfSpcXG5gLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBpZiAoY29udGVudC5yYW5rLmxldmVsICE9PSBudWxsKVxyXG4gICAgICBsZXZlbFN0YXRzICs9IGAqKmxldmVsOioqICAqJHtjb250ZW50LnJhbmsubGV2ZWx9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICAgIGlmIChjb250ZW50LnJhbmsueHAgIT09IG51bGwpXHJcbiAgICAgIGxldmVsU3RhdHMgKz0gYCoqeHA6KiogICoke3RoaXMuZ2V0Rm9ybWF0dGVkTnVtYmVyKFxyXG4gICAgICAgIGNvbnRlbnQucmFuay54cFxyXG4gICAgICApfSAvICR7dGhpcy5nZXRGb3JtYXR0ZWROdW1iZXIoY29udGVudC5yYW5rLmxldmVsdXApfSpcXG5gLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBpZiAobGV2ZWxTdGF0cyAhPT0gXCJcIikgZW1iZWQuYWRkRmllbGQoXCIqKkxFVkVMIFNUQVRTKipcIiwgbGV2ZWxTdGF0cyk7XHJcblxyXG4gICAgbGV0IHJhY2VTdGF0cyA9IFwiXCI7XHJcbiAgICBpZiAoY29udGVudC5yYWNlLndpbnMgIT09IG51bGwpXHJcbiAgICAgIHJhY2VTdGF0cyArPSBgKip3aW5zOioqICAqJHtjb250ZW50LnJhY2Uud2luc30qXFxuYC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgaWYgKHJhY2VTdGF0cyAhPT0gXCJcIikgZW1iZWQuYWRkRmllbGQoXCIqKk1BUkJMRSBSQUNFIFNUQVRTKipcIiwgcmFjZVN0YXRzKTtcclxuXHJcbiAgICBsZXQgbWlzY1N0YXRzID0gXCJcIjtcclxuICAgIGlmIChjb250ZW50Lm1pc2Muam9pbmVkICE9PSBudWxsKVxyXG4gICAgICBtaXNjU3RhdHMgKz0gYCoqam9pbmVkOioqICAqJHtjb250ZW50Lm1pc2Muam9pbmVkfSpcXG5gLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBpZiAoY29udGVudC5taXNjLmZpcnN0X21lc3NhZ2UgIT09IG51bGwpXHJcbiAgICAgIG1pc2NTdGF0cyArPSBgKipmaXJzdCBtZXNzYWdlOioqICAqJHtjb250ZW50Lm1pc2MuZmlyc3RfbWVzc2FnZX0qXFxuYC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgaWYgKGNvbnRlbnQubWlzYy53YXJuaW5ncyAhPT0gbnVsbClcclxuICAgICAgbWlzY1N0YXRzICs9IGAqKndhcm5pbmdzOioqICAqJHtjb250ZW50Lm1pc2Mud2FybmluZ3N9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICAgIGlmIChtaXNjU3RhdHMgIT09IFwiXCIpIGVtYmVkLmFkZEZpZWxkKFwiKipNSVNDLiBTVEFUUyoqXCIsIG1pc2NTdGF0cyk7XHJcblxyXG4gICAgaWYgKG1lbWJlci5yb2xlcy5oYXMoY2xpZW50LmNvbmZpZy5yb2xlcy5tb2QpKSB7XHJcbiAgICAgIGVtYmVkLnNldEZvb3RlcihcclxuICAgICAgICBcIkJFIFJFU1BFQ1RGVUwgVE8gQUxMIC0gRVNQRUNJQUxMWSBNT0RFUkFUT1JTXCIsXHJcbiAgICAgICAgXCJodHRwczovL2kuaWJiLmNvL01DNTM4OXEvY3Jvc3NlZC1zd29yZHMtMjY5NC5wbmdcIlxyXG4gICAgICApO1xyXG4gICAgICBlbWJlZC5zZXREZXNjcmlwdGlvbihcImBTRVJWRVIgTU9EYFwiKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZW1iZWQ7XHJcbiAgfVxyXG5cclxuICBnZXRGb3JtYXR0ZWROdW1iZXIobnVtYmVyOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBudW1iZXIudG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIixcIik7XHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGVQb3NpdGlvbihjbGllbnQ6IGFueSwgY29udGVudDogYW55KSB7XHJcbiAgICBsZXQgZ3VpbGQgPSBjbGllbnQuZ2V0R3VpbGQoY29udGVudC5oaWRkZW4uZ3VpbGRuYW1lKTtcclxuICAgIGxldCB1c2Vyc0hpZ2hlciA9IDA7XHJcblxyXG4gICAgbGV0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhndWlsZCk7XHJcbiAgICBmb3IgKGxldCBbdXNlcm5hbWUsIHVzZXJDb250ZW50XSBvZiBlbnRyaWVzKVxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdXNlcm5hbWUgIT0gY29udGVudC5oaWRkZW4udXNlcm5hbWUgJiZcclxuICAgICAgICAodXNlckNvbnRlbnQgYXMgYW55KS5yYW5rLnhwID4gY29udGVudC5yYW5rLnhwXHJcbiAgICAgIClcclxuICAgICAgICB1c2Vyc0hpZ2hlcisrO1xyXG5cclxuICAgIHJldHVybiBcIipSQU5LICNcIiArICh1c2Vyc0hpZ2hlciArIDEpICsgXCIqXCI7XHJcbiAgfVxyXG59XHJcbiJdfQ==