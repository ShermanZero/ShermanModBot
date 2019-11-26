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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wcml2YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUc7SUFDckIsaUJBQWlCLEVBQUUsS0FBSztJQUN4QixXQUFXLEVBQUUsdURBQXVEO0lBQ3BFLEtBQUssRUFBRSxVQUFVO0NBQ2xCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWMsRUFBRSxFQUFFOztJQUMzRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7UUFBRSxPQUFPO0lBRTNCLElBQUksV0FBVyxHQUFRLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3JFLElBQUkscUJBQXFCLEdBQVEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUUzRSxJQUFJLFdBQVc7UUFBRSxXQUFXLEdBQUcsV0FBbUIsQ0FBQztJQUNuRCxJQUFJLHFCQUFxQjtRQUN2QixxQkFBcUIsR0FBRyxxQkFBZ0MsQ0FBQztJQUUzRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUM7UUFDbEUsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7SUFFMUUsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFHcEQsTUFBQSxVQUFVLDBDQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUMsRUFBRTtJQUdILE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUdILE1BQU0scUJBQXFCLENBQUMsSUFBSSxDQUM5QixHQUFHLFVBQVUsMEZBQTBGLENBQ3hHLENBQUM7SUFFRixNQUFNLHFCQUFxQixDQUFDLGFBQWEsQ0FDdkMsQ0FBQyxRQUFpQixFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLEtBQUssRUFDakQ7UUFDRSxHQUFHLEVBQUUsQ0FBQztRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDO0tBQ2pCLENBQ0YsQ0FBQztJQUVGLE1BQU0scUJBQXFCLENBQUMsSUFBSSxDQUM5Qix3RUFBd0UsQ0FDekUsQ0FBQztJQUVGLE1BQUEsVUFBVSwwQ0FBRSxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDLEVBQUU7QUFDTCxDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5uZWwsIE1lc3NhZ2UsIFJvbGUgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuXHJcbm1vZHVsZS5leHBvcnRzLnByb3BzID0ge1xyXG4gIHJlcXVpcmVzRWxldmF0aW9uOiBcIm1vZFwiLFxyXG4gIGRlc2NyaXB0aW9uOiBcImdyYW50cyBhIG1lbWJlciBhY2Nlc3MgdG8gdGhlIHByaXZhdGUtaGFuZ291dCBjaGFubmVsXCIsXHJcbiAgdXNhZ2U6IFwiPG1lbWJlcj5cIlxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMucnVuID0gYXN5bmMgKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkgPT4ge1xyXG4gIGlmICghbWVzc2FnZS5ndWlsZCkgcmV0dXJuO1xyXG5cclxuICBsZXQgcHJpdmF0ZVJvbGU6IGFueSA9IG1lc3NhZ2UuZ3VpbGQucm9sZXMuZ2V0KFwiNjQ1NDE4NDg0Mzk4MDMwOTE4XCIpO1xyXG4gIGxldCBwcml2YXRlSGFuZ291dENoYW5uZWw6IGFueSA9IGNsaWVudC5jaGFubmVscy5nZXQoXCI2NDU0MTgzOTA5NjEyNTg1MzZcIik7XHJcblxyXG4gIGlmIChwcml2YXRlUm9sZSkgcHJpdmF0ZVJvbGUgPSBwcml2YXRlUm9sZSBhcyBSb2xlO1xyXG4gIGlmIChwcml2YXRlSGFuZ291dENoYW5uZWwpXHJcbiAgICBwcml2YXRlSGFuZ291dENoYW5uZWwgPSBwcml2YXRlSGFuZ291dENoYW5uZWwgYXMgQ2hhbm5lbDtcclxuXHJcbiAgaWYgKCFtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMgfHwgbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLnNpemUgPT09IDApXHJcbiAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcInBsZWFzZSBtZW50aW9uIGEgdXNlciB0byBnaXZlIHByaXZhdGUgYWNjZXNzIHRvXCIpO1xyXG5cclxuICBjb25zdCByb2xlTWVtYmVyID0gbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLmZpcnN0KCk7XHJcblxyXG4gIC8vYWRkIHRoZSBwcml2YXRlIHJvbGUgdG8gdGhlIG1lbWJlclxyXG4gIHJvbGVNZW1iZXI/LnJvbGVzLmFkZChwcml2YXRlUm9sZSkuY2F0Y2goZXJyID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgfSk7XHJcblxyXG4gIC8vZGVsZXRlIHRoZSBvcmlnaW5hbCBtZXNzYWdlXHJcbiAgbWVzc2FnZS5kZWxldGUoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZXJyKTtcclxuICB9KTtcclxuXHJcbiAgLy9hbGVydCB0aGUgbWVtYmVyIHRoYXQgdGhleSBhcmUgaW4gdGhlIGNoYW5uZWxcclxuICBhd2FpdCBwcml2YXRlSGFuZ291dENoYW5uZWwuc2VuZChcclxuICAgIGAke3JvbGVNZW1iZXJ9LCB3ZWxjb21lIHRvIHRoZSBwcml2YXRlIGNoYW5uZWwhICBBbGwgdGhlIG1lc3NhZ2VzIHdpbGwgYmUgZGVsZXRlZCBhZnRlciB5b3UgaGF2ZSBsZWZ0LmBcclxuICApO1xyXG5cclxuICBhd2FpdCBwcml2YXRlSGFuZ291dENoYW5uZWwuYXdhaXRNZXNzYWdlcyhcclxuICAgIChyZXNwb25zZTogTWVzc2FnZSkgPT4gcmVzcG9uc2UuY29udGVudCA9PT0gXCJFT0RcIixcclxuICAgIHtcclxuICAgICAgbWF4OiAxLFxyXG4gICAgICB0aW1lOiA2MDAwMDAsXHJcbiAgICAgIGVycm9yczogW1widGltZVwiXVxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIGF3YWl0IHByaXZhdGVIYW5nb3V0Q2hhbm5lbC5zZW5kKFxyXG4gICAgXCJUaGUgcHJpdmF0ZSBkaXNjdXNzaW9uIGhhcyBjb25jbHVkZWQsIHVzZSAhcHVyZ2UgdG8gY2xlYXIgdGhlIGNoYW5uZWwuXCJcclxuICApO1xyXG5cclxuICByb2xlTWVtYmVyPy5yb2xlcy5yZW1vdmUocHJpdmF0ZVJvbGUpLmNhdGNoKGVyciA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gIH0pO1xyXG59O1xyXG4iXX0=