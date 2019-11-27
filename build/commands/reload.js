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
const global_config_1 = require("../resources/global_config");
module.exports.props = {
    requiresElevation: global_config_1.default.elevation_names.botowner,
    description: "reloads a command",
    usage: "<command>"
};
module.exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3JlbG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDZCQUE2QjtBQUU3Qiw4REFBZ0Q7QUFFaEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUc7SUFDckIsaUJBQWlCLEVBQUUsdUJBQU0sQ0FBQyxlQUFlLENBQUMsUUFBUTtJQUNsRCxXQUFXLEVBQUUsbUJBQW1CO0lBQ2hDLEtBQUssRUFBRSxXQUFXO0NBQ25CLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWMsRUFBRSxFQUFFO0lBQzNFLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDO1FBQzFCLElBQUk7WUFDRixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztTQUNuRTtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNsQjtJQUVILE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUc1QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO1FBQUUsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFFM0YsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUdqRixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNwQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRXhDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLFdBQVcscUJBQXFCLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDMUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9yZXNvdXJjZXMvZ2xvYmFsX2NvbmZpZyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wcm9wcyA9IHtcclxuICByZXF1aXJlc0VsZXZhdGlvbjogY29uZmlnLmVsZXZhdGlvbl9uYW1lcy5ib3Rvd25lcixcclxuICBkZXNjcmlwdGlvbjogXCJyZWxvYWRzIGEgY29tbWFuZFwiLFxyXG4gIHVzYWdlOiBcIjxjb21tYW5kPlwiXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5ydW4gPSBhc3luYyAoY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UsIGFyZ3M6IHN0cmluZ1tdKSA9PiB7XHJcbiAgaWYgKCFhcmdzIHx8IGFyZ3MubGVuZ3RoIDwgMSlcclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwieW91IG11c3QgcHJvdmlkZSBhIGNvbW1hbmQgbmFtZSB0byByZWxvYWRcIik7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH1cclxuXHJcbiAgY29uc3QgY29tbWFuZE5hbWUgPSBhcmdzWzBdO1xyXG5cclxuICAvL2NoZWNrIGlmIHRoZSBjb21tYW5kIGV4aXN0cyBhbmQgaXMgdmFsaWRcclxuICBpZiAoIWNsaWVudC5jb21tYW5kcy5oYXMoY29tbWFuZE5hbWUpKSByZXR1cm4gbWVzc2FnZS5yZXBseShcInRoYXQgY29tbWFuZCBkb2VzIG5vdCBleGlzdFwiKTtcclxuXHJcbiAgZGVsZXRlIHJlcXVpcmUuY2FjaGVbcmVxdWlyZS5yZXNvbHZlKHBhdGguam9pbihfX2Rpcm5hbWUsIGNvbW1hbmROYW1lICsgXCIuanNcIikpXTtcclxuXHJcbiAgLy9kZWxldGUgYW5kIHJlbG9hZCB0aGUgY29tbWFuZCBmcm9tIHRoZSBjbGllbnQuY29tbWFuZHMgRW5tYXBcclxuICBjbGllbnQuY29tbWFuZHMuZGVsZXRlKGNvbW1hbmROYW1lKTtcclxuICBjb25zdCBwcm9wcyA9IHJlcXVpcmUocGF0aC5qb2luKF9fZGlybmFtZSwgY29tbWFuZE5hbWUgKyBcIi5qc1wiKSk7XHJcbiAgY2xpZW50LmNvbW1hbmRzLnNldChjb21tYW5kTmFtZSwgcHJvcHMpO1xyXG5cclxuICBtZXNzYWdlLnJlcGx5KGB0aGUgY29tbWFuZCBcIiR7Y29tbWFuZE5hbWV9XCIgaGFzIGJlZW4gcmVsb2FkZWRgKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZXJyKTtcclxuICB9KTtcclxufTtcclxuIl19