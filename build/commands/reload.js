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
const path = require("path");
module.exports.props = {
    requiresElevation: "owner",
    description: "reloads a command",
    usage: "<command>"
};
module.exports = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    if (!args || args.length < 1)
        try {
            return message.reply("you must provide a command name to reload");
        }
        catch (err) {
            console.log(err);
        }
    const commandName = args[0];
    if (!client.commands.has(commandName))
        return message.reply("that command does not exist");
    delete require.cache[require.resolve(path.join(__dirname, commandName + ".js"))];
    client.commands.delete(commandName);
    const props = require(path.join(__dirname, commandName + ".js"));
    client.commands.set(commandName, props);
    message.reply(`the command "${commandName}" has been reloaded`).catch(err => {
        console.log(err);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3JlbG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDZCQUE2QjtBQUU3QixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixpQkFBaUIsRUFBRSxPQUFPO0lBQzFCLFdBQVcsRUFBRSxtQkFBbUI7SUFDaEMsS0FBSyxFQUFFLFdBQVc7Q0FDbkIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBTyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxJQUFjLEVBQUUsRUFBRTtJQUN2RSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUMxQixJQUFJO1lBQ0YsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7U0FDbkU7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbEI7SUFFSCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFHNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztRQUNuQyxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUV0RCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQ2xCLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQzNELENBQUM7SUFHRixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNwQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRXhDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLFdBQVcscUJBQXFCLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDMUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XHJcbiAgcmVxdWlyZXNFbGV2YXRpb246IFwib3duZXJcIixcclxuICBkZXNjcmlwdGlvbjogXCJyZWxvYWRzIGEgY29tbWFuZFwiLFxyXG4gIHVzYWdlOiBcIjxjb21tYW5kPlwiXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIChjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSwgYXJnczogc3RyaW5nW10pID0+IHtcclxuICBpZiAoIWFyZ3MgfHwgYXJncy5sZW5ndGggPCAxKVxyXG4gICAgdHJ5IHtcclxuICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJ5b3UgbXVzdCBwcm92aWRlIGEgY29tbWFuZCBuYW1lIHRvIHJlbG9hZFwiKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfVxyXG5cclxuICBjb25zdCBjb21tYW5kTmFtZSA9IGFyZ3NbMF07XHJcblxyXG4gIC8vY2hlY2sgaWYgdGhlIGNvbW1hbmQgZXhpc3RzIGFuZCBpcyB2YWxpZFxyXG4gIGlmICghY2xpZW50LmNvbW1hbmRzLmhhcyhjb21tYW5kTmFtZSkpXHJcbiAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcInRoYXQgY29tbWFuZCBkb2VzIG5vdCBleGlzdFwiKTtcclxuXHJcbiAgZGVsZXRlIHJlcXVpcmUuY2FjaGVbXHJcbiAgICByZXF1aXJlLnJlc29sdmUocGF0aC5qb2luKF9fZGlybmFtZSwgY29tbWFuZE5hbWUgKyBcIi5qc1wiKSlcclxuICBdO1xyXG5cclxuICAvL2RlbGV0ZSBhbmQgcmVsb2FkIHRoZSBjb21tYW5kIGZyb20gdGhlIGNsaWVudC5jb21tYW5kcyBFbm1hcFxyXG4gIGNsaWVudC5jb21tYW5kcy5kZWxldGUoY29tbWFuZE5hbWUpO1xyXG4gIGNvbnN0IHByb3BzID0gcmVxdWlyZShwYXRoLmpvaW4oX19kaXJuYW1lLCBjb21tYW5kTmFtZSArIFwiLmpzXCIpKTtcclxuICBjbGllbnQuY29tbWFuZHMuc2V0KGNvbW1hbmROYW1lLCBwcm9wcyk7XHJcblxyXG4gIG1lc3NhZ2UucmVwbHkoYHRoZSBjb21tYW5kIFwiJHtjb21tYW5kTmFtZX1cIiBoYXMgYmVlbiByZWxvYWRlZGApLmNhdGNoKGVyciA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gIH0pO1xyXG59O1xyXG4iXX0=