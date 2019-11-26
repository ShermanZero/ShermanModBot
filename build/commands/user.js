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
    message.channel
        .send(`Here is the data for [${username.hideID()}]\n\`\`\`json\n${JSON.stringify(userContent, null, "\t")}\n\`\`\``)
        .catch(err => {
        console.log(err);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsb0NBQWtDO0FBSWxDLG9EQUF3QztBQUV4QyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixpQkFBaUIsRUFBRSxLQUFLO0lBQ3hCLFdBQVcsRUFBRSw0QkFBNEI7SUFDekMsS0FBSyxFQUFFLFVBQVU7Q0FDbEIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQU8sTUFBVyxFQUFFLE9BQWdCLEVBQUUsSUFBYyxFQUFFLEVBQUU7SUFDM0UsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFNUMsSUFBSSxRQUFhLENBQUM7SUFDbEIsSUFBSSxXQUFnQixDQUFDO0lBRXJCLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ3BCLFdBQVcsR0FBRyxtQkFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTNFLElBQUksQ0FBQyxXQUFXO2dCQUNkLElBQUk7b0JBQ0YsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7aUJBQ3JEO2dCQUFDLE9BQU8sR0FBRyxFQUFFO29CQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2xCO1lBRUgsUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7U0FDN0I7O1lBQ0MsSUFBSTtnQkFDRixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQzthQUNwRDtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEI7S0FDSjtTQUFNO1FBQ0wsUUFBUSxHQUFHLG1CQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztLQUM5RDtJQUVELElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxXQUFXO1FBQzNCLElBQUk7WUFDRixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztTQUNyRDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQjtJQUVILE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxPQUFPO1NBQ1osSUFBSSxDQUNILHlCQUF5QixRQUFRLENBQUMsTUFBTSxFQUFFLGtCQUFrQixJQUFJLENBQUMsU0FBUyxDQUN4RSxXQUFXLEVBQ1gsSUFBSSxFQUNKLElBQUksQ0FDTCxVQUFVLENBQ1o7U0FDQSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL2NsYXNzZXMvU3RyaW5nSGFuZGxlcic7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5pbXBvcnQgcnNyYyBmcm9tICcuLi9jbGFzc2VzL1Jlc291cmNlcyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wcm9wcyA9IHtcclxuICByZXF1aXJlc0VsZXZhdGlvbjogXCJtb2RcIixcclxuICBkZXNjcmlwdGlvbjogXCJkaXNwbGF5cyB0aGUgbWVtYmVyJ3MgZGF0YVwiLFxyXG4gIHVzYWdlOiBcIjxtZW1iZXI+XCJcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLnJ1biA9IGFzeW5jIChjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSwgYXJnczogc3RyaW5nW10pID0+IHtcclxuICBjb25zdCB1c2VyID0gbWVzc2FnZS5tZW50aW9ucy51c2Vycy5maXJzdCgpO1xyXG5cclxuICBsZXQgdXNlcm5hbWU6IGFueTtcclxuICBsZXQgdXNlckNvbnRlbnQ6IGFueTtcclxuXHJcbiAgaWYgKCF1c2VyKSB7XHJcbiAgICBpZiAoYXJncy5sZW5ndGggPT0gMSkge1xyXG4gICAgICB1c2VyQ29udGVudCA9IHJzcmMuZ2V0VXNlckNvbnRlbnRzRnJvbU5hbWUoY2xpZW50LCBtZXNzYWdlLCBhcmdzWzBdLCB0cnVlKTtcclxuXHJcbiAgICAgIGlmICghdXNlckNvbnRlbnQpXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwidGhhdCB1c2VyIGlzIG5vdCByZWdpc3RlcmVkXCIpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB1c2VybmFtZSA9IHVzZXJDb250ZW50Lm5hbWU7XHJcbiAgICB9IGVsc2VcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcInlvdSBuZWVkIHRvIHNwZWNpZnkgYSB1c2VyXCIpO1xyXG4gICAgICB9IGNhdGNoIChlcnJfMSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycl8xKTtcclxuICAgICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB1c2VybmFtZSA9IHJzcmMuZ2V0VXNlcm5hbWVGcm9tTWVtYmVyKHVzZXIpO1xyXG4gICAgdXNlckNvbnRlbnQgPSBjbGllbnQuZ2V0VXNlckNvbnRlbnQobWVzc2FnZS5ndWlsZCwgdXNlcm5hbWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKCF1c2VybmFtZSB8fCAhdXNlckNvbnRlbnQpXHJcbiAgICB0cnkge1xyXG4gICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcInRoYXQgdXNlciBpcyBub3QgcmVnaXN0ZXJlZFwiKTtcclxuICAgIH0gY2F0Y2ggKGVycl8yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycl8yKTtcclxuICAgIH1cclxuXHJcbiAgbWVzc2FnZS5kZWxldGUoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZXJyKTtcclxuICB9KTtcclxuXHJcbiAgbWVzc2FnZS5jaGFubmVsXHJcbiAgICAuc2VuZChcclxuICAgICAgYEhlcmUgaXMgdGhlIGRhdGEgZm9yIFske3VzZXJuYW1lLmhpZGVJRCgpfV1cXG5cXGBcXGBcXGBqc29uXFxuJHtKU09OLnN0cmluZ2lmeShcclxuICAgICAgICB1c2VyQ29udGVudCxcclxuICAgICAgICBudWxsLFxyXG4gICAgICAgIFwiXFx0XCJcclxuICAgICAgKX1cXG5cXGBcXGBcXGBgXHJcbiAgICApXHJcbiAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG59O1xyXG4iXX0=