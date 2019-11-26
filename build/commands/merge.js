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
class merge {
    constructor() {
        this.props = {
            requiresElevation: "owner",
            description: "copies a user's data to another user, and deletes the original",
            usage: "<old_member> <new_member>"
        };
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
}
exports.default = merge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvbWVyZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxrQkFBZ0I7QUFHaEIseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFFakMsb0RBQXdDO0FBRXhDLE1BQXFCLEtBQUs7SUFBMUI7UUFDRSxVQUFLLEdBQUc7WUFDTixpQkFBaUIsRUFBRSxPQUFPO1lBQzFCLFdBQVcsRUFBRSxnRUFBZ0U7WUFDN0UsS0FBSyxFQUFFLDJCQUEyQjtTQUNuQyxDQUFDO0lBNkRKLENBQUM7SUEzRE8sR0FBRyxDQUFDLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWM7O1lBQ3JELElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDO2dCQUNsQixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25CLENBQUMsQ0FBQyxDQUFDO1lBR0wsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRTdDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUU3QyxJQUFJLFdBQVcsR0FBRyxtQkFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RELElBQUksV0FBVyxHQUFHLG1CQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUM7Z0JBQzdDLElBQUksT0FBTztvQkFDVCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQ2xCLHlCQUF5QixPQUFPLGtCQUFrQixDQUNuRCxDQUFDOztvQkFFRixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQ2xCLDRCQUE0QixPQUFPLGtCQUFrQixDQUFDLEdBQUcsQ0FDMUQsQ0FBQztZQUVOLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDO2dCQUM3QyxJQUFJLE9BQU87b0JBQ1QsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUNsQix5QkFBeUIsT0FBTyxrQkFBa0IsQ0FDbkQsQ0FBQzs7b0JBRUYsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUNsQiw0QkFBNEIsT0FBTyxrQkFBa0IsQ0FBQyxHQUFHLENBQzFELENBQUM7WUFFTixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDaEUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO1lBRXRDLElBQUksTUFBTSxHQUFHLG1CQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLEtBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUNqRixJQUFJLFdBQVcsR0FBRyxtQkFBSSxDQUFDLHlCQUF5QixDQUM5QyxPQUFPLENBQUMsS0FBYyxFQUN0QixXQUFXLENBQ1osQ0FBQztZQUVGLEVBQUUsQ0FBQyxhQUFhLENBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsV0FBVyxHQUFHLE9BQU8sQ0FBQyxFQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQ3BDLENBQUM7WUFDRixNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNuQixJQUFJLEdBQUc7b0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QixDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxPQUFPLGdCQUFnQixDQUFDLENBQUM7WUFFbEQsSUFBSSxPQUFPO2dCQUNULE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0NBQ0Y7QUFsRUQsd0JBa0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdjb2xvcnMnO1xyXG5cclxuaW1wb3J0IHsgR3VpbGQsIE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgKiBhcyByaW1yYWYgZnJvbSAncmltcmFmJztcclxuXHJcbmltcG9ydCByc3JjIGZyb20gJy4uL2NsYXNzZXMvUmVzb3VyY2VzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG1lcmdlIHtcclxuICBwcm9wcyA9IHtcclxuICAgIHJlcXVpcmVzRWxldmF0aW9uOiBcIm93bmVyXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJjb3BpZXMgYSB1c2VyJ3MgZGF0YSB0byBhbm90aGVyIHVzZXIsIGFuZCBkZWxldGVzIHRoZSBvcmlnaW5hbFwiLFxyXG4gICAgdXNhZ2U6IFwiPG9sZF9tZW1iZXI+IDxuZXdfbWVtYmVyPlwiXHJcbiAgfTtcclxuXHJcbiAgYXN5bmMgcnVuKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkge1xyXG4gICAgaWYgKGFyZ3MubGVuZ3RoICE9IDIpXHJcbiAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwieW91IG5lZWQgdG8gc3BlY2lmeSB0d28gdXNlcnNcIikuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAvL3RoZSB1c2VyIHRvIGNvcHkgZnJvbVxyXG4gICAgY29uc3Qgb2xkVXNlciA9IGFyZ3NbMF0udHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAvL3RoZSB1c2VyIHRvIGNvcHkgdG9cclxuICAgIGNvbnN0IG5ld1VzZXIgPSBhcmdzWzFdLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIGxldCBvbGRVc2VybmFtZSA9IHJzcmMuZ2V0VXNlcm5hbWVGcm9tTWVtYmVyKG9sZFVzZXIpO1xyXG4gICAgbGV0IG5ld1VzZXJuYW1lID0gcnNyYy5nZXRVc2VybmFtZUZyb21NZW1iZXIobmV3VXNlcik7XHJcblxyXG4gICAgaWYgKCFjbGllbnQuaGFzVXNlcihtZXNzYWdlLmd1aWxkLCBvbGRVc2VybmFtZSkpXHJcbiAgICAgIGlmIChtZXNzYWdlKVxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFxyXG4gICAgICAgICAgYEkgY291bGQgbm90IGZpbmQgT0xEIFske29sZFVzZXJ9XSBpbiBteSBkYXRhYmFzZWBcclxuICAgICAgICApO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgICBgISEgSSBjb3VsZCBub3QgZmluZCBPTEQgWyR7b2xkVXNlcn1dIGluIG15IGRhdGFiYXNlYC5yZWRcclxuICAgICAgICApO1xyXG5cclxuICAgIGlmICghY2xpZW50Lmhhc1VzZXIobWVzc2FnZS5ndWlsZCwgbmV3VXNlcm5hbWUpKVxyXG4gICAgICBpZiAobWVzc2FnZSlcclxuICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcclxuICAgICAgICAgIGBJIGNvdWxkIG5vdCBmaW5kIE5FVyBbJHtuZXdVc2VyfV0gaW4gbXkgZGF0YWJhc2VgXHJcbiAgICAgICAgKTtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgICAgYCEhIEkgY291bGQgbm90IGZpbmQgTkVXIFske25ld1VzZXJ9XSBpbiBteSBkYXRhYmFzZWAucmVkXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICBsZXQgY29udGVudCA9IGNsaWVudC5nZXRVc2VyQ29udGVudChtZXNzYWdlLmd1aWxkLCBvbGRVc2VybmFtZSk7XHJcbiAgICBjb250ZW50LmhpZGRlbi51c2VybmFtZSA9IG5ld1VzZXJuYW1lO1xyXG5cclxuICAgIGxldCBzb3VyY2UgPSByc3JjLmdldFVzZXJEaXJlY3RvcnlGcm9tR3VpbGQobWVzc2FnZS5ndWlsZCBhcyBHdWlsZCwgb2xkVXNlcm5hbWUpO1xyXG4gICAgbGV0IGRlc3RpbmF0aW9uID0gcnNyYy5nZXRVc2VyRGlyZWN0b3J5RnJvbUd1aWxkKFxyXG4gICAgICBtZXNzYWdlLmd1aWxkIGFzIEd1aWxkLFxyXG4gICAgICBuZXdVc2VybmFtZVxyXG4gICAgKTtcclxuXHJcbiAgICBmcy53cml0ZUZpbGVTeW5jKFxyXG4gICAgICBwYXRoLmpvaW4oZGVzdGluYXRpb24sIG5ld1VzZXJuYW1lICsgXCIuanNvblwiKSxcclxuICAgICAgSlNPTi5zdHJpbmdpZnkoY29udGVudCwgbnVsbCwgXCJcXHRcIilcclxuICAgICk7XHJcbiAgICByaW1yYWYoc291cmNlLCBlcnIgPT4ge1xyXG4gICAgICBpZiAoZXJyKSBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY2xpZW50LnVzZXJzSW5TZXNzaW9uLmRlbGV0ZShvbGRVc2VyKTtcclxuICAgIGNvbnNvbGUubG9nKGAqUmVtb3ZlZCBbJHtvbGRVc2VyfV0gZnJvbSBzZXNzaW9uYCk7XHJcblxyXG4gICAgaWYgKG1lc3NhZ2UpXHJcbiAgICAgIG1lc3NhZ2UuZGVsZXRlKCkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuIl19