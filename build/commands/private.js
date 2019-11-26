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
module.exports.props = {
    requiresElevation: "mod",
    description: "grants a member access to the private-hangout channel",
    usage: "<member>"
};
module.exports = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wcml2YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUc7SUFDckIsaUJBQWlCLEVBQUUsS0FBSztJQUN4QixXQUFXLEVBQUUsdURBQXVEO0lBQ3BFLEtBQUssRUFBRSxVQUFVO0NBQ2xCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLENBQU8sTUFBVyxFQUFFLE9BQWdCLEVBQUUsSUFBYyxFQUFFLEVBQUU7O0lBQ3ZFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztRQUFFLE9BQU87SUFFM0IsSUFBSSxXQUFXLEdBQVEsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDckUsSUFBSSxxQkFBcUIsR0FBUSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBRTNFLElBQUksV0FBVztRQUFFLFdBQVcsR0FBRyxXQUFtQixDQUFDO0lBQ25ELElBQUkscUJBQXFCO1FBQ3ZCLHFCQUFxQixHQUFHLHFCQUFnQyxDQUFDO0lBRTNELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQztRQUNsRSxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztJQUUxRSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUdwRCxNQUFBLFVBQVUsMENBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxFQUFFO0lBR0gsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBR0gsTUFBTSxxQkFBcUIsQ0FBQyxJQUFJLENBQzlCLEdBQUcsVUFBVSwwRkFBMEYsQ0FDeEcsQ0FBQztJQUVGLE1BQU0scUJBQXFCLENBQUMsYUFBYSxDQUN2QyxDQUFDLFFBQWlCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUNqRDtRQUNFLEdBQUcsRUFBRSxDQUFDO1FBQ04sSUFBSSxFQUFFLE1BQU07UUFDWixNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7S0FDakIsQ0FDRixDQUFDO0lBRUYsTUFBTSxxQkFBcUIsQ0FBQyxJQUFJLENBQzlCLHdFQUF3RSxDQUN6RSxDQUFDO0lBRUYsTUFBQSxVQUFVLDBDQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUMsRUFBRTtBQUNMLENBQUMsQ0FBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbm5lbCwgTWVzc2FnZSwgUm9sZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XHJcbiAgcmVxdWlyZXNFbGV2YXRpb246IFwibW9kXCIsXHJcbiAgZGVzY3JpcHRpb246IFwiZ3JhbnRzIGEgbWVtYmVyIGFjY2VzcyB0byB0aGUgcHJpdmF0ZS1oYW5nb3V0IGNoYW5uZWxcIixcclxuICB1c2FnZTogXCI8bWVtYmVyPlwiXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIChjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSwgYXJnczogc3RyaW5nW10pID0+IHtcclxuICBpZiAoIW1lc3NhZ2UuZ3VpbGQpIHJldHVybjtcclxuXHJcbiAgbGV0IHByaXZhdGVSb2xlOiBhbnkgPSBtZXNzYWdlLmd1aWxkLnJvbGVzLmdldChcIjY0NTQxODQ4NDM5ODAzMDkxOFwiKTtcclxuICBsZXQgcHJpdmF0ZUhhbmdvdXRDaGFubmVsOiBhbnkgPSBjbGllbnQuY2hhbm5lbHMuZ2V0KFwiNjQ1NDE4MzkwOTYxMjU4NTM2XCIpO1xyXG5cclxuICBpZiAocHJpdmF0ZVJvbGUpIHByaXZhdGVSb2xlID0gcHJpdmF0ZVJvbGUgYXMgUm9sZTtcclxuICBpZiAocHJpdmF0ZUhhbmdvdXRDaGFubmVsKVxyXG4gICAgcHJpdmF0ZUhhbmdvdXRDaGFubmVsID0gcHJpdmF0ZUhhbmdvdXRDaGFubmVsIGFzIENoYW5uZWw7XHJcblxyXG4gIGlmICghbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzIHx8IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycy5zaXplID09PSAwKVxyXG4gICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJwbGVhc2UgbWVudGlvbiBhIHVzZXIgdG8gZ2l2ZSBwcml2YXRlIGFjY2VzcyB0b1wiKTtcclxuXHJcbiAgY29uc3Qgcm9sZU1lbWJlciA9IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycy5maXJzdCgpO1xyXG5cclxuICAvL2FkZCB0aGUgcHJpdmF0ZSByb2xlIHRvIHRoZSBtZW1iZXJcclxuICByb2xlTWVtYmVyPy5yb2xlcy5hZGQocHJpdmF0ZVJvbGUpLmNhdGNoKGVyciA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gIH0pO1xyXG5cclxuICAvL2RlbGV0ZSB0aGUgb3JpZ2luYWwgbWVzc2FnZVxyXG4gIG1lc3NhZ2UuZGVsZXRlKCkuY2F0Y2goZXJyID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgfSk7XHJcblxyXG4gIC8vYWxlcnQgdGhlIG1lbWJlciB0aGF0IHRoZXkgYXJlIGluIHRoZSBjaGFubmVsXHJcbiAgYXdhaXQgcHJpdmF0ZUhhbmdvdXRDaGFubmVsLnNlbmQoXHJcbiAgICBgJHtyb2xlTWVtYmVyfSwgd2VsY29tZSB0byB0aGUgcHJpdmF0ZSBjaGFubmVsISAgQWxsIHRoZSBtZXNzYWdlcyB3aWxsIGJlIGRlbGV0ZWQgYWZ0ZXIgeW91IGhhdmUgbGVmdC5gXHJcbiAgKTtcclxuXHJcbiAgYXdhaXQgcHJpdmF0ZUhhbmdvdXRDaGFubmVsLmF3YWl0TWVzc2FnZXMoXHJcbiAgICAocmVzcG9uc2U6IE1lc3NhZ2UpID0+IHJlc3BvbnNlLmNvbnRlbnQgPT09IFwiRU9EXCIsXHJcbiAgICB7XHJcbiAgICAgIG1heDogMSxcclxuICAgICAgdGltZTogNjAwMDAwLFxyXG4gICAgICBlcnJvcnM6IFtcInRpbWVcIl1cclxuICAgIH1cclxuICApO1xyXG5cclxuICBhd2FpdCBwcml2YXRlSGFuZ291dENoYW5uZWwuc2VuZChcclxuICAgIFwiVGhlIHByaXZhdGUgZGlzY3Vzc2lvbiBoYXMgY29uY2x1ZGVkLCB1c2UgIXB1cmdlIHRvIGNsZWFyIHRoZSBjaGFubmVsLlwiXHJcbiAgKTtcclxuXHJcbiAgcm9sZU1lbWJlcj8ucm9sZXMucmVtb3ZlKHByaXZhdGVSb2xlKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZXJyKTtcclxuICB9KTtcclxufTtcclxuIl19