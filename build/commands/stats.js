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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvc3RhdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBaUY7QUFFakYsb0RBQXdDO0FBQ3hDLG9EQUE2QztBQUU3QyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixXQUFXLEVBQUUsdURBQXVEO0NBQ3JFLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWMsRUFBRSxFQUFFO0lBQzNFLElBQUksUUFBUSxHQUFHLG1CQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdELElBQUksTUFBTSxHQUFnQixPQUFPLENBQUMsTUFBcUIsQ0FBQztJQUV4RCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtRQUNwRSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFRLENBQUMsS0FBSyxFQUFpQixDQUFDO1FBQzFELFFBQVEsR0FBRyxtQkFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLE9BQU8sR0FBRyxtQkFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztLQUMzRDtJQUVELElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDWixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJO1lBQ0YsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUNsQixHQUNFLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBUSxDQUFDLEtBQUssRUFBRyxDQUFDLFdBQ3JDLG1HQUFtRyxDQUNwRyxDQUFDO1NBQ0g7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7S0FDRjtJQUVELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2xFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FBQztBQUVGLFNBQVMsUUFBUSxDQUFDLE1BQVcsRUFBRSxNQUFtQixFQUFFLE9BQVk7O0lBQzlELElBQUksSUFBSSxHQUNOLElBQUk7UUFDSixPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVE7YUFDcEIsU0FBUyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdEQsV0FBVyxFQUFFO1FBQ2hCLElBQUksQ0FBQztJQUVQLElBQUksU0FBUyxTQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDckMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUN4QywwQ0FBRSxLQUFLLENBQUM7SUFFVCxNQUFNLEtBQUssR0FBRyxJQUFJLHlCQUFZLEVBQUUsQ0FBQztJQUNqQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDbEUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUE0QixDQUFDLENBQUM7SUFDN0MsS0FBSyxDQUFDLFlBQVksQ0FBQyxlQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUVsRCxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDcEIsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJO1FBQzVCLFVBQVUsSUFBSSxlQUFlLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJO1FBQzdCLFVBQVUsSUFBSSxnQkFBZ0IsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0RSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLElBQUk7UUFDMUIsVUFBVSxJQUFJLGFBQWEsa0JBQWtCLENBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUNoQixNQUFNLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyRSxJQUFJLFVBQVUsS0FBSyxFQUFFO1FBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUVyRSxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDbkIsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJO1FBQzVCLFNBQVMsSUFBSSxlQUFlLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkUsSUFBSSxTQUFTLEtBQUssRUFBRTtRQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFFekUsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ25CLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSTtRQUM5QixTQUFTLElBQUksaUJBQWlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJO1FBQ3JDLFNBQVMsSUFBSSx3QkFBd0IsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyRixJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUk7UUFDaEMsU0FBUyxJQUFJLG1CQUFtQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzNFLElBQUksU0FBUyxLQUFLLEVBQUU7UUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBRW5FLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDN0MsS0FBSyxDQUFDLFNBQVMsQ0FDYiw4Q0FBOEMsRUFDOUMsa0RBQWtELENBQ25ELENBQUM7UUFDRixLQUFLLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ3RDO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxNQUFjO0lBQ3hDLE9BQU8sTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNqRSxDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxNQUFXLEVBQUUsT0FBWTtJQUNsRCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBRXBCLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxJQUFJLE9BQU87UUFDekMsSUFDRSxRQUFRLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQ2xDLFdBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFFOUMsV0FBVyxFQUFFLENBQUM7SUFFbEIsT0FBTyxTQUFTLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQzdDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2xvclJlc29sdmFibGUsIEd1aWxkTWVtYmVyLCBNZXNzYWdlLCBNZXNzYWdlRW1iZWQgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuXHJcbmltcG9ydCByc3JjIGZyb20gJy4uL2NsYXNzZXMvUmVzb3VyY2VzJztcclxuaW1wb3J0IHJhbmtzIGZyb20gJy4uL3Jlc291cmNlcy9yYW5rcy9yYW5rcyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wcm9wcyA9IHtcclxuICBkZXNjcmlwdGlvbjogXCJyZXBsaWVzIHRvIHRoZSBtZW1iZXIgd2l0aCB0aGVpciBjdXJyZW50IHNlcnZlciBzdGF0c1wiXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5ydW4gPSBhc3luYyAoY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UsIGFyZ3M6IHN0cmluZ1tdKSA9PiB7XHJcbiAgbGV0IHVzZXJuYW1lID0gcnNyYy5nZXRVc2VybmFtZUZyb21NZXNzYWdlKG1lc3NhZ2UpO1xyXG4gIGxldCBjb250ZW50ID0gY2xpZW50LmdldFVzZXJDb250ZW50KG1lc3NhZ2UuZ3VpbGQsIHVzZXJuYW1lKTtcclxuICBsZXQgbWVtYmVyOiBHdWlsZE1lbWJlciA9IG1lc3NhZ2UubWVtYmVyIGFzIEd1aWxkTWVtYmVyO1xyXG5cclxuICBpZiAoIW1lc3NhZ2UubWVudGlvbnMubWVtYmVycyB8fCBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMuc2l6ZSAhPT0gMCkge1xyXG4gICAgbWVtYmVyID0gbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzIS5maXJzdCgpIGFzIEd1aWxkTWVtYmVyO1xyXG4gICAgdXNlcm5hbWUgPSByc3JjLmdldFVzZXJuYW1lRnJvbU1lbWJlcihtZW1iZXIpO1xyXG4gICAgY29udGVudCA9IHJzcmMuZ2V0VXNlckNvbnRlbnRzRnJvbU5hbWUobWVzc2FnZSwgdXNlcm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFjb250ZW50KSB7XHJcbiAgICBtZXNzYWdlLmRlbGV0ZSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFxyXG4gICAgICAgIGAke1xyXG4gICAgICAgICAgbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzIS5maXJzdCgpIS5kaXNwbGF5TmFtZVxyXG4gICAgICAgIH0gZG9lcyBub3QgeWV0IGhhdmUgYW55IHN0YXRzIDooIHRoZXkgbmVlZCB0byBwb3N0IGEgbWVzc2FnZSBpbiB0aGUgc2VydmVyIHRvIGJlIHJlZ2lzdGVyZWQgYnkgbWUuYFxyXG4gICAgICApO1xyXG4gICAgfSBjYXRjaCAoZXJyXzEpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyXzEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbWVzc2FnZS5jaGFubmVsLnNlbmQoZ2V0RW1iZWQoY2xpZW50LCBtZW1iZXIsIGNvbnRlbnQpKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZXJyKTtcclxuICB9KTtcclxuICBtZXNzYWdlLmRlbGV0ZSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gZ2V0RW1iZWQoY2xpZW50OiBhbnksIG1lbWJlcjogR3VpbGRNZW1iZXIsIGNvbnRlbnQ6IGFueSkge1xyXG4gIGxldCBuYW1lID1cclxuICAgIFwiKipcIiArXHJcbiAgICBjb250ZW50LmhpZGRlbi51c2VybmFtZVxyXG4gICAgICAuc3Vic3RyaW5nKDAsIGNvbnRlbnQuaGlkZGVuLnVzZXJuYW1lLmxhc3RJbmRleE9mKFwiX1wiKSlcclxuICAgICAgLnRvVXBwZXJDYXNlKCkgK1xyXG4gICAgXCIqKlwiO1xyXG5cclxuICBsZXQgcmFua0NvbG9yID0gbWVtYmVyLmd1aWxkLnJvbGVzLmZpbmQoXHJcbiAgICByb2xlID0+IHJvbGUubmFtZSA9PT0gY29udGVudC5yYW5rLm5hbWVcclxuICApPy5jb2xvcjtcclxuXHJcbiAgY29uc3QgZW1iZWQgPSBuZXcgTWVzc2FnZUVtYmVkKCk7XHJcbiAgZW1iZWQuc2V0VGl0bGUobmFtZSArIFwiIHwgXCIgKyBjYWxjdWxhdGVQb3NpdGlvbihjbGllbnQsIGNvbnRlbnQpKTtcclxuICBlbWJlZC5zZXRDb2xvcihyYW5rQ29sb3IgYXMgQ29sb3JSZXNvbHZhYmxlKTtcclxuICBlbWJlZC5zZXRUaHVtYm5haWwocmFua3MudXJsc1tjb250ZW50LnJhbmsubmFtZV0pO1xyXG5cclxuICBsZXQgbGV2ZWxTdGF0cyA9IFwiXCI7XHJcbiAgaWYgKGNvbnRlbnQucmFuay5uYW1lICE9PSBudWxsKVxyXG4gICAgbGV2ZWxTdGF0cyArPSBgKipyYW5rOioqICAqJHtjb250ZW50LnJhbmsubmFtZX0qXFxuYC50b1VwcGVyQ2FzZSgpO1xyXG4gIGlmIChjb250ZW50LnJhbmsubGV2ZWwgIT09IG51bGwpXHJcbiAgICBsZXZlbFN0YXRzICs9IGAqKmxldmVsOioqICAqJHtjb250ZW50LnJhbmsubGV2ZWx9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICBpZiAoY29udGVudC5yYW5rLnhwICE9PSBudWxsKVxyXG4gICAgbGV2ZWxTdGF0cyArPSBgKip4cDoqKiAgKiR7Z2V0Rm9ybWF0dGVkTnVtYmVyKFxyXG4gICAgICBjb250ZW50LnJhbmsueHBcclxuICAgICl9IC8gJHtnZXRGb3JtYXR0ZWROdW1iZXIoY29udGVudC5yYW5rLmxldmVsdXApfSpcXG5gLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKGxldmVsU3RhdHMgIT09IFwiXCIpIGVtYmVkLmFkZEZpZWxkKFwiKipMRVZFTCBTVEFUUyoqXCIsIGxldmVsU3RhdHMpO1xyXG5cclxuICBsZXQgcmFjZVN0YXRzID0gXCJcIjtcclxuICBpZiAoY29udGVudC5yYWNlLndpbnMgIT09IG51bGwpXHJcbiAgICByYWNlU3RhdHMgKz0gYCoqd2luczoqKiAgKiR7Y29udGVudC5yYWNlLndpbnN9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICBpZiAocmFjZVN0YXRzICE9PSBcIlwiKSBlbWJlZC5hZGRGaWVsZChcIioqTUFSQkxFIFJBQ0UgU1RBVFMqKlwiLCByYWNlU3RhdHMpO1xyXG5cclxuICBsZXQgbWlzY1N0YXRzID0gXCJcIjtcclxuICBpZiAoY29udGVudC5taXNjLmpvaW5lZCAhPT0gbnVsbClcclxuICAgIG1pc2NTdGF0cyArPSBgKipqb2luZWQ6KiogICoke2NvbnRlbnQubWlzYy5qb2luZWR9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICBpZiAoY29udGVudC5taXNjLmZpcnN0X21lc3NhZ2UgIT09IG51bGwpXHJcbiAgICBtaXNjU3RhdHMgKz0gYCoqZmlyc3QgbWVzc2FnZToqKiAgKiR7Y29udGVudC5taXNjLmZpcnN0X21lc3NhZ2V9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICBpZiAoY29udGVudC5taXNjLndhcm5pbmdzICE9PSBudWxsKVxyXG4gICAgbWlzY1N0YXRzICs9IGAqKndhcm5pbmdzOioqICAqJHtjb250ZW50Lm1pc2Mud2FybmluZ3N9KlxcbmAudG9VcHBlckNhc2UoKTtcclxuICBpZiAobWlzY1N0YXRzICE9PSBcIlwiKSBlbWJlZC5hZGRGaWVsZChcIioqTUlTQy4gU1RBVFMqKlwiLCBtaXNjU3RhdHMpO1xyXG5cclxuICBpZiAobWVtYmVyLnJvbGVzLmhhcyhjbGllbnQuY29uZmlnLnJvbGVzLm1vZCkpIHtcclxuICAgIGVtYmVkLnNldEZvb3RlcihcclxuICAgICAgXCJCRSBSRVNQRUNURlVMIFRPIEFMTCAtIEVTUEVDSUFMTFkgTU9ERVJBVE9SU1wiLFxyXG4gICAgICBcImh0dHBzOi8vaS5pYmIuY28vTUM1Mzg5cS9jcm9zc2VkLXN3b3Jkcy0yNjk0LnBuZ1wiXHJcbiAgICApO1xyXG4gICAgZW1iZWQuc2V0RGVzY3JpcHRpb24oXCJgU0VSVkVSIE1PRGBcIik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZW1iZWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEZvcm1hdHRlZE51bWJlcihudW1iZXI6IHN0cmluZykge1xyXG4gIHJldHVybiBudW1iZXIudG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIixcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZVBvc2l0aW9uKGNsaWVudDogYW55LCBjb250ZW50OiBhbnkpIHtcclxuICBsZXQgZ3VpbGQgPSBjbGllbnQuZ2V0R3VpbGQoY29udGVudC5oaWRkZW4uZ3VpbGRuYW1lKTtcclxuICBsZXQgdXNlcnNIaWdoZXIgPSAwO1xyXG5cclxuICBsZXQgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKGd1aWxkKTtcclxuICBmb3IgKGxldCBbdXNlcm5hbWUsIHVzZXJDb250ZW50XSBvZiBlbnRyaWVzKVxyXG4gICAgaWYgKFxyXG4gICAgICB1c2VybmFtZSAhPSBjb250ZW50LmhpZGRlbi51c2VybmFtZSAmJlxyXG4gICAgICAodXNlckNvbnRlbnQgYXMgYW55KS5yYW5rLnhwID4gY29udGVudC5yYW5rLnhwXHJcbiAgICApXHJcbiAgICAgIHVzZXJzSGlnaGVyKys7XHJcblxyXG4gIHJldHVybiBcIipSQU5LICNcIiArICh1c2Vyc0hpZ2hlciArIDEpICsgXCIqXCI7XHJcbn1cclxuIl19