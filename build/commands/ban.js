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
module.exports = (client, message, [mention, ...reason]) => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2Jhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHO0lBQ3JCLGlCQUFpQixFQUFFLEtBQUs7SUFDeEIsV0FBVyxFQUFFLCtCQUErQjtJQUM1QyxLQUFLLEVBQUUsb0JBQW9CO0NBQzVCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLENBQU8sTUFBVyxFQUFFLE9BQWdCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFO0lBQzNFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQztRQUNsRSxJQUFJO1lBQ0YsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7U0FDdkQ7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsT0FBTztTQUNSO0lBRUgsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFpQixDQUFDO0lBQ2xFLE1BQU0sU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVsRCxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEUsTUFBTSxVQUFVLENBQUMsSUFBSSxDQUNuQixHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxrQkFBa0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLGdCQUFnQixNQUFNLEVBQUUsQ0FDdkYsQ0FBQztBQUVOLENBQUMsQ0FBQSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3VpbGRNZW1iZXIsIE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuXHJcbm1vZHVsZS5leHBvcnRzLnByb3BzID0ge1xyXG4gIHJlcXVpcmVzRWxldmF0aW9uOiBcIm1vZFwiLFxyXG4gIGRlc2NyaXB0aW9uOiBcImJhbnMgYSBtZW1iZXIgZnJvbSB0aGUgc2VydmVyXCIsXHJcbiAgdXNhZ2U6IFwiPG1lbWJlcj4gPD9yZWFzb24+XCJcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBbbWVudGlvbiwgLi4ucmVhc29uXSkgPT4ge1xyXG4gICAgaWYgKCFtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMgfHwgbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLnNpemUgPT09IDApXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJwbGVhc2UgbWVudGlvbiBhIHVzZXIgdG8ga2lja1wiKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICBjb25zdCBiYW5NZW1iZXIgPSBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMuZmlyc3QoKSBhcyBHdWlsZE1lbWJlcjtcclxuICAgIGF3YWl0IGJhbk1lbWJlci5iYW4oeyByZWFzb246IHJlYXNvbi5qb2luKFwiIFwiKSB9KTtcclxuXHJcbiAgICBsZXQgbW9kQ2hhbm5lbCA9IGNsaWVudC5jaGFubmVscy5nZXQoY2xpZW50LmNvbmZpZy5jaGFubmVscy5tb2QubG9ncyk7XHJcbiAgICBhd2FpdCBtb2RDaGFubmVsLnNlbmQoXHJcbiAgICAgIGAke2Jhbk1lbWJlci51c2VyLnVzZXJuYW1lfSB3YXMgYmFubmVkIGJ5ICR7bWVzc2FnZS5hdXRob3IudGFnfSBmb3IgcmVhc29uOiAke3JlYXNvbn1gXHJcbiAgICApO1xyXG4gIFxyXG59XHJcbiJdfQ==