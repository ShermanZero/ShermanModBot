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
    description: "bans a member from the server",
    usage: "<member> <?reason>"
};
module.exports.run = (client, message, [mention, ...reason]) => __awaiter(void 0, void 0, void 0, function* () {
    if (!message.mentions.members || message.mentions.members.size === 0)
        try {
            return message.reply("please mention a user to kick");
        }
        catch (err) {
            console.log(err);
            return;
        }
    const banMember = message.mentions.members.first();
    yield banMember.ban({ reason: reason.join(" ") });
    let modChannel = client.channels.get(client.config.channels.mod.logs);
    yield modChannel.send(`${banMember.user.username} was banned by ${message.author.tag} for reason: ${reason}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2Jhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHO0lBQ3JCLGlCQUFpQixFQUFFLEtBQUs7SUFDeEIsV0FBVyxFQUFFLCtCQUErQjtJQUM1QyxLQUFLLEVBQUUsb0JBQW9CO0NBQzVCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQVcsRUFBRSxPQUFnQixFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRTtJQUMvRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUM7UUFDbEUsSUFBSTtZQUNGLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1NBQ3ZEO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLE9BQU87U0FDUjtJQUVILE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBaUIsQ0FBQztJQUNsRSxNQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFbEQsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RFLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FDbkIsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsa0JBQWtCLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxnQkFBZ0IsTUFBTSxFQUFFLENBQ3ZGLENBQUM7QUFFTixDQUFDLENBQUEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEd1aWxkTWVtYmVyLCBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wcm9wcyA9IHtcclxuICByZXF1aXJlc0VsZXZhdGlvbjogXCJtb2RcIixcclxuICBkZXNjcmlwdGlvbjogXCJiYW5zIGEgbWVtYmVyIGZyb20gdGhlIHNlcnZlclwiLFxyXG4gIHVzYWdlOiBcIjxtZW1iZXI+IDw/cmVhc29uPlwiXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5ydW4gPSBhc3luYyAoY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UsIFttZW50aW9uLCAuLi5yZWFzb25dKSA9PiB7XHJcbiAgICBpZiAoIW1lc3NhZ2UubWVudGlvbnMubWVtYmVycyB8fCBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMuc2l6ZSA9PT0gMClcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcInBsZWFzZSBtZW50aW9uIGEgdXNlciB0byBraWNrXCIpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgIGNvbnN0IGJhbk1lbWJlciA9IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycy5maXJzdCgpIGFzIEd1aWxkTWVtYmVyO1xyXG4gICAgYXdhaXQgYmFuTWVtYmVyLmJhbih7IHJlYXNvbjogcmVhc29uLmpvaW4oXCIgXCIpIH0pO1xyXG5cclxuICAgIGxldCBtb2RDaGFubmVsID0gY2xpZW50LmNoYW5uZWxzLmdldChjbGllbnQuY29uZmlnLmNoYW5uZWxzLm1vZC5sb2dzKTtcclxuICAgIGF3YWl0IG1vZENoYW5uZWwuc2VuZChcclxuICAgICAgYCR7YmFuTWVtYmVyLnVzZXIudXNlcm5hbWV9IHdhcyBiYW5uZWQgYnkgJHttZXNzYWdlLmF1dGhvci50YWd9IGZvciByZWFzb246ICR7cmVhc29ufWBcclxuICAgICk7XHJcbiAgXHJcbn1cclxuIl19