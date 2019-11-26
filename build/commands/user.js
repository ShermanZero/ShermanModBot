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
module.exports.props = {
    requiresElevation: "mod",
    description: "displays the member's data",
    usage: "<member>"
};
module.exports = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsb0NBQWtDO0FBSWxDLG9EQUF3QztBQUV4QyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixpQkFBaUIsRUFBRSxLQUFLO0lBQ3hCLFdBQVcsRUFBRSw0QkFBNEI7SUFDekMsS0FBSyxFQUFFLFVBQVU7Q0FDbEIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBTyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxJQUFjLEVBQUUsRUFBRTtJQUN2RSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUU1QyxJQUFJLFFBQWEsQ0FBQztJQUNsQixJQUFJLFdBQWdCLENBQUM7SUFFckIsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNULElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDcEIsV0FBVyxHQUFHLG1CQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVuRSxJQUFJLENBQUMsV0FBVztnQkFDZCxJQUFJO29CQUNGLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2lCQUNyRDtnQkFBQyxPQUFPLEdBQUcsRUFBRTtvQkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNsQjtZQUVILFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1NBQzdCOztZQUNDLElBQUk7Z0JBQ0YsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7YUFDcEQ7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BCO0tBQ0o7U0FBTTtRQUNMLFFBQVEsR0FBRyxtQkFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLFdBQVcsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDOUQ7SUFFRCxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsV0FBVztRQUMzQixJQUFJO1lBQ0YsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7U0FDckQ7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7SUFFSCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsT0FBTztTQUNaLElBQUksQ0FDSCx5QkFBeUIsUUFBUSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsSUFBSSxDQUFDLFNBQVMsQ0FDeEUsV0FBVyxFQUNYLElBQUksRUFDSixJQUFJLENBQ0wsVUFBVSxDQUNaO1NBQ0EsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9jbGFzc2VzL1N0cmluZ0hhbmRsZXInO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5cclxuaW1wb3J0IHJzcmMgZnJvbSAnLi4vY2xhc3Nlcy9SZXNvdXJjZXMnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XHJcbiAgcmVxdWlyZXNFbGV2YXRpb246IFwibW9kXCIsXHJcbiAgZGVzY3JpcHRpb246IFwiZGlzcGxheXMgdGhlIG1lbWJlcidzIGRhdGFcIixcclxuICB1c2FnZTogXCI8bWVtYmVyPlwiXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIChjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSwgYXJnczogc3RyaW5nW10pID0+IHtcclxuICBjb25zdCB1c2VyID0gbWVzc2FnZS5tZW50aW9ucy51c2Vycy5maXJzdCgpO1xyXG5cclxuICBsZXQgdXNlcm5hbWU6IGFueTtcclxuICBsZXQgdXNlckNvbnRlbnQ6IGFueTtcclxuXHJcbiAgaWYgKCF1c2VyKSB7XHJcbiAgICBpZiAoYXJncy5sZW5ndGggPT0gMSkge1xyXG4gICAgICB1c2VyQ29udGVudCA9IHJzcmMuZ2V0VXNlckNvbnRlbnRzRnJvbU5hbWUobWVzc2FnZSwgYXJnc1swXSwgdHJ1ZSk7XHJcblxyXG4gICAgICBpZiAoIXVzZXJDb250ZW50KVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcInRoYXQgdXNlciBpcyBub3QgcmVnaXN0ZXJlZFwiKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgdXNlcm5hbWUgPSB1c2VyQ29udGVudC5uYW1lO1xyXG4gICAgfSBlbHNlXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJ5b3UgbmVlZCB0byBzcGVjaWZ5IGEgdXNlclwiKTtcclxuICAgICAgfSBjYXRjaCAoZXJyXzEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJfMSk7XHJcbiAgICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgdXNlcm5hbWUgPSByc3JjLmdldFVzZXJuYW1lRnJvbU1lbWJlcih1c2VyKTtcclxuICAgIHVzZXJDb250ZW50ID0gY2xpZW50LmdldFVzZXJDb250ZW50KG1lc3NhZ2UuZ3VpbGQsIHVzZXJuYW1lKTtcclxuICB9XHJcblxyXG4gIGlmICghdXNlcm5hbWUgfHwgIXVzZXJDb250ZW50KVxyXG4gICAgdHJ5IHtcclxuICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJ0aGF0IHVzZXIgaXMgbm90IHJlZ2lzdGVyZWRcIik7XHJcbiAgICB9IGNhdGNoIChlcnJfMikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJfMik7XHJcbiAgICB9XHJcblxyXG4gIG1lc3NhZ2UuZGVsZXRlKCkuY2F0Y2goZXJyID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgfSk7XHJcblxyXG4gIG1lc3NhZ2UuY2hhbm5lbFxyXG4gICAgLnNlbmQoXHJcbiAgICAgIGBIZXJlIGlzIHRoZSBkYXRhIGZvciBbJHt1c2VybmFtZS5oaWRlSUQoKX1dXFxuXFxgXFxgXFxganNvblxcbiR7SlNPTi5zdHJpbmdpZnkoXHJcbiAgICAgICAgdXNlckNvbnRlbnQsXHJcbiAgICAgICAgbnVsbCxcclxuICAgICAgICBcIlxcdFwiXHJcbiAgICAgICl9XFxuXFxgXFxgXFxgYFxyXG4gICAgKVxyXG4gICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxufTtcclxuIl19