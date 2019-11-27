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
const global_config_1 = require("../resources/global_config");
module.exports.props = {
    requiresElevation: global_config_1.default.elevation_names.moderator,
    description: "grants a member access to the private-hangout channel",
    usage: "<member>"
};
module.exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!message.guild)
        return;
    let privateRole = message.guild.roles.get("645418484398030918");
    let privateHangoutChannel = client.channels.get("645418390961258536");
    if (privateRole)
        privateRole = privateRole;
    if (privateHangoutChannel)
        privateHangoutChannel = privateHangoutChannel;
    if (!message.mentions.members || message.mentions.members.size === 0)
        return message.reply("please mention a user to give private access to");
    const roleMember = message.mentions.members.first();
    (_a = roleMember) === null || _a === void 0 ? void 0 : _a.roles.add(privateRole).catch(err => {
        console.log(err);
    });
    message.delete().catch(err => {
        console.log(err);
    });
    yield privateHangoutChannel.send(`${roleMember}, welcome to the private channel!  All the messages will be deleted after you have left.`);
    yield privateHangoutChannel.awaitMessages((response) => response.content === "EOD", {
        max: 1,
        time: 600000,
        errors: ["time"]
    });
    yield privateHangoutChannel.send("The private discussion has concluded, use !purge to clear the channel.");
    (_b = roleMember) === null || _b === void 0 ? void 0 : _b.roles.remove(privateRole).catch(err => {
        console.log(err);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wcml2YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsOERBQWdEO0FBRWhELE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHO0lBQ3JCLGlCQUFpQixFQUFFLHVCQUFNLENBQUMsZUFBZSxDQUFDLFNBQVM7SUFDbkQsV0FBVyxFQUFFLHVEQUF1RDtJQUNwRSxLQUFLLEVBQUUsVUFBVTtDQUNsQixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBTyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxJQUFjLEVBQUUsRUFBRTs7SUFDM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO1FBQUUsT0FBTztJQUUzQixJQUFJLFdBQVcsR0FBUSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNyRSxJQUFJLHFCQUFxQixHQUFRLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFFM0UsSUFBSSxXQUFXO1FBQUUsV0FBVyxHQUFHLFdBQW1CLENBQUM7SUFDbkQsSUFBSSxxQkFBcUI7UUFBRSxxQkFBcUIsR0FBRyxxQkFBZ0MsQ0FBQztJQUVwRixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUM7UUFBRSxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztJQUU5SSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUdwRCxNQUFBLFVBQVUsMENBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxFQUFFO0lBR0gsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBR0gsTUFBTSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLDBGQUEwRixDQUFDLENBQUM7SUFFMUksTUFBTSxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFpQixFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTtRQUMzRixHQUFHLEVBQUUsQ0FBQztRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDO0tBQ2pCLENBQUMsQ0FBQztJQUVILE1BQU0scUJBQXFCLENBQUMsSUFBSSxDQUFDLHdFQUF3RSxDQUFDLENBQUM7SUFFM0csTUFBQSxVQUFVLDBDQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUMsRUFBRTtBQUNMLENBQUMsQ0FBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbm5lbCwgTWVzc2FnZSwgUm9sZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5cclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9yZXNvdXJjZXMvZ2xvYmFsX2NvbmZpZyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wcm9wcyA9IHtcclxuICByZXF1aXJlc0VsZXZhdGlvbjogY29uZmlnLmVsZXZhdGlvbl9uYW1lcy5tb2RlcmF0b3IsXHJcbiAgZGVzY3JpcHRpb246IFwiZ3JhbnRzIGEgbWVtYmVyIGFjY2VzcyB0byB0aGUgcHJpdmF0ZS1oYW5nb3V0IGNoYW5uZWxcIixcclxuICB1c2FnZTogXCI8bWVtYmVyPlwiXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5ydW4gPSBhc3luYyAoY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UsIGFyZ3M6IHN0cmluZ1tdKSA9PiB7XHJcbiAgaWYgKCFtZXNzYWdlLmd1aWxkKSByZXR1cm47XHJcblxyXG4gIGxldCBwcml2YXRlUm9sZTogYW55ID0gbWVzc2FnZS5ndWlsZC5yb2xlcy5nZXQoXCI2NDU0MTg0ODQzOTgwMzA5MThcIik7XHJcbiAgbGV0IHByaXZhdGVIYW5nb3V0Q2hhbm5lbDogYW55ID0gY2xpZW50LmNoYW5uZWxzLmdldChcIjY0NTQxODM5MDk2MTI1ODUzNlwiKTtcclxuXHJcbiAgaWYgKHByaXZhdGVSb2xlKSBwcml2YXRlUm9sZSA9IHByaXZhdGVSb2xlIGFzIFJvbGU7XHJcbiAgaWYgKHByaXZhdGVIYW5nb3V0Q2hhbm5lbCkgcHJpdmF0ZUhhbmdvdXRDaGFubmVsID0gcHJpdmF0ZUhhbmdvdXRDaGFubmVsIGFzIENoYW5uZWw7XHJcblxyXG4gIGlmICghbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzIHx8IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycy5zaXplID09PSAwKSByZXR1cm4gbWVzc2FnZS5yZXBseShcInBsZWFzZSBtZW50aW9uIGEgdXNlciB0byBnaXZlIHByaXZhdGUgYWNjZXNzIHRvXCIpO1xyXG5cclxuICBjb25zdCByb2xlTWVtYmVyID0gbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLmZpcnN0KCk7XHJcblxyXG4gIC8vYWRkIHRoZSBwcml2YXRlIHJvbGUgdG8gdGhlIG1lbWJlclxyXG4gIHJvbGVNZW1iZXI/LnJvbGVzLmFkZChwcml2YXRlUm9sZSkuY2F0Y2goZXJyID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgfSk7XHJcblxyXG4gIC8vZGVsZXRlIHRoZSBvcmlnaW5hbCBtZXNzYWdlXHJcbiAgbWVzc2FnZS5kZWxldGUoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZXJyKTtcclxuICB9KTtcclxuXHJcbiAgLy9hbGVydCB0aGUgbWVtYmVyIHRoYXQgdGhleSBhcmUgaW4gdGhlIGNoYW5uZWxcclxuICBhd2FpdCBwcml2YXRlSGFuZ291dENoYW5uZWwuc2VuZChgJHtyb2xlTWVtYmVyfSwgd2VsY29tZSB0byB0aGUgcHJpdmF0ZSBjaGFubmVsISAgQWxsIHRoZSBtZXNzYWdlcyB3aWxsIGJlIGRlbGV0ZWQgYWZ0ZXIgeW91IGhhdmUgbGVmdC5gKTtcclxuXHJcbiAgYXdhaXQgcHJpdmF0ZUhhbmdvdXRDaGFubmVsLmF3YWl0TWVzc2FnZXMoKHJlc3BvbnNlOiBNZXNzYWdlKSA9PiByZXNwb25zZS5jb250ZW50ID09PSBcIkVPRFwiLCB7XHJcbiAgICBtYXg6IDEsXHJcbiAgICB0aW1lOiA2MDAwMDAsXHJcbiAgICBlcnJvcnM6IFtcInRpbWVcIl1cclxuICB9KTtcclxuXHJcbiAgYXdhaXQgcHJpdmF0ZUhhbmdvdXRDaGFubmVsLnNlbmQoXCJUaGUgcHJpdmF0ZSBkaXNjdXNzaW9uIGhhcyBjb25jbHVkZWQsIHVzZSAhcHVyZ2UgdG8gY2xlYXIgdGhlIGNoYW5uZWwuXCIpO1xyXG5cclxuICByb2xlTWVtYmVyPy5yb2xlcy5yZW1vdmUocHJpdmF0ZVJvbGUpLmNhdGNoKGVyciA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gIH0pO1xyXG59O1xyXG4iXX0=