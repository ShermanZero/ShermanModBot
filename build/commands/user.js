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
const global_config_1 = require("../resources/global_config");
module.exports.props = {
    requiresElevation: global_config_1.default.elevation_names.moderator,
    description: "displays the member's data",
    usage: "<member>"
};
module.exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    const user = message.mentions.users.first();
    let username;
    let userContent;
    if (!user) {
        if (args.length == 1) {
            userContent = Resources_1.default.getUserContentsFromName(client, message, args[0], true);
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
    message.channel.send(`Here is the data for [${username.hideID()}]\n\`\`\`json\n${JSON.stringify(userContent, null, "\t")}\n\`\`\``).catch(err => {
        console.log(err);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsb0NBQWtDO0FBSWxDLG9EQUF3QztBQUN4Qyw4REFBZ0Q7QUFFaEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUc7SUFDckIsaUJBQWlCLEVBQUUsdUJBQU0sQ0FBQyxlQUFlLENBQUMsU0FBUztJQUNuRCxXQUFXLEVBQUUsNEJBQTRCO0lBQ3pDLEtBQUssRUFBRSxVQUFVO0NBQ2xCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWMsRUFBRSxFQUFFO0lBQzNFLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRTVDLElBQUksUUFBYSxDQUFDO0lBQ2xCLElBQUksV0FBZ0IsQ0FBQztJQUVyQixJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1QsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNwQixXQUFXLEdBQUcsbUJBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUUzRSxJQUFJLENBQUMsV0FBVztnQkFDZCxJQUFJO29CQUNGLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2lCQUNyRDtnQkFBQyxPQUFPLEdBQUcsRUFBRTtvQkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNsQjtZQUVILFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1NBQzdCOztZQUNDLElBQUk7Z0JBQ0YsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7YUFDcEQ7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BCO0tBQ0o7U0FBTTtRQUNMLFFBQVEsR0FBRyxtQkFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLFdBQVcsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDOUQ7SUFFRCxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsV0FBVztRQUMzQixJQUFJO1lBQ0YsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7U0FDckQ7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7SUFFSCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsUUFBUSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDOUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9jbGFzc2VzL1N0cmluZ0hhbmRsZXInO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5cclxuaW1wb3J0IHJzcmMgZnJvbSAnLi4vY2xhc3Nlcy9SZXNvdXJjZXMnO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL3Jlc291cmNlcy9nbG9iYWxfY29uZmlnJztcclxuXHJcbm1vZHVsZS5leHBvcnRzLnByb3BzID0ge1xyXG4gIHJlcXVpcmVzRWxldmF0aW9uOiBjb25maWcuZWxldmF0aW9uX25hbWVzLm1vZGVyYXRvcixcclxuICBkZXNjcmlwdGlvbjogXCJkaXNwbGF5cyB0aGUgbWVtYmVyJ3MgZGF0YVwiLFxyXG4gIHVzYWdlOiBcIjxtZW1iZXI+XCJcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLnJ1biA9IGFzeW5jIChjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSwgYXJnczogc3RyaW5nW10pID0+IHtcclxuICBjb25zdCB1c2VyID0gbWVzc2FnZS5tZW50aW9ucy51c2Vycy5maXJzdCgpO1xyXG5cclxuICBsZXQgdXNlcm5hbWU6IGFueTtcclxuICBsZXQgdXNlckNvbnRlbnQ6IGFueTtcclxuXHJcbiAgaWYgKCF1c2VyKSB7XHJcbiAgICBpZiAoYXJncy5sZW5ndGggPT0gMSkge1xyXG4gICAgICB1c2VyQ29udGVudCA9IHJzcmMuZ2V0VXNlckNvbnRlbnRzRnJvbU5hbWUoY2xpZW50LCBtZXNzYWdlLCBhcmdzWzBdLCB0cnVlKTtcclxuXHJcbiAgICAgIGlmICghdXNlckNvbnRlbnQpXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwidGhhdCB1c2VyIGlzIG5vdCByZWdpc3RlcmVkXCIpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB1c2VybmFtZSA9IHVzZXJDb250ZW50Lm5hbWU7XHJcbiAgICB9IGVsc2VcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcInlvdSBuZWVkIHRvIHNwZWNpZnkgYSB1c2VyXCIpO1xyXG4gICAgICB9IGNhdGNoIChlcnJfMSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycl8xKTtcclxuICAgICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB1c2VybmFtZSA9IHJzcmMuZ2V0VXNlcm5hbWVGcm9tTWVtYmVyKHVzZXIpO1xyXG4gICAgdXNlckNvbnRlbnQgPSBjbGllbnQuZ2V0VXNlckNvbnRlbnQobWVzc2FnZS5ndWlsZCwgdXNlcm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKCF1c2VybmFtZSB8fCAhdXNlckNvbnRlbnQpXHJcbiAgICB0cnkge1xyXG4gICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcInRoYXQgdXNlciBpcyBub3QgcmVnaXN0ZXJlZFwiKTtcclxuICAgIH0gY2F0Y2ggKGVycl8yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycl8yKTtcclxuICAgIH1cclxuXHJcbiAgbWVzc2FnZS5kZWxldGUoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZXJyKTtcclxuICB9KTtcclxuXHJcbiAgbWVzc2FnZS5jaGFubmVsLnNlbmQoYEhlcmUgaXMgdGhlIGRhdGEgZm9yIFske3VzZXJuYW1lLmhpZGVJRCgpfV1cXG5cXGBcXGBcXGBqc29uXFxuJHtKU09OLnN0cmluZ2lmeSh1c2VyQ29udGVudCwgbnVsbCwgXCJcXHRcIil9XFxuXFxgXFxgXFxgYCkuY2F0Y2goZXJyID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgfSk7XHJcbn07XHJcbiJdfQ==