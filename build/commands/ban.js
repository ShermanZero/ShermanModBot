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
class ban {
    constructor() {
        this.props = {
            requiresElevation: "mod",
            description: "bans a member from the server",
            usage: "<member> <?reason>"
        };
    }
    run(client, message, [mention, ...reason]) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
}
exports.default = ban;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2Jhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE1BQXFCLEdBQUc7SUFBeEI7UUFDRSxVQUFLLEdBQUc7WUFDTixpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsS0FBSyxFQUFFLG9CQUFvQjtTQUM1QixDQUFDO0lBbUJKLENBQUM7SUFqQk8sR0FBRyxDQUFDLE1BQVcsRUFBRSxPQUFnQixFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDOztZQUMzRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUM7Z0JBQ2xFLElBQUk7b0JBQ0YsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7aUJBQ3ZEO2dCQUFDLE9BQU8sR0FBRyxFQUFFO29CQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2pCLE9BQU87aUJBQ1I7WUFFSCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQWlCLENBQUM7WUFDbEUsTUFBTSxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRWxELElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RSxNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQ25CLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLGtCQUFrQixPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsZ0JBQWdCLE1BQU0sRUFBRSxDQUN2RixDQUFDO1FBQ0osQ0FBQztLQUFBO0NBQ0Y7QUF4QkQsc0JBd0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3VpbGRNZW1iZXIsIE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGJhbiB7XHJcbiAgcHJvcHMgPSB7XHJcbiAgICByZXF1aXJlc0VsZXZhdGlvbjogXCJtb2RcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcImJhbnMgYSBtZW1iZXIgZnJvbSB0aGUgc2VydmVyXCIsXHJcbiAgICB1c2FnZTogXCI8bWVtYmVyPiA8P3JlYXNvbj5cIlxyXG4gIH07XHJcblxyXG4gIGFzeW5jIHJ1bihjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSwgW21lbnRpb24sIC4uLnJlYXNvbl0pIHtcclxuICAgIGlmICghbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzIHx8IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycy5zaXplID09PSAwKVxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwicGxlYXNlIG1lbnRpb24gYSB1c2VyIHRvIGtpY2tcIik7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgY29uc3QgYmFuTWVtYmVyID0gbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLmZpcnN0KCkgYXMgR3VpbGRNZW1iZXI7XHJcbiAgICBhd2FpdCBiYW5NZW1iZXIuYmFuKHsgcmVhc29uOiByZWFzb24uam9pbihcIiBcIikgfSk7XHJcblxyXG4gICAgbGV0IG1vZENoYW5uZWwgPSBjbGllbnQuY2hhbm5lbHMuZ2V0KGNsaWVudC5jb25maWcuY2hhbm5lbHMubW9kLmxvZ3MpO1xyXG4gICAgYXdhaXQgbW9kQ2hhbm5lbC5zZW5kKFxyXG4gICAgICBgJHtiYW5NZW1iZXIudXNlci51c2VybmFtZX0gd2FzIGJhbm5lZCBieSAke21lc3NhZ2UuYXV0aG9yLnRhZ30gZm9yIHJlYXNvbjogJHtyZWFzb259YFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19