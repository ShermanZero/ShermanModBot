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
const fs = require("fs");
const path = require("path");
const Resources_1 = require("../classes/Resources");
module.exports.props = {
    requiresElevation: "mod",
    description: "displays the last number of messages a member has posted",
    usage: "<amount> <member>"
};
module.exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    const user = message.mentions.users.first();
    if (!user)
        return message.reply("you need to specify a user").catch(err => {
            console.log(err);
        });
    let username = Resources_1.default.getUsernameFromMember(user);
    let file = path.join(Resources_1.default.getUserDirectoryFromGuild(message.guild, username), "logs", client.config.files.log_all);
    let amount = !!parseInt(args[1]) ? parseInt(args[1]) : parseInt(args[2]);
    if (!amount || amount > 100)
        amount = 100;
    if (amount < 1)
        amount = 1;
    let logs;
    fs.readFile(file, "utf8", (error, data) => {
        let content = client.getUserContent(message.guild, username);
        if (content.userLog.length !== 0)
            data
                ? (data += content.userLog.join(""))
                : (data = content.userLog.join(""));
        if (error && !data)
            return message.reply("that user does not have a log file");
        logs = data.split("\n");
        if (logs[logs.length - 1].trim() === "")
            logs = logs.slice(0, -1);
        if (amount > logs.length)
            amount = logs.length;
        logs = logs.slice(-amount);
        let result = amount == 1 ? logs[0] : logs.join("\n");
        message.channel.send(`Here are the last ${amount} message(s) [${username.hideID()}] sent:\n${result}`, { split: true });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG9DQUFrQztBQUdsQyx5QkFBeUI7QUFDekIsNkJBQTZCO0FBRTdCLG9EQUF3QztBQUV4QyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixpQkFBaUIsRUFBRSxLQUFLO0lBQ3hCLFdBQVcsRUFBRSwwREFBMEQ7SUFDdkUsS0FBSyxFQUFFLG1CQUFtQjtDQUMzQixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBTyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxJQUFjLEVBQUUsRUFBRTtJQUMzRSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUU1QyxJQUFJLENBQUMsSUFBSTtRQUNQLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM3RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBRUwsSUFBSSxRQUFRLEdBQUcsbUJBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUNsQixtQkFBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxLQUFjLEVBQUUsUUFBUSxDQUFDLEVBQ2hFLE1BQU0sRUFDTixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQzVCLENBQUM7SUFFRixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV6RSxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sR0FBRyxHQUFHO1FBQUUsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUMxQyxJQUFJLE1BQU0sR0FBRyxDQUFDO1FBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUUzQixJQUFJLElBQVMsQ0FBQztJQUVkLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN4QyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFN0QsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQzlCLElBQUk7Z0JBQ0YsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNwQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV4QyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUk7WUFDaEIsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFFN0QsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU07WUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUUvQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDbEIscUJBQXFCLE1BQU0sZ0JBQWdCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsWUFBWSxNQUFNLEVBQUUsRUFDaEYsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQ2hCLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9jbGFzc2VzL1N0cmluZ0hhbmRsZXInO1xyXG5cclxuaW1wb3J0IHsgR3VpbGQsIE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuaW1wb3J0IHJzcmMgZnJvbSAnLi4vY2xhc3Nlcy9SZXNvdXJjZXMnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XHJcbiAgcmVxdWlyZXNFbGV2YXRpb246IFwibW9kXCIsXHJcbiAgZGVzY3JpcHRpb246IFwiZGlzcGxheXMgdGhlIGxhc3QgbnVtYmVyIG9mIG1lc3NhZ2VzIGEgbWVtYmVyIGhhcyBwb3N0ZWRcIixcclxuICB1c2FnZTogXCI8YW1vdW50PiA8bWVtYmVyPlwiXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5ydW4gPSBhc3luYyAoY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UsIGFyZ3M6IHN0cmluZ1tdKSA9PiB7XHJcbiAgY29uc3QgdXNlciA9IG1lc3NhZ2UubWVudGlvbnMudXNlcnMuZmlyc3QoKTtcclxuXHJcbiAgaWYgKCF1c2VyKVxyXG4gICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJ5b3UgbmVlZCB0byBzcGVjaWZ5IGEgdXNlclwiKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcblxyXG4gIGxldCB1c2VybmFtZSA9IHJzcmMuZ2V0VXNlcm5hbWVGcm9tTWVtYmVyKHVzZXIpO1xyXG4gIGxldCBmaWxlID0gcGF0aC5qb2luKFxyXG4gICAgcnNyYy5nZXRVc2VyRGlyZWN0b3J5RnJvbUd1aWxkKG1lc3NhZ2UuZ3VpbGQgYXMgR3VpbGQsIHVzZXJuYW1lKSxcclxuICAgIFwibG9nc1wiLFxyXG4gICAgY2xpZW50LmNvbmZpZy5maWxlcy5sb2dfYWxsXHJcbiAgKTtcclxuICAvL3BhcnNlIGFtb3VudFxyXG4gIGxldCBhbW91bnQgPSAhIXBhcnNlSW50KGFyZ3NbMV0pID8gcGFyc2VJbnQoYXJnc1sxXSkgOiBwYXJzZUludChhcmdzWzJdKTtcclxuXHJcbiAgaWYgKCFhbW91bnQgfHwgYW1vdW50ID4gMTAwKSBhbW91bnQgPSAxMDA7XHJcbiAgaWYgKGFtb3VudCA8IDEpIGFtb3VudCA9IDE7XHJcblxyXG4gIGxldCBsb2dzOiBhbnk7XHJcblxyXG4gIGZzLnJlYWRGaWxlKGZpbGUsIFwidXRmOFwiLCAoZXJyb3IsIGRhdGEpID0+IHtcclxuICAgIGxldCBjb250ZW50ID0gY2xpZW50LmdldFVzZXJDb250ZW50KG1lc3NhZ2UuZ3VpbGQsIHVzZXJuYW1lKTtcclxuXHJcbiAgICBpZiAoY29udGVudC51c2VyTG9nLmxlbmd0aCAhPT0gMClcclxuICAgICAgZGF0YVxyXG4gICAgICAgID8gKGRhdGEgKz0gY29udGVudC51c2VyTG9nLmpvaW4oXCJcIikpXHJcbiAgICAgICAgOiAoZGF0YSA9IGNvbnRlbnQudXNlckxvZy5qb2luKFwiXCIpKTtcclxuXHJcbiAgICBpZiAoZXJyb3IgJiYgIWRhdGEpXHJcbiAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwidGhhdCB1c2VyIGRvZXMgbm90IGhhdmUgYSBsb2cgZmlsZVwiKTtcclxuXHJcbiAgICBsb2dzID0gZGF0YS5zcGxpdChcIlxcblwiKTtcclxuXHJcbiAgICBpZiAobG9nc1tsb2dzLmxlbmd0aCAtIDFdLnRyaW0oKSA9PT0gXCJcIikgbG9ncyA9IGxvZ3Muc2xpY2UoMCwgLTEpO1xyXG5cclxuICAgIGlmIChhbW91bnQgPiBsb2dzLmxlbmd0aCkgYW1vdW50ID0gbG9ncy5sZW5ndGg7XHJcblxyXG4gICAgbG9ncyA9IGxvZ3Muc2xpY2UoLWFtb3VudCk7XHJcbiAgICBsZXQgcmVzdWx0ID0gYW1vdW50ID09IDEgPyBsb2dzWzBdIDogbG9ncy5qb2luKFwiXFxuXCIpO1xyXG5cclxuICAgIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKFxyXG4gICAgICBgSGVyZSBhcmUgdGhlIGxhc3QgJHthbW91bnR9IG1lc3NhZ2UocykgWyR7dXNlcm5hbWUuaGlkZUlEKCl9XSBzZW50OlxcbiR7cmVzdWx0fWAsXHJcbiAgICAgIHsgc3BsaXQ6IHRydWUgfVxyXG4gICAgKTtcclxuICB9KTtcclxufTtcclxuIl19