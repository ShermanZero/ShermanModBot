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
module.exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsb0NBQWtDO0FBSWxDLG9EQUF3QztBQUV4QyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixpQkFBaUIsRUFBRSxLQUFLO0lBQ3hCLFdBQVcsRUFBRSw0QkFBNEI7SUFDekMsS0FBSyxFQUFFLFVBQVU7Q0FDbEIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQU8sTUFBVyxFQUFFLE9BQWdCLEVBQUUsSUFBYyxFQUFFLEVBQUU7SUFDM0UsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFNUMsSUFBSSxRQUFhLENBQUM7SUFDbEIsSUFBSSxXQUFnQixDQUFDO0lBRXJCLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ3BCLFdBQVcsR0FBRyxtQkFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFbkUsSUFBSSxDQUFDLFdBQVc7Z0JBQ2QsSUFBSTtvQkFDRixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztpQkFDckQ7Z0JBQUMsT0FBTyxHQUFHLEVBQUU7b0JBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDbEI7WUFFSCxRQUFRLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztTQUM3Qjs7WUFDQyxJQUFJO2dCQUNGLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2FBQ3BEO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQjtLQUNKO1NBQU07UUFDTCxRQUFRLEdBQUcsbUJBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxXQUFXLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzlEO0lBRUQsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLFdBQVc7UUFDM0IsSUFBSTtZQUNGLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1NBQ3JEO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCO0lBRUgsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLE9BQU87U0FDWixJQUFJLENBQ0gseUJBQXlCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLElBQUksQ0FBQyxTQUFTLENBQ3hFLFdBQVcsRUFDWCxJQUFJLEVBQ0osSUFBSSxDQUNMLFVBQVUsQ0FDWjtTQUNBLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vY2xhc3Nlcy9TdHJpbmdIYW5kbGVyJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuXHJcbmltcG9ydCByc3JjIGZyb20gJy4uL2NsYXNzZXMvUmVzb3VyY2VzJztcclxuXHJcbm1vZHVsZS5leHBvcnRzLnByb3BzID0ge1xyXG4gIHJlcXVpcmVzRWxldmF0aW9uOiBcIm1vZFwiLFxyXG4gIGRlc2NyaXB0aW9uOiBcImRpc3BsYXlzIHRoZSBtZW1iZXIncyBkYXRhXCIsXHJcbiAgdXNhZ2U6IFwiPG1lbWJlcj5cIlxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMucnVuID0gYXN5bmMgKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkgPT4ge1xyXG4gIGNvbnN0IHVzZXIgPSBtZXNzYWdlLm1lbnRpb25zLnVzZXJzLmZpcnN0KCk7XHJcblxyXG4gIGxldCB1c2VybmFtZTogYW55O1xyXG4gIGxldCB1c2VyQ29udGVudDogYW55O1xyXG5cclxuICBpZiAoIXVzZXIpIHtcclxuICAgIGlmIChhcmdzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgIHVzZXJDb250ZW50ID0gcnNyYy5nZXRVc2VyQ29udGVudHNGcm9tTmFtZShtZXNzYWdlLCBhcmdzWzBdLCB0cnVlKTtcclxuXHJcbiAgICAgIGlmICghdXNlckNvbnRlbnQpXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwidGhhdCB1c2VyIGlzIG5vdCByZWdpc3RlcmVkXCIpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB1c2VybmFtZSA9IHVzZXJDb250ZW50Lm5hbWU7XHJcbiAgICB9IGVsc2VcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcInlvdSBuZWVkIHRvIHNwZWNpZnkgYSB1c2VyXCIpO1xyXG4gICAgICB9IGNhdGNoIChlcnJfMSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycl8xKTtcclxuICAgICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB1c2VybmFtZSA9IHJzcmMuZ2V0VXNlcm5hbWVGcm9tTWVtYmVyKHVzZXIpO1xyXG4gICAgdXNlckNvbnRlbnQgPSBjbGllbnQuZ2V0VXNlckNvbnRlbnQobWVzc2FnZS5ndWlsZCwgdXNlcm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKCF1c2VybmFtZSB8fCAhdXNlckNvbnRlbnQpXHJcbiAgICB0cnkge1xyXG4gICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcInRoYXQgdXNlciBpcyBub3QgcmVnaXN0ZXJlZFwiKTtcclxuICAgIH0gY2F0Y2ggKGVycl8yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycl8yKTtcclxuICAgIH1cclxuXHJcbiAgbWVzc2FnZS5kZWxldGUoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZXJyKTtcclxuICB9KTtcclxuXHJcbiAgbWVzc2FnZS5jaGFubmVsXHJcbiAgICAuc2VuZChcclxuICAgICAgYEhlcmUgaXMgdGhlIGRhdGEgZm9yIFske3VzZXJuYW1lLmhpZGVJRCgpfV1cXG5cXGBcXGBcXGBqc29uXFxuJHtKU09OLnN0cmluZ2lmeShcclxuICAgICAgICB1c2VyQ29udGVudCxcclxuICAgICAgICBudWxsLFxyXG4gICAgICAgIFwiXFx0XCJcclxuICAgICAgKX1cXG5cXGBcXGBcXGBgXHJcbiAgICApXHJcbiAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG59O1xyXG4iXX0=