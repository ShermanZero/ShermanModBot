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
class priv {
    constructor() {
        this.props = {
            requiresElevation: "mod",
            description: "grants a member access to the private-hangout channel",
            usage: "<member>"
        };
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
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
            roleMember === null || roleMember === void 0 ? void 0 : roleMember.roles.add(privateRole).catch(err => {
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
            roleMember === null || roleMember === void 0 ? void 0 : roleMember.roles.remove(privateRole).catch(err => {
                console.log(err);
            });
        });
    }
}
exports.default = priv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wcml2YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsTUFBcUIsSUFBSTtJQUF6QjtRQUNFLFVBQUssR0FBRztZQUNOLGlCQUFpQixFQUFFLEtBQUs7WUFDeEIsV0FBVyxFQUFFLHVEQUF1RDtZQUNwRSxLQUFLLEVBQUUsVUFBVTtTQUNsQixDQUFDO0lBaURKLENBQUM7SUEvQ08sR0FBRyxDQUFDLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWM7O1lBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztnQkFBRSxPQUFPO1lBRTNCLElBQUksV0FBVyxHQUFRLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3JFLElBQUkscUJBQXFCLEdBQVEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUUzRSxJQUFJLFdBQVc7Z0JBQUUsV0FBVyxHQUFHLFdBQW1CLENBQUM7WUFDbkQsSUFBSSxxQkFBcUI7Z0JBQ3ZCLHFCQUFxQixHQUFHLHFCQUFnQyxDQUFDO1lBRTNELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQztnQkFDbEUsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7WUFFMUUsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFHcEQsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLEVBQUU7WUFHSCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1lBR0gsTUFBTSxxQkFBcUIsQ0FBQyxJQUFJLENBQzlCLEdBQUcsVUFBVSwwRkFBMEYsQ0FDeEcsQ0FBQztZQUVGLE1BQU0scUJBQXFCLENBQUMsYUFBYSxDQUN2QyxDQUFDLFFBQWlCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUNqRDtnQkFDRSxHQUFHLEVBQUUsQ0FBQztnQkFDTixJQUFJLEVBQUUsTUFBTTtnQkFDWixNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7YUFDakIsQ0FDRixDQUFDO1lBRUYsTUFBTSxxQkFBcUIsQ0FBQyxJQUFJLENBQzlCLHdFQUF3RSxDQUN6RSxDQUFDO1lBRUYsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLEVBQUU7UUFDTCxDQUFDO0tBQUE7Q0FDRjtBQXRERCx1QkFzREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFubmVsLCBNZXNzYWdlLCBSb2xlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwcml2IHtcclxuICBwcm9wcyA9IHtcclxuICAgIHJlcXVpcmVzRWxldmF0aW9uOiBcIm1vZFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiZ3JhbnRzIGEgbWVtYmVyIGFjY2VzcyB0byB0aGUgcHJpdmF0ZS1oYW5nb3V0IGNoYW5uZWxcIixcclxuICAgIHVzYWdlOiBcIjxtZW1iZXI+XCJcclxuICB9O1xyXG5cclxuICBhc3luYyBydW4oY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UsIGFyZ3M6IHN0cmluZ1tdKSB7XHJcbiAgICBpZiAoIW1lc3NhZ2UuZ3VpbGQpIHJldHVybjtcclxuXHJcbiAgICBsZXQgcHJpdmF0ZVJvbGU6IGFueSA9IG1lc3NhZ2UuZ3VpbGQucm9sZXMuZ2V0KFwiNjQ1NDE4NDg0Mzk4MDMwOTE4XCIpO1xyXG4gICAgbGV0IHByaXZhdGVIYW5nb3V0Q2hhbm5lbDogYW55ID0gY2xpZW50LmNoYW5uZWxzLmdldChcIjY0NTQxODM5MDk2MTI1ODUzNlwiKTtcclxuXHJcbiAgICBpZiAocHJpdmF0ZVJvbGUpIHByaXZhdGVSb2xlID0gcHJpdmF0ZVJvbGUgYXMgUm9sZTtcclxuICAgIGlmIChwcml2YXRlSGFuZ291dENoYW5uZWwpXHJcbiAgICAgIHByaXZhdGVIYW5nb3V0Q2hhbm5lbCA9IHByaXZhdGVIYW5nb3V0Q2hhbm5lbCBhcyBDaGFubmVsO1xyXG5cclxuICAgIGlmICghbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzIHx8IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycy5zaXplID09PSAwKVxyXG4gICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcInBsZWFzZSBtZW50aW9uIGEgdXNlciB0byBnaXZlIHByaXZhdGUgYWNjZXNzIHRvXCIpO1xyXG5cclxuICAgIGNvbnN0IHJvbGVNZW1iZXIgPSBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMuZmlyc3QoKTtcclxuXHJcbiAgICAvL2FkZCB0aGUgcHJpdmF0ZSByb2xlIHRvIHRoZSBtZW1iZXJcclxuICAgIHJvbGVNZW1iZXI/LnJvbGVzLmFkZChwcml2YXRlUm9sZSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vZGVsZXRlIHRoZSBvcmlnaW5hbCBtZXNzYWdlXHJcbiAgICBtZXNzYWdlLmRlbGV0ZSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2FsZXJ0IHRoZSBtZW1iZXIgdGhhdCB0aGV5IGFyZSBpbiB0aGUgY2hhbm5lbFxyXG4gICAgYXdhaXQgcHJpdmF0ZUhhbmdvdXRDaGFubmVsLnNlbmQoXHJcbiAgICAgIGAke3JvbGVNZW1iZXJ9LCB3ZWxjb21lIHRvIHRoZSBwcml2YXRlIGNoYW5uZWwhICBBbGwgdGhlIG1lc3NhZ2VzIHdpbGwgYmUgZGVsZXRlZCBhZnRlciB5b3UgaGF2ZSBsZWZ0LmBcclxuICAgICk7XHJcblxyXG4gICAgYXdhaXQgcHJpdmF0ZUhhbmdvdXRDaGFubmVsLmF3YWl0TWVzc2FnZXMoXHJcbiAgICAgIChyZXNwb25zZTogTWVzc2FnZSkgPT4gcmVzcG9uc2UuY29udGVudCA9PT0gXCJFT0RcIixcclxuICAgICAge1xyXG4gICAgICAgIG1heDogMSxcclxuICAgICAgICB0aW1lOiA2MDAwMDAsXHJcbiAgICAgICAgZXJyb3JzOiBbXCJ0aW1lXCJdXHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgYXdhaXQgcHJpdmF0ZUhhbmdvdXRDaGFubmVsLnNlbmQoXHJcbiAgICAgIFwiVGhlIHByaXZhdGUgZGlzY3Vzc2lvbiBoYXMgY29uY2x1ZGVkLCB1c2UgIXB1cmdlIHRvIGNsZWFyIHRoZSBjaGFubmVsLlwiXHJcbiAgICApO1xyXG5cclxuICAgIHJvbGVNZW1iZXI/LnJvbGVzLnJlbW92ZShwcml2YXRlUm9sZSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=