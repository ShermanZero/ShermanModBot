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
require("colors");
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const Resources_1 = require("../classes/Resources");
const global_config_1 = require("../resources/global_config");
module.exports.props = {
    requiresElevation: global_config_1.default.elevation_names.botowner,
    description: "copies a user's data to another user, and deletes the original",
    usage: "<old_member> <new_member>"
};
module.exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    if (args.length != 2)
        return message.reply("you need to specify two users").catch(err => {
            console.log(err);
        });
    const oldUser = args[0].trim().toLowerCase();
    const newUser = args[1].trim().toLowerCase();
    let oldUsername = Resources_1.default.getUsernameFromMember(oldUser);
    let newUsername = Resources_1.default.getUsernameFromMember(newUser);
    if (!client.hasUser(message.guild, oldUsername))
        if (message)
            return message.reply(`I could not find OLD [${oldUser}] in my database`);
        else
            return console.error(`!! I could not find OLD [${oldUser}] in my database`.red);
    if (!client.hasUser(message.guild, newUsername))
        if (message)
            return message.reply(`I could not find NEW [${newUser}] in my database`);
        else
            return console.error(`!! I could not find NEW [${newUser}] in my database`.red);
    let content = client.getUserContent(message.guild, oldUsername);
    content.hidden.username = newUsername;
    let source = Resources_1.default.getUserDirectoryFromGuild(message.guild, oldUsername);
    let destination = Resources_1.default.getUserDirectoryFromGuild(message.guild, newUsername);
    fs.writeFileSync(path.join(destination, newUsername + ".json"), JSON.stringify(content, null, "\t"));
    rimraf(source, err => {
        if (err)
            console.log(err);
    });
    client.usersInSession.delete(oldUser);
    console.log(`*Removed [${oldUser}] from session`);
    if (message)
        message.delete().catch(err => {
            console.log(err);
        });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvbWVyZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxrQkFBZ0I7QUFHaEIseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFFakMsb0RBQXdDO0FBQ3hDLDhEQUFnRDtBQUVoRCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixpQkFBaUIsRUFBRSx1QkFBTSxDQUFDLGVBQWUsQ0FBQyxRQUFRO0lBQ2xELFdBQVcsRUFBRSxnRUFBZ0U7SUFDN0UsS0FBSyxFQUFFLDJCQUEyQjtDQUNuQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBTyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxJQUFjLEVBQUUsRUFBRTtJQUMzRSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQztRQUNsQixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDaEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUdMLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUU3QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7SUFFN0MsSUFBSSxXQUFXLEdBQUcsbUJBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RCxJQUFJLFdBQVcsR0FBRyxtQkFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXRELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDO1FBQzdDLElBQUksT0FBTztZQUFFLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsT0FBTyxrQkFBa0IsQ0FBQyxDQUFDOztZQUNqRixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLE9BQU8sa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFdkYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUM7UUFDN0MsSUFBSSxPQUFPO1lBQUUsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixPQUFPLGtCQUFrQixDQUFDLENBQUM7O1lBQ2pGLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsT0FBTyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV2RixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDaEUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO0lBRXRDLElBQUksTUFBTSxHQUFHLG1CQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLEtBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNqRixJQUFJLFdBQVcsR0FBRyxtQkFBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxLQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFFdEYsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxXQUFXLEdBQUcsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDckcsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtRQUNuQixJQUFJLEdBQUc7WUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLE9BQU8sZ0JBQWdCLENBQUMsQ0FBQztJQUVsRCxJQUFJLE9BQU87UUFDVCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnY29sb3JzJztcclxuXHJcbmltcG9ydCB7IEd1aWxkLCBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0ICogYXMgcmltcmFmIGZyb20gJ3JpbXJhZic7XHJcblxyXG5pbXBvcnQgcnNyYyBmcm9tICcuLi9jbGFzc2VzL1Jlc291cmNlcyc7XHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vcmVzb3VyY2VzL2dsb2JhbF9jb25maWcnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XHJcbiAgcmVxdWlyZXNFbGV2YXRpb246IGNvbmZpZy5lbGV2YXRpb25fbmFtZXMuYm90b3duZXIsXHJcbiAgZGVzY3JpcHRpb246IFwiY29waWVzIGEgdXNlcidzIGRhdGEgdG8gYW5vdGhlciB1c2VyLCBhbmQgZGVsZXRlcyB0aGUgb3JpZ2luYWxcIixcclxuICB1c2FnZTogXCI8b2xkX21lbWJlcj4gPG5ld19tZW1iZXI+XCJcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLnJ1biA9IGFzeW5jIChjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSwgYXJnczogc3RyaW5nW10pID0+IHtcclxuICBpZiAoYXJncy5sZW5ndGggIT0gMilcclxuICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwieW91IG5lZWQgdG8gc3BlY2lmeSB0d28gdXNlcnNcIikuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG5cclxuICAvL3RoZSB1c2VyIHRvIGNvcHkgZnJvbVxyXG4gIGNvbnN0IG9sZFVzZXIgPSBhcmdzWzBdLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gIC8vdGhlIHVzZXIgdG8gY29weSB0b1xyXG4gIGNvbnN0IG5ld1VzZXIgPSBhcmdzWzFdLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICBsZXQgb2xkVXNlcm5hbWUgPSByc3JjLmdldFVzZXJuYW1lRnJvbU1lbWJlcihvbGRVc2VyKTtcclxuICBsZXQgbmV3VXNlcm5hbWUgPSByc3JjLmdldFVzZXJuYW1lRnJvbU1lbWJlcihuZXdVc2VyKTtcclxuXHJcbiAgaWYgKCFjbGllbnQuaGFzVXNlcihtZXNzYWdlLmd1aWxkLCBvbGRVc2VybmFtZSkpXHJcbiAgICBpZiAobWVzc2FnZSkgcmV0dXJuIG1lc3NhZ2UucmVwbHkoYEkgY291bGQgbm90IGZpbmQgT0xEIFske29sZFVzZXJ9XSBpbiBteSBkYXRhYmFzZWApO1xyXG4gICAgZWxzZSByZXR1cm4gY29uc29sZS5lcnJvcihgISEgSSBjb3VsZCBub3QgZmluZCBPTEQgWyR7b2xkVXNlcn1dIGluIG15IGRhdGFiYXNlYC5yZWQpO1xyXG5cclxuICBpZiAoIWNsaWVudC5oYXNVc2VyKG1lc3NhZ2UuZ3VpbGQsIG5ld1VzZXJuYW1lKSlcclxuICAgIGlmIChtZXNzYWdlKSByZXR1cm4gbWVzc2FnZS5yZXBseShgSSBjb3VsZCBub3QgZmluZCBORVcgWyR7bmV3VXNlcn1dIGluIG15IGRhdGFiYXNlYCk7XHJcbiAgICBlbHNlIHJldHVybiBjb25zb2xlLmVycm9yKGAhISBJIGNvdWxkIG5vdCBmaW5kIE5FVyBbJHtuZXdVc2VyfV0gaW4gbXkgZGF0YWJhc2VgLnJlZCk7XHJcblxyXG4gIGxldCBjb250ZW50ID0gY2xpZW50LmdldFVzZXJDb250ZW50KG1lc3NhZ2UuZ3VpbGQsIG9sZFVzZXJuYW1lKTtcclxuICBjb250ZW50LmhpZGRlbi51c2VybmFtZSA9IG5ld1VzZXJuYW1lO1xyXG5cclxuICBsZXQgc291cmNlID0gcnNyYy5nZXRVc2VyRGlyZWN0b3J5RnJvbUd1aWxkKG1lc3NhZ2UuZ3VpbGQgYXMgR3VpbGQsIG9sZFVzZXJuYW1lKTtcclxuICBsZXQgZGVzdGluYXRpb24gPSByc3JjLmdldFVzZXJEaXJlY3RvcnlGcm9tR3VpbGQobWVzc2FnZS5ndWlsZCBhcyBHdWlsZCwgbmV3VXNlcm5hbWUpO1xyXG5cclxuICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihkZXN0aW5hdGlvbiwgbmV3VXNlcm5hbWUgKyBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeShjb250ZW50LCBudWxsLCBcIlxcdFwiKSk7XHJcbiAgcmltcmFmKHNvdXJjZSwgZXJyID0+IHtcclxuICAgIGlmIChlcnIpIGNvbnNvbGUubG9nKGVycik7XHJcbiAgfSk7XHJcblxyXG4gIGNsaWVudC51c2Vyc0luU2Vzc2lvbi5kZWxldGUob2xkVXNlcik7XHJcbiAgY29uc29sZS5sb2coYCpSZW1vdmVkIFske29sZFVzZXJ9XSBmcm9tIHNlc3Npb25gKTtcclxuXHJcbiAgaWYgKG1lc3NhZ2UpXHJcbiAgICBtZXNzYWdlLmRlbGV0ZSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxufTtcclxuIl19