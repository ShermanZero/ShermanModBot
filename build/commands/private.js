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
        var _a, _b;
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
    }
}
exports.default = priv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wcml2YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsTUFBcUIsSUFBSTtJQUF6QjtRQUNFLFVBQUssR0FBRztZQUNOLGlCQUFpQixFQUFFLEtBQUs7WUFDeEIsV0FBVyxFQUFFLHVEQUF1RDtZQUNwRSxLQUFLLEVBQUUsVUFBVTtTQUNsQixDQUFDO0lBaURKLENBQUM7SUEvQ08sR0FBRyxDQUFDLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWM7OztZQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7Z0JBQUUsT0FBTztZQUUzQixJQUFJLFdBQVcsR0FBUSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNyRSxJQUFJLHFCQUFxQixHQUFRLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFFM0UsSUFBSSxXQUFXO2dCQUFFLFdBQVcsR0FBRyxXQUFtQixDQUFDO1lBQ25ELElBQUkscUJBQXFCO2dCQUN2QixxQkFBcUIsR0FBRyxxQkFBZ0MsQ0FBQztZQUUzRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUM7Z0JBQ2xFLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO1lBRTFFLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBR3BELE1BQUEsVUFBVSwwQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxFQUFFO1lBR0gsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztZQUdILE1BQU0scUJBQXFCLENBQUMsSUFBSSxDQUM5QixHQUFHLFVBQVUsMEZBQTBGLENBQ3hHLENBQUM7WUFFRixNQUFNLHFCQUFxQixDQUFDLGFBQWEsQ0FDdkMsQ0FBQyxRQUFpQixFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLEtBQUssRUFDakQ7Z0JBQ0UsR0FBRyxFQUFFLENBQUM7Z0JBQ04sSUFBSSxFQUFFLE1BQU07Z0JBQ1osTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDO2FBQ2pCLENBQ0YsQ0FBQztZQUVGLE1BQU0scUJBQXFCLENBQUMsSUFBSSxDQUM5Qix3RUFBd0UsQ0FDekUsQ0FBQztZQUVGLE1BQUEsVUFBVSwwQ0FBRSxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxFQUFFOztLQUNKO0NBQ0Y7QUF0REQsdUJBc0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbm5lbCwgTWVzc2FnZSwgUm9sZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcHJpdiB7XHJcbiAgcHJvcHMgPSB7XHJcbiAgICByZXF1aXJlc0VsZXZhdGlvbjogXCJtb2RcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcImdyYW50cyBhIG1lbWJlciBhY2Nlc3MgdG8gdGhlIHByaXZhdGUtaGFuZ291dCBjaGFubmVsXCIsXHJcbiAgICB1c2FnZTogXCI8bWVtYmVyPlwiXHJcbiAgfTtcclxuXHJcbiAgYXN5bmMgcnVuKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkge1xyXG4gICAgaWYgKCFtZXNzYWdlLmd1aWxkKSByZXR1cm47XHJcblxyXG4gICAgbGV0IHByaXZhdGVSb2xlOiBhbnkgPSBtZXNzYWdlLmd1aWxkLnJvbGVzLmdldChcIjY0NTQxODQ4NDM5ODAzMDkxOFwiKTtcclxuICAgIGxldCBwcml2YXRlSGFuZ291dENoYW5uZWw6IGFueSA9IGNsaWVudC5jaGFubmVscy5nZXQoXCI2NDU0MTgzOTA5NjEyNTg1MzZcIik7XHJcblxyXG4gICAgaWYgKHByaXZhdGVSb2xlKSBwcml2YXRlUm9sZSA9IHByaXZhdGVSb2xlIGFzIFJvbGU7XHJcbiAgICBpZiAocHJpdmF0ZUhhbmdvdXRDaGFubmVsKVxyXG4gICAgICBwcml2YXRlSGFuZ291dENoYW5uZWwgPSBwcml2YXRlSGFuZ291dENoYW5uZWwgYXMgQ2hhbm5lbDtcclxuXHJcbiAgICBpZiAoIW1lc3NhZ2UubWVudGlvbnMubWVtYmVycyB8fCBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMuc2l6ZSA9PT0gMClcclxuICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJwbGVhc2UgbWVudGlvbiBhIHVzZXIgdG8gZ2l2ZSBwcml2YXRlIGFjY2VzcyB0b1wiKTtcclxuXHJcbiAgICBjb25zdCByb2xlTWVtYmVyID0gbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLmZpcnN0KCk7XHJcblxyXG4gICAgLy9hZGQgdGhlIHByaXZhdGUgcm9sZSB0byB0aGUgbWVtYmVyXHJcbiAgICByb2xlTWVtYmVyPy5yb2xlcy5hZGQocHJpdmF0ZVJvbGUpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2RlbGV0ZSB0aGUgb3JpZ2luYWwgbWVzc2FnZVxyXG4gICAgbWVzc2FnZS5kZWxldGUoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9hbGVydCB0aGUgbWVtYmVyIHRoYXQgdGhleSBhcmUgaW4gdGhlIGNoYW5uZWxcclxuICAgIGF3YWl0IHByaXZhdGVIYW5nb3V0Q2hhbm5lbC5zZW5kKFxyXG4gICAgICBgJHtyb2xlTWVtYmVyfSwgd2VsY29tZSB0byB0aGUgcHJpdmF0ZSBjaGFubmVsISAgQWxsIHRoZSBtZXNzYWdlcyB3aWxsIGJlIGRlbGV0ZWQgYWZ0ZXIgeW91IGhhdmUgbGVmdC5gXHJcbiAgICApO1xyXG5cclxuICAgIGF3YWl0IHByaXZhdGVIYW5nb3V0Q2hhbm5lbC5hd2FpdE1lc3NhZ2VzKFxyXG4gICAgICAocmVzcG9uc2U6IE1lc3NhZ2UpID0+IHJlc3BvbnNlLmNvbnRlbnQgPT09IFwiRU9EXCIsXHJcbiAgICAgIHtcclxuICAgICAgICBtYXg6IDEsXHJcbiAgICAgICAgdGltZTogNjAwMDAwLFxyXG4gICAgICAgIGVycm9yczogW1widGltZVwiXVxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGF3YWl0IHByaXZhdGVIYW5nb3V0Q2hhbm5lbC5zZW5kKFxyXG4gICAgICBcIlRoZSBwcml2YXRlIGRpc2N1c3Npb24gaGFzIGNvbmNsdWRlZCwgdXNlICFwdXJnZSB0byBjbGVhciB0aGUgY2hhbm5lbC5cIlxyXG4gICAgKTtcclxuXHJcbiAgICByb2xlTWVtYmVyPy5yb2xlcy5yZW1vdmUocHJpdmF0ZVJvbGUpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19