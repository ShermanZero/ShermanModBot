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
module.exports.props = {
    requiresElevation: "owner",
    description: "copies a user's data to another user, and deletes the original",
    usage: "<old_member> <new_member>"
};
module.exports = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvbWVyZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxrQkFBZ0I7QUFHaEIseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFFakMsb0RBQXdDO0FBRXhDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHO0lBQ3JCLGlCQUFpQixFQUFFLE9BQU87SUFDMUIsV0FBVyxFQUFFLGdFQUFnRTtJQUM3RSxLQUFLLEVBQUUsMkJBQTJCO0NBQ25DLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLENBQU8sTUFBVyxFQUFFLE9BQWdCLEVBQUUsSUFBYyxFQUFFLEVBQUU7SUFDdkUsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUM7UUFDbEIsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFHTCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7SUFFN0MsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRTdDLElBQUksV0FBVyxHQUFHLG1CQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEQsSUFBSSxXQUFXLEdBQUcsbUJBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV0RCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQztRQUM3QyxJQUFJLE9BQU87WUFDVCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLE9BQU8sa0JBQWtCLENBQUMsQ0FBQzs7WUFFekUsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUNsQiw0QkFBNEIsT0FBTyxrQkFBa0IsQ0FBQyxHQUFHLENBQzFELENBQUM7SUFFTixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQztRQUM3QyxJQUFJLE9BQU87WUFDVCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLE9BQU8sa0JBQWtCLENBQUMsQ0FBQzs7WUFFekUsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUNsQiw0QkFBNEIsT0FBTyxrQkFBa0IsQ0FBQyxHQUFHLENBQzFELENBQUM7SUFFTixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDaEUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO0lBRXRDLElBQUksTUFBTSxHQUFHLG1CQUFJLENBQUMseUJBQXlCLENBQ3pDLE9BQU8sQ0FBQyxLQUFjLEVBQ3RCLFdBQVcsQ0FDWixDQUFDO0lBQ0YsSUFBSSxXQUFXLEdBQUcsbUJBQUksQ0FBQyx5QkFBeUIsQ0FDOUMsT0FBTyxDQUFDLEtBQWMsRUFDdEIsV0FBVyxDQUNaLENBQUM7SUFFRixFQUFFLENBQUMsYUFBYSxDQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFdBQVcsR0FBRyxPQUFPLENBQUMsRUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUNwQyxDQUFDO0lBQ0YsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtRQUNuQixJQUFJLEdBQUc7WUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLE9BQU8sZ0JBQWdCLENBQUMsQ0FBQztJQUVsRCxJQUFJLE9BQU87UUFDVCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnY29sb3JzJztcclxuXHJcbmltcG9ydCB7IEd1aWxkLCBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0ICogYXMgcmltcmFmIGZyb20gJ3JpbXJhZic7XHJcblxyXG5pbXBvcnQgcnNyYyBmcm9tICcuLi9jbGFzc2VzL1Jlc291cmNlcyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wcm9wcyA9IHtcclxuICByZXF1aXJlc0VsZXZhdGlvbjogXCJvd25lclwiLFxyXG4gIGRlc2NyaXB0aW9uOiBcImNvcGllcyBhIHVzZXIncyBkYXRhIHRvIGFub3RoZXIgdXNlciwgYW5kIGRlbGV0ZXMgdGhlIG9yaWdpbmFsXCIsXHJcbiAgdXNhZ2U6IFwiPG9sZF9tZW1iZXI+IDxuZXdfbWVtYmVyPlwiXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIChjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSwgYXJnczogc3RyaW5nW10pID0+IHtcclxuICBpZiAoYXJncy5sZW5ndGggIT0gMilcclxuICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwieW91IG5lZWQgdG8gc3BlY2lmeSB0d28gdXNlcnNcIikuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG5cclxuICAvL3RoZSB1c2VyIHRvIGNvcHkgZnJvbVxyXG4gIGNvbnN0IG9sZFVzZXIgPSBhcmdzWzBdLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gIC8vdGhlIHVzZXIgdG8gY29weSB0b1xyXG4gIGNvbnN0IG5ld1VzZXIgPSBhcmdzWzFdLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICBsZXQgb2xkVXNlcm5hbWUgPSByc3JjLmdldFVzZXJuYW1lRnJvbU1lbWJlcihvbGRVc2VyKTtcclxuICBsZXQgbmV3VXNlcm5hbWUgPSByc3JjLmdldFVzZXJuYW1lRnJvbU1lbWJlcihuZXdVc2VyKTtcclxuXHJcbiAgaWYgKCFjbGllbnQuaGFzVXNlcihtZXNzYWdlLmd1aWxkLCBvbGRVc2VybmFtZSkpXHJcbiAgICBpZiAobWVzc2FnZSlcclxuICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoYEkgY291bGQgbm90IGZpbmQgT0xEIFske29sZFVzZXJ9XSBpbiBteSBkYXRhYmFzZWApO1xyXG4gICAgZWxzZVxyXG4gICAgICByZXR1cm4gY29uc29sZS5lcnJvcihcclxuICAgICAgICBgISEgSSBjb3VsZCBub3QgZmluZCBPTEQgWyR7b2xkVXNlcn1dIGluIG15IGRhdGFiYXNlYC5yZWRcclxuICAgICAgKTtcclxuXHJcbiAgaWYgKCFjbGllbnQuaGFzVXNlcihtZXNzYWdlLmd1aWxkLCBuZXdVc2VybmFtZSkpXHJcbiAgICBpZiAobWVzc2FnZSlcclxuICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoYEkgY291bGQgbm90IGZpbmQgTkVXIFske25ld1VzZXJ9XSBpbiBteSBkYXRhYmFzZWApO1xyXG4gICAgZWxzZVxyXG4gICAgICByZXR1cm4gY29uc29sZS5lcnJvcihcclxuICAgICAgICBgISEgSSBjb3VsZCBub3QgZmluZCBORVcgWyR7bmV3VXNlcn1dIGluIG15IGRhdGFiYXNlYC5yZWRcclxuICAgICAgKTtcclxuXHJcbiAgbGV0IGNvbnRlbnQgPSBjbGllbnQuZ2V0VXNlckNvbnRlbnQobWVzc2FnZS5ndWlsZCwgb2xkVXNlcm5hbWUpO1xyXG4gIGNvbnRlbnQuaGlkZGVuLnVzZXJuYW1lID0gbmV3VXNlcm5hbWU7XHJcblxyXG4gIGxldCBzb3VyY2UgPSByc3JjLmdldFVzZXJEaXJlY3RvcnlGcm9tR3VpbGQoXHJcbiAgICBtZXNzYWdlLmd1aWxkIGFzIEd1aWxkLFxyXG4gICAgb2xkVXNlcm5hbWVcclxuICApO1xyXG4gIGxldCBkZXN0aW5hdGlvbiA9IHJzcmMuZ2V0VXNlckRpcmVjdG9yeUZyb21HdWlsZChcclxuICAgIG1lc3NhZ2UuZ3VpbGQgYXMgR3VpbGQsXHJcbiAgICBuZXdVc2VybmFtZVxyXG4gICk7XHJcblxyXG4gIGZzLndyaXRlRmlsZVN5bmMoXHJcbiAgICBwYXRoLmpvaW4oZGVzdGluYXRpb24sIG5ld1VzZXJuYW1lICsgXCIuanNvblwiKSxcclxuICAgIEpTT04uc3RyaW5naWZ5KGNvbnRlbnQsIG51bGwsIFwiXFx0XCIpXHJcbiAgKTtcclxuICByaW1yYWYoc291cmNlLCBlcnIgPT4ge1xyXG4gICAgaWYgKGVycikgY29uc29sZS5sb2coZXJyKTtcclxuICB9KTtcclxuXHJcbiAgY2xpZW50LnVzZXJzSW5TZXNzaW9uLmRlbGV0ZShvbGRVc2VyKTtcclxuICBjb25zb2xlLmxvZyhgKlJlbW92ZWQgWyR7b2xkVXNlcn1dIGZyb20gc2Vzc2lvbmApO1xyXG5cclxuICBpZiAobWVzc2FnZSlcclxuICAgIG1lc3NhZ2UuZGVsZXRlKCkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG59O1xyXG4iXX0=