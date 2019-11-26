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
class log {
    constructor() {
        this.props = {
            requiresElevation: "mod",
            description: "displays the last number of messages a member has posted",
            usage: "<amount> <member>"
        };
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
}
exports.default = log;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG9DQUFrQztBQUdsQyx5QkFBeUI7QUFDekIsNkJBQTZCO0FBRTdCLG9EQUF3QztBQUV4QyxNQUFxQixHQUFHO0lBQXhCO1FBQ0UsVUFBSyxHQUFHO1lBQ04saUJBQWlCLEVBQUUsS0FBSztZQUN4QixXQUFXLEVBQUUsMERBQTBEO1lBQ3ZFLEtBQUssRUFBRSxtQkFBbUI7U0FDM0IsQ0FBQztJQWtESixDQUFDO0lBaERPLEdBQUcsQ0FBQyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxJQUFjOztZQUNyRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUU1QyxJQUFJLENBQUMsSUFBSTtnQkFDUCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzdELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25CLENBQUMsQ0FBQyxDQUFDO1lBRUwsSUFBSSxRQUFRLEdBQUcsbUJBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUNsQixtQkFBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxLQUFjLEVBQUUsUUFBUSxDQUFDLEVBQ2hFLE1BQU0sRUFDTixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQzVCLENBQUM7WUFFRixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV6RSxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sR0FBRyxHQUFHO2dCQUFFLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDMUMsSUFBSSxNQUFNLEdBQUcsQ0FBQztnQkFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBRTNCLElBQUksSUFBUyxDQUFDO1lBRWQsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUN4QyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBRTdELElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQztvQkFDOUIsSUFBSTt3QkFDRixDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ3BDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUV4QyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUk7b0JBQ2hCLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO2dCQUU3RCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFeEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO29CQUFFLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVsRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTTtvQkFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFFL0MsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVyRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDbEIscUJBQXFCLE1BQU0sZ0JBQWdCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsWUFBWSxNQUFNLEVBQUUsRUFDaEYsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQ2hCLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtDQUNGO0FBdkRELHNCQXVEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vY2xhc3Nlcy9TdHJpbmdIYW5kbGVyJztcclxuXHJcbmltcG9ydCB7IEd1aWxkLCBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbmltcG9ydCByc3JjIGZyb20gJy4uL2NsYXNzZXMvUmVzb3VyY2VzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGxvZyB7XHJcbiAgcHJvcHMgPSB7XHJcbiAgICByZXF1aXJlc0VsZXZhdGlvbjogXCJtb2RcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcImRpc3BsYXlzIHRoZSBsYXN0IG51bWJlciBvZiBtZXNzYWdlcyBhIG1lbWJlciBoYXMgcG9zdGVkXCIsXHJcbiAgICB1c2FnZTogXCI8YW1vdW50PiA8bWVtYmVyPlwiXHJcbiAgfTtcclxuXHJcbiAgYXN5bmMgcnVuKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkge1xyXG4gICAgY29uc3QgdXNlciA9IG1lc3NhZ2UubWVudGlvbnMudXNlcnMuZmlyc3QoKTtcclxuXHJcbiAgICBpZiAoIXVzZXIpXHJcbiAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwieW91IG5lZWQgdG8gc3BlY2lmeSBhIHVzZXJcIikuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICBsZXQgdXNlcm5hbWUgPSByc3JjLmdldFVzZXJuYW1lRnJvbU1lbWJlcih1c2VyKTtcclxuICAgIGxldCBmaWxlID0gcGF0aC5qb2luKFxyXG4gICAgICByc3JjLmdldFVzZXJEaXJlY3RvcnlGcm9tR3VpbGQobWVzc2FnZS5ndWlsZCBhcyBHdWlsZCwgdXNlcm5hbWUpLFxyXG4gICAgICBcImxvZ3NcIixcclxuICAgICAgY2xpZW50LmNvbmZpZy5maWxlcy5sb2dfYWxsXHJcbiAgICApO1xyXG4gICAgLy9wYXJzZSBhbW91bnRcclxuICAgIGxldCBhbW91bnQgPSAhIXBhcnNlSW50KGFyZ3NbMV0pID8gcGFyc2VJbnQoYXJnc1sxXSkgOiBwYXJzZUludChhcmdzWzJdKTtcclxuXHJcbiAgICBpZiAoIWFtb3VudCB8fCBhbW91bnQgPiAxMDApIGFtb3VudCA9IDEwMDtcclxuICAgIGlmIChhbW91bnQgPCAxKSBhbW91bnQgPSAxO1xyXG5cclxuICAgIGxldCBsb2dzOiBhbnk7XHJcblxyXG4gICAgZnMucmVhZEZpbGUoZmlsZSwgXCJ1dGY4XCIsIChlcnJvciwgZGF0YSkgPT4ge1xyXG4gICAgICBsZXQgY29udGVudCA9IGNsaWVudC5nZXRVc2VyQ29udGVudChtZXNzYWdlLmd1aWxkLCB1c2VybmFtZSk7XHJcblxyXG4gICAgICBpZiAoY29udGVudC51c2VyTG9nLmxlbmd0aCAhPT0gMClcclxuICAgICAgICBkYXRhXHJcbiAgICAgICAgICA/IChkYXRhICs9IGNvbnRlbnQudXNlckxvZy5qb2luKFwiXCIpKVxyXG4gICAgICAgICAgOiAoZGF0YSA9IGNvbnRlbnQudXNlckxvZy5qb2luKFwiXCIpKTtcclxuXHJcbiAgICAgIGlmIChlcnJvciAmJiAhZGF0YSlcclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcInRoYXQgdXNlciBkb2VzIG5vdCBoYXZlIGEgbG9nIGZpbGVcIik7XHJcblxyXG4gICAgICBsb2dzID0gZGF0YS5zcGxpdChcIlxcblwiKTtcclxuXHJcbiAgICAgIGlmIChsb2dzW2xvZ3MubGVuZ3RoIC0gMV0udHJpbSgpID09PSBcIlwiKSBsb2dzID0gbG9ncy5zbGljZSgwLCAtMSk7XHJcblxyXG4gICAgICBpZiAoYW1vdW50ID4gbG9ncy5sZW5ndGgpIGFtb3VudCA9IGxvZ3MubGVuZ3RoO1xyXG5cclxuICAgICAgbG9ncyA9IGxvZ3Muc2xpY2UoLWFtb3VudCk7XHJcbiAgICAgIGxldCByZXN1bHQgPSBhbW91bnQgPT0gMSA/IGxvZ3NbMF0gOiBsb2dzLmpvaW4oXCJcXG5cIik7XHJcblxyXG4gICAgICBtZXNzYWdlLmNoYW5uZWwuc2VuZChcclxuICAgICAgICBgSGVyZSBhcmUgdGhlIGxhc3QgJHthbW91bnR9IG1lc3NhZ2UocykgWyR7dXNlcm5hbWUuaGlkZUlEKCl9XSBzZW50OlxcbiR7cmVzdWx0fWAsXHJcbiAgICAgICAgeyBzcGxpdDogdHJ1ZSB9XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19