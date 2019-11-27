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
const global_config_1 = require("../resources/global_config");
module.exports.props = {
    requiresElevation: global_config_1.default.elevation_names.moderator,
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
    let file = path.join(Resources_1.default.getUserDirectoryFromGuild(message.guild, username), "logs", client.global_config.files.log_all);
    let amount = !!parseInt(args[1]) ? parseInt(args[1]) : parseInt(args[2]);
    if (!amount || amount > 100)
        amount = 100;
    if (amount < 1)
        amount = 1;
    let logs;
    fs.readFile(file, "utf8", (error, data) => {
        let content = client.getUserContent(message.guild, username);
        if (content.userLog.length !== 0)
            data ? (data += content.userLog.join("")) : (data = content.userLog.join(""));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG9DQUFrQztBQUdsQyx5QkFBeUI7QUFDekIsNkJBQTZCO0FBRTdCLG9EQUF3QztBQUN4Qyw4REFBZ0Q7QUFFaEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUc7SUFDckIsaUJBQWlCLEVBQUUsdUJBQU0sQ0FBQyxlQUFlLENBQUMsU0FBUztJQUNuRCxXQUFXLEVBQUUsMERBQTBEO0lBQ3ZFLEtBQUssRUFBRSxtQkFBbUI7Q0FDM0IsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQU8sTUFBVyxFQUFFLE9BQWdCLEVBQUUsSUFBYyxFQUFFLEVBQUU7SUFDM0UsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFNUMsSUFBSSxDQUFDLElBQUk7UUFDUCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDN0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUVMLElBQUksUUFBUSxHQUFHLG1CQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxLQUFjLEVBQUUsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRW5JLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXpFLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxHQUFHLEdBQUc7UUFBRSxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBQzFDLElBQUksTUFBTSxHQUFHLENBQUM7UUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBRTNCLElBQUksSUFBUyxDQUFDO0lBRWQsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3hDLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUU3RCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFaEgsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFFL0UsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU07WUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUUvQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsTUFBTSxnQkFBZ0IsUUFBUSxDQUFDLE1BQU0sRUFBRSxZQUFZLE1BQU0sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDMUgsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vY2xhc3Nlcy9TdHJpbmdIYW5kbGVyJztcclxuXHJcbmltcG9ydCB7IEd1aWxkLCBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbmltcG9ydCByc3JjIGZyb20gJy4uL2NsYXNzZXMvUmVzb3VyY2VzJztcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9yZXNvdXJjZXMvZ2xvYmFsX2NvbmZpZyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wcm9wcyA9IHtcclxuICByZXF1aXJlc0VsZXZhdGlvbjogY29uZmlnLmVsZXZhdGlvbl9uYW1lcy5tb2RlcmF0b3IsXHJcbiAgZGVzY3JpcHRpb246IFwiZGlzcGxheXMgdGhlIGxhc3QgbnVtYmVyIG9mIG1lc3NhZ2VzIGEgbWVtYmVyIGhhcyBwb3N0ZWRcIixcclxuICB1c2FnZTogXCI8YW1vdW50PiA8bWVtYmVyPlwiXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5ydW4gPSBhc3luYyAoY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UsIGFyZ3M6IHN0cmluZ1tdKSA9PiB7XHJcbiAgY29uc3QgdXNlciA9IG1lc3NhZ2UubWVudGlvbnMudXNlcnMuZmlyc3QoKTtcclxuXHJcbiAgaWYgKCF1c2VyKVxyXG4gICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJ5b3UgbmVlZCB0byBzcGVjaWZ5IGEgdXNlclwiKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcblxyXG4gIGxldCB1c2VybmFtZSA9IHJzcmMuZ2V0VXNlcm5hbWVGcm9tTWVtYmVyKHVzZXIpO1xyXG4gIGxldCBmaWxlID0gcGF0aC5qb2luKHJzcmMuZ2V0VXNlckRpcmVjdG9yeUZyb21HdWlsZChtZXNzYWdlLmd1aWxkIGFzIEd1aWxkLCB1c2VybmFtZSksIFwibG9nc1wiLCBjbGllbnQuZ2xvYmFsX2NvbmZpZy5maWxlcy5sb2dfYWxsKTtcclxuICAvL3BhcnNlIGFtb3VudFxyXG4gIGxldCBhbW91bnQgPSAhIXBhcnNlSW50KGFyZ3NbMV0pID8gcGFyc2VJbnQoYXJnc1sxXSkgOiBwYXJzZUludChhcmdzWzJdKTtcclxuXHJcbiAgaWYgKCFhbW91bnQgfHwgYW1vdW50ID4gMTAwKSBhbW91bnQgPSAxMDA7XHJcbiAgaWYgKGFtb3VudCA8IDEpIGFtb3VudCA9IDE7XHJcblxyXG4gIGxldCBsb2dzOiBhbnk7XHJcblxyXG4gIGZzLnJlYWRGaWxlKGZpbGUsIFwidXRmOFwiLCAoZXJyb3IsIGRhdGEpID0+IHtcclxuICAgIGxldCBjb250ZW50ID0gY2xpZW50LmdldFVzZXJDb250ZW50KG1lc3NhZ2UuZ3VpbGQsIHVzZXJuYW1lKTtcclxuXHJcbiAgICBpZiAoY29udGVudC51c2VyTG9nLmxlbmd0aCAhPT0gMCkgZGF0YSA/IChkYXRhICs9IGNvbnRlbnQudXNlckxvZy5qb2luKFwiXCIpKSA6IChkYXRhID0gY29udGVudC51c2VyTG9nLmpvaW4oXCJcIikpO1xyXG5cclxuICAgIGlmIChlcnJvciAmJiAhZGF0YSkgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJ0aGF0IHVzZXIgZG9lcyBub3QgaGF2ZSBhIGxvZyBmaWxlXCIpO1xyXG5cclxuICAgIGxvZ3MgPSBkYXRhLnNwbGl0KFwiXFxuXCIpO1xyXG5cclxuICAgIGlmIChsb2dzW2xvZ3MubGVuZ3RoIC0gMV0udHJpbSgpID09PSBcIlwiKSBsb2dzID0gbG9ncy5zbGljZSgwLCAtMSk7XHJcblxyXG4gICAgaWYgKGFtb3VudCA+IGxvZ3MubGVuZ3RoKSBhbW91bnQgPSBsb2dzLmxlbmd0aDtcclxuXHJcbiAgICBsb2dzID0gbG9ncy5zbGljZSgtYW1vdW50KTtcclxuICAgIGxldCByZXN1bHQgPSBhbW91bnQgPT0gMSA/IGxvZ3NbMF0gOiBsb2dzLmpvaW4oXCJcXG5cIik7XHJcblxyXG4gICAgbWVzc2FnZS5jaGFubmVsLnNlbmQoYEhlcmUgYXJlIHRoZSBsYXN0ICR7YW1vdW50fSBtZXNzYWdlKHMpIFske3VzZXJuYW1lLmhpZGVJRCgpfV0gc2VudDpcXG4ke3Jlc3VsdH1gLCB7IHNwbGl0OiB0cnVlIH0pO1xyXG4gIH0pO1xyXG59O1xyXG4iXX0=