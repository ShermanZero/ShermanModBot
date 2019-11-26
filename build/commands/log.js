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
module.exports = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG9DQUFrQztBQUdsQyx5QkFBeUI7QUFDekIsNkJBQTZCO0FBRTdCLG9EQUF3QztBQUV4QyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixpQkFBaUIsRUFBRSxLQUFLO0lBQ3hCLFdBQVcsRUFBRSwwREFBMEQ7SUFDdkUsS0FBSyxFQUFFLG1CQUFtQjtDQUMzQixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFPLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWMsRUFBRSxFQUFFO0lBQ3ZFLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRTVDLElBQUksQ0FBQyxJQUFJO1FBQ1AsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzdELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFFTCxJQUFJLFFBQVEsR0FBRyxtQkFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQ2xCLG1CQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLEtBQWMsRUFBRSxRQUFRLENBQUMsRUFDaEUsTUFBTSxFQUNOLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDNUIsQ0FBQztJQUVGLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXpFLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxHQUFHLEdBQUc7UUFBRSxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBQzFDLElBQUksTUFBTSxHQUFHLENBQUM7UUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBRTNCLElBQUksSUFBUyxDQUFDO0lBRWQsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3hDLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUU3RCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUM7WUFDOUIsSUFBSTtnQkFDRixDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3BDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXhDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSTtZQUNoQixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUU3RCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTTtZQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRS9DLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNsQixxQkFBcUIsTUFBTSxnQkFBZ0IsUUFBUSxDQUFDLE1BQU0sRUFBRSxZQUFZLE1BQU0sRUFBRSxFQUNoRixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FDaEIsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL2NsYXNzZXMvU3RyaW5nSGFuZGxlcic7XHJcblxyXG5pbXBvcnQgeyBHdWlsZCwgTWVzc2FnZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5pbXBvcnQgcnNyYyBmcm9tICcuLi9jbGFzc2VzL1Jlc291cmNlcyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wcm9wcyA9IHtcclxuICByZXF1aXJlc0VsZXZhdGlvbjogXCJtb2RcIixcclxuICBkZXNjcmlwdGlvbjogXCJkaXNwbGF5cyB0aGUgbGFzdCBudW1iZXIgb2YgbWVzc2FnZXMgYSBtZW1iZXIgaGFzIHBvc3RlZFwiLFxyXG4gIHVzYWdlOiBcIjxhbW91bnQ+IDxtZW1iZXI+XCJcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkgPT4ge1xyXG4gIGNvbnN0IHVzZXIgPSBtZXNzYWdlLm1lbnRpb25zLnVzZXJzLmZpcnN0KCk7XHJcblxyXG4gIGlmICghdXNlcilcclxuICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwieW91IG5lZWQgdG8gc3BlY2lmeSBhIHVzZXJcIikuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG5cclxuICBsZXQgdXNlcm5hbWUgPSByc3JjLmdldFVzZXJuYW1lRnJvbU1lbWJlcih1c2VyKTtcclxuICBsZXQgZmlsZSA9IHBhdGguam9pbihcclxuICAgIHJzcmMuZ2V0VXNlckRpcmVjdG9yeUZyb21HdWlsZChtZXNzYWdlLmd1aWxkIGFzIEd1aWxkLCB1c2VybmFtZSksXHJcbiAgICBcImxvZ3NcIixcclxuICAgIGNsaWVudC5jb25maWcuZmlsZXMubG9nX2FsbFxyXG4gICk7XHJcbiAgLy9wYXJzZSBhbW91bnRcclxuICBsZXQgYW1vdW50ID0gISFwYXJzZUludChhcmdzWzFdKSA/IHBhcnNlSW50KGFyZ3NbMV0pIDogcGFyc2VJbnQoYXJnc1syXSk7XHJcblxyXG4gIGlmICghYW1vdW50IHx8IGFtb3VudCA+IDEwMCkgYW1vdW50ID0gMTAwO1xyXG4gIGlmIChhbW91bnQgPCAxKSBhbW91bnQgPSAxO1xyXG5cclxuICBsZXQgbG9nczogYW55O1xyXG5cclxuICBmcy5yZWFkRmlsZShmaWxlLCBcInV0ZjhcIiwgKGVycm9yLCBkYXRhKSA9PiB7XHJcbiAgICBsZXQgY29udGVudCA9IGNsaWVudC5nZXRVc2VyQ29udGVudChtZXNzYWdlLmd1aWxkLCB1c2VybmFtZSk7XHJcblxyXG4gICAgaWYgKGNvbnRlbnQudXNlckxvZy5sZW5ndGggIT09IDApXHJcbiAgICAgIGRhdGFcclxuICAgICAgICA/IChkYXRhICs9IGNvbnRlbnQudXNlckxvZy5qb2luKFwiXCIpKVxyXG4gICAgICAgIDogKGRhdGEgPSBjb250ZW50LnVzZXJMb2cuam9pbihcIlwiKSk7XHJcblxyXG4gICAgaWYgKGVycm9yICYmICFkYXRhKVxyXG4gICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcInRoYXQgdXNlciBkb2VzIG5vdCBoYXZlIGEgbG9nIGZpbGVcIik7XHJcblxyXG4gICAgbG9ncyA9IGRhdGEuc3BsaXQoXCJcXG5cIik7XHJcblxyXG4gICAgaWYgKGxvZ3NbbG9ncy5sZW5ndGggLSAxXS50cmltKCkgPT09IFwiXCIpIGxvZ3MgPSBsb2dzLnNsaWNlKDAsIC0xKTtcclxuXHJcbiAgICBpZiAoYW1vdW50ID4gbG9ncy5sZW5ndGgpIGFtb3VudCA9IGxvZ3MubGVuZ3RoO1xyXG5cclxuICAgIGxvZ3MgPSBsb2dzLnNsaWNlKC1hbW91bnQpO1xyXG4gICAgbGV0IHJlc3VsdCA9IGFtb3VudCA9PSAxID8gbG9nc1swXSA6IGxvZ3Muam9pbihcIlxcblwiKTtcclxuXHJcbiAgICBtZXNzYWdlLmNoYW5uZWwuc2VuZChcclxuICAgICAgYEhlcmUgYXJlIHRoZSBsYXN0ICR7YW1vdW50fSBtZXNzYWdlKHMpIFske3VzZXJuYW1lLmhpZGVJRCgpfV0gc2VudDpcXG4ke3Jlc3VsdH1gLFxyXG4gICAgICB7IHNwbGl0OiB0cnVlIH1cclxuICAgICk7XHJcbiAgfSk7XHJcbn07XHJcbiJdfQ==