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
require("../classes/StringHandler");
const Resources_1 = require("../classes/Resources");
class user {
    constructor() {
        this.props = {
            requiresElevation: "mod",
            description: "displays the member's data",
            usage: "<member>"
        };
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = message.mentions.users.first();
            let username;
            let userContent;
            if (!user) {
                if (args.length == 1) {
                    userContent = Resources_1.default.getUserContentsFromName(message, args[0], true);
                    if (!userContent)
                        try {
                            return message.reply("that user is not registered");
                        }
                        catch (err) {
                            console.log(err);
                        }
                    username = userContent.name;
                }
                else
                    try {
                        return message.reply("you need to specify a user");
                    }
                    catch (err_1) {
                        console.log(err_1);
                    }
            }
            else {
                username = Resources_1.default.getUsernameFromMember(user);
                userContent = client.getUserContent(message.guild, username);
            }
            if (!username || !userContent)
                try {
                    return message.reply("that user is not registered");
                }
                catch (err_2) {
                    console.log(err_2);
                }
            message.delete().catch(err => {
                console.log(err);
            });
            message.channel
                .send(`Here is the data for [${username.hideID()}]\n\`\`\`json\n${JSON.stringify(userContent, null, "\t")}\n\`\`\``)
                .catch(err => {
                console.log(err);
            });
        });
    }
}
exports.default = user;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsb0NBQWtDO0FBSWxDLG9EQUF3QztBQUV4QyxNQUFxQixJQUFJO0lBQXpCO1FBQ0UsVUFBSyxHQUFHO1lBQ04saUJBQWlCLEVBQUUsS0FBSztZQUN4QixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLEtBQUssRUFBRSxVQUFVO1NBQ2xCLENBQUM7SUFzREosQ0FBQztJQXBETyxHQUFHLENBQUMsTUFBVyxFQUFFLE9BQWdCLEVBQUUsSUFBYzs7WUFDckQsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFNUMsSUFBSSxRQUFhLENBQUM7WUFDbEIsSUFBSSxXQUFnQixDQUFDO1lBRXJCLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1QsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtvQkFDcEIsV0FBVyxHQUFHLG1CQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFFbkUsSUFBSSxDQUFDLFdBQVc7d0JBQ2QsSUFBSTs0QkFDRixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQzt5QkFDckQ7d0JBQUMsT0FBTyxHQUFHLEVBQUU7NEJBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDbEI7b0JBRUgsUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7aUJBQzdCOztvQkFDQyxJQUFJO3dCQUNGLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO3FCQUNwRDtvQkFBQyxPQUFPLEtBQUssRUFBRTt3QkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNwQjthQUNKO2lCQUFNO2dCQUNMLFFBQVEsR0FBRyxtQkFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QyxXQUFXLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzlEO1lBRUQsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLFdBQVc7Z0JBQzNCLElBQUk7b0JBQ0YsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7aUJBQ3JEO2dCQUFDLE9BQU8sS0FBSyxFQUFFO29CQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3BCO1lBRUgsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxPQUFPO2lCQUNaLElBQUksQ0FDSCx5QkFBeUIsUUFBUSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsSUFBSSxDQUFDLFNBQVMsQ0FDeEUsV0FBVyxFQUNYLElBQUksRUFDSixJQUFJLENBQ0wsVUFBVSxDQUNaO2lCQUNBLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0NBQ0Y7QUEzREQsdUJBMkRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9jbGFzc2VzL1N0cmluZ0hhbmRsZXInO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5cclxuaW1wb3J0IHJzcmMgZnJvbSAnLi4vY2xhc3Nlcy9SZXNvdXJjZXMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdXNlciB7XHJcbiAgcHJvcHMgPSB7XHJcbiAgICByZXF1aXJlc0VsZXZhdGlvbjogXCJtb2RcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcImRpc3BsYXlzIHRoZSBtZW1iZXIncyBkYXRhXCIsXHJcbiAgICB1c2FnZTogXCI8bWVtYmVyPlwiXHJcbiAgfTtcclxuXHJcbiAgYXN5bmMgcnVuKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkge1xyXG4gICAgY29uc3QgdXNlciA9IG1lc3NhZ2UubWVudGlvbnMudXNlcnMuZmlyc3QoKTtcclxuXHJcbiAgICBsZXQgdXNlcm5hbWU6IGFueTtcclxuICAgIGxldCB1c2VyQ29udGVudDogYW55O1xyXG5cclxuICAgIGlmICghdXNlcikge1xyXG4gICAgICBpZiAoYXJncy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgIHVzZXJDb250ZW50ID0gcnNyYy5nZXRVc2VyQ29udGVudHNGcm9tTmFtZShtZXNzYWdlLCBhcmdzWzBdLCB0cnVlKTtcclxuXHJcbiAgICAgICAgaWYgKCF1c2VyQ29udGVudClcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwidGhhdCB1c2VyIGlzIG5vdCByZWdpc3RlcmVkXCIpO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIHVzZXJuYW1lID0gdXNlckNvbnRlbnQubmFtZTtcclxuICAgICAgfSBlbHNlXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwieW91IG5lZWQgdG8gc3BlY2lmeSBhIHVzZXJcIik7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyXzEpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycl8xKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB1c2VybmFtZSA9IHJzcmMuZ2V0VXNlcm5hbWVGcm9tTWVtYmVyKHVzZXIpO1xyXG4gICAgICB1c2VyQ29udGVudCA9IGNsaWVudC5nZXRVc2VyQ29udGVudChtZXNzYWdlLmd1aWxkLCB1c2VybmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF1c2VybmFtZSB8fCAhdXNlckNvbnRlbnQpXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJ0aGF0IHVzZXIgaXMgbm90IHJlZ2lzdGVyZWRcIik7XHJcbiAgICAgIH0gY2F0Y2ggKGVycl8yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyXzIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgbWVzc2FnZS5kZWxldGUoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbWVzc2FnZS5jaGFubmVsXHJcbiAgICAgIC5zZW5kKFxyXG4gICAgICAgIGBIZXJlIGlzIHRoZSBkYXRhIGZvciBbJHt1c2VybmFtZS5oaWRlSUQoKX1dXFxuXFxgXFxgXFxganNvblxcbiR7SlNPTi5zdHJpbmdpZnkoXHJcbiAgICAgICAgICB1c2VyQ29udGVudCxcclxuICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICBcIlxcdFwiXHJcbiAgICAgICAgKX1cXG5cXGBcXGBcXGBgXHJcbiAgICAgIClcclxuICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==