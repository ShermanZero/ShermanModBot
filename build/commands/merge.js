"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
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
module.exports.run = (client, message, args) =>
  __awaiter(void 0, void 0, void 0, function*() {
    if (args.length != 2)
      return message.reply("you need to specify two users").catch(err => {
        console.log(err);
      });
    const oldUser = args[0].trim().toLowerCase();
    const newUser = args[1].trim().toLowerCase();
    let oldUsername = Resources_1.default.getUsernameFromMember(oldUser);
    let newUsername = Resources_1.default.getUsernameFromMember(newUser);
    if (!client.hasUser(message.guild, oldUsername))
      if (message) return message.reply(`I could not find OLD [${oldUser}] in my database`);
      else return console.error(`!! I could not find OLD [${oldUser}] in my database`.red);
    if (!client.hasUser(message.guild, newUsername))
      if (message) return message.reply(`I could not find NEW [${newUser}] in my database`);
      else return console.error(`!! I could not find NEW [${newUser}] in my database`.red);
    let content = client.getUserContent(message.guild, oldUsername);
    content.hidden.username = newUsername;
    let source = Resources_1.default.getUserDirectoryFromGuild(message.guild, oldUsername);
    let destination = Resources_1.default.getUserDirectoryFromGuild(message.guild, newUsername);
    fs.writeFileSync(path.join(destination, newUsername + ".json"), JSON.stringify(content, null, "\t"));
    rimraf(source, err => {
      if (err) console.log(err);
    });
    client.usersInSession.delete(oldUser);
    console.log(`*Removed [${oldUser}] from session`);
    if (message)
      message.delete().catch(err => {
        console.log(err);
      });
  });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvbWVyZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxrQkFBZ0I7QUFHaEIseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFFakMsb0RBQXdDO0FBRXhDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHO0lBQ3JCLGlCQUFpQixFQUFFLE9BQU87SUFDMUIsV0FBVyxFQUFFLGdFQUFnRTtJQUM3RSxLQUFLLEVBQUUsMkJBQTJCO0NBQ25DLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWMsRUFBRSxFQUFFO0lBQzNFLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDO1FBQ2xCLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNoRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBR0wsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRTdDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUU3QyxJQUFJLFdBQVcsR0FBRyxtQkFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELElBQUksV0FBVyxHQUFHLG1CQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUM7UUFDN0MsSUFBSSxPQUFPO1lBQ1QsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixPQUFPLGtCQUFrQixDQUFDLENBQUM7O1lBRXpFLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FDbEIsNEJBQTRCLE9BQU8sa0JBQWtCLENBQUMsR0FBRyxDQUMxRCxDQUFDO0lBRU4sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUM7UUFDN0MsSUFBSSxPQUFPO1lBQ1QsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixPQUFPLGtCQUFrQixDQUFDLENBQUM7O1lBRXpFLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FDbEIsNEJBQTRCLE9BQU8sa0JBQWtCLENBQUMsR0FBRyxDQUMxRCxDQUFDO0lBRU4sSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2hFLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQztJQUV0QyxJQUFJLE1BQU0sR0FBRyxtQkFBSSxDQUFDLHlCQUF5QixDQUN6QyxPQUFPLENBQUMsS0FBYyxFQUN0QixXQUFXLENBQ1osQ0FBQztJQUNGLElBQUksV0FBVyxHQUFHLG1CQUFJLENBQUMseUJBQXlCLENBQzlDLE9BQU8sQ0FBQyxLQUFjLEVBQ3RCLFdBQVcsQ0FDWixDQUFDO0lBRUYsRUFBRSxDQUFDLGFBQWEsQ0FDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxXQUFXLEdBQUcsT0FBTyxDQUFDLEVBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FDcEMsQ0FBQztJQUNGLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUU7UUFDbkIsSUFBSSxHQUFHO1lBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxPQUFPLGdCQUFnQixDQUFDLENBQUM7SUFFbEQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2NvbG9ycyc7XHJcblxyXG5pbXBvcnQgeyBHdWlsZCwgTWVzc2FnZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIHJpbXJhZiBmcm9tICdyaW1yYWYnO1xyXG5cclxuaW1wb3J0IHJzcmMgZnJvbSAnLi4vY2xhc3Nlcy9SZXNvdXJjZXMnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XHJcbiAgcmVxdWlyZXNFbGV2YXRpb246IFwib3duZXJcIixcclxuICBkZXNjcmlwdGlvbjogXCJjb3BpZXMgYSB1c2VyJ3MgZGF0YSB0byBhbm90aGVyIHVzZXIsIGFuZCBkZWxldGVzIHRoZSBvcmlnaW5hbFwiLFxyXG4gIHVzYWdlOiBcIjxvbGRfbWVtYmVyPiA8bmV3X21lbWJlcj5cIlxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMucnVuID0gYXN5bmMgKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkgPT4ge1xyXG4gIGlmIChhcmdzLmxlbmd0aCAhPSAyKVxyXG4gICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJ5b3UgbmVlZCB0byBzcGVjaWZ5IHR3byB1c2Vyc1wiKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcblxyXG4gIC8vdGhlIHVzZXIgdG8gY29weSBmcm9tXHJcbiAgY29uc3Qgb2xkVXNlciA9IGFyZ3NbMF0udHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgLy90aGUgdXNlciB0byBjb3B5IHRvXHJcbiAgY29uc3QgbmV3VXNlciA9IGFyZ3NbMV0udHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gIGxldCBvbGRVc2VybmFtZSA9IHJzcmMuZ2V0VXNlcm5hbWVGcm9tTWVtYmVyKG9sZFVzZXIpO1xyXG4gIGxldCBuZXdVc2VybmFtZSA9IHJzcmMuZ2V0VXNlcm5hbWVGcm9tTWVtYmVyKG5ld1VzZXIpO1xyXG5cclxuICBpZiAoIWNsaWVudC5oYXNVc2VyKG1lc3NhZ2UuZ3VpbGQsIG9sZFVzZXJuYW1lKSlcclxuICAgIGlmIChtZXNzYWdlKVxyXG4gICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgSSBjb3VsZCBub3QgZmluZCBPTEQgWyR7b2xkVXNlcn1dIGluIG15IGRhdGFiYXNlYCk7XHJcbiAgICBlbHNlXHJcbiAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgIGAhISBJIGNvdWxkIG5vdCBmaW5kIE9MRCBbJHtvbGRVc2VyfV0gaW4gbXkgZGF0YWJhc2VgLnJlZFxyXG4gICAgICApO1xyXG5cclxuICBpZiAoIWNsaWVudC5oYXNVc2VyKG1lc3NhZ2UuZ3VpbGQsIG5ld1VzZXJuYW1lKSlcclxuICAgIGlmIChtZXNzYWdlKVxyXG4gICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShgSSBjb3VsZCBub3QgZmluZCBORVcgWyR7bmV3VXNlcn1dIGluIG15IGRhdGFiYXNlYCk7XHJcbiAgICBlbHNlXHJcbiAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgIGAhISBJIGNvdWxkIG5vdCBmaW5kIE5FVyBbJHtuZXdVc2VyfV0gaW4gbXkgZGF0YWJhc2VgLnJlZFxyXG4gICAgICApO1xyXG5cclxuICBsZXQgY29udGVudCA9IGNsaWVudC5nZXRVc2VyQ29udGVudChtZXNzYWdlLmd1aWxkLCBvbGRVc2VybmFtZSk7XHJcbiAgY29udGVudC5oaWRkZW4udXNlcm5hbWUgPSBuZXdVc2VybmFtZTtcclxuXHJcbiAgbGV0IHNvdXJjZSA9IHJzcmMuZ2V0VXNlckRpcmVjdG9yeUZyb21HdWlsZChcclxuICAgIG1lc3NhZ2UuZ3VpbGQgYXMgR3VpbGQsXHJcbiAgICBvbGRVc2VybmFtZVxyXG4gICk7XHJcbiAgbGV0IGRlc3RpbmF0aW9uID0gcnNyYy5nZXRVc2VyRGlyZWN0b3J5RnJvbUd1aWxkKFxyXG4gICAgbWVzc2FnZS5ndWlsZCBhcyBHdWlsZCxcclxuICAgIG5ld1VzZXJuYW1lXHJcbiAgKTtcclxuXHJcbiAgZnMud3JpdGVGaWxlU3luYyhcclxuICAgIHBhdGguam9pbihkZXN0aW5hdGlvbiwgbmV3VXNlcm5hbWUgKyBcIi5qc29uXCIpLFxyXG4gICAgSlNPTi5zdHJpbmdpZnkoY29udGVudCwgbnVsbCwgXCJcXHRcIilcclxuICApO1xyXG4gIHJpbXJhZihzb3VyY2UsIGVyciA9PiB7XHJcbiAgICBpZiAoZXJyKSBjb25zb2xlLmxvZyhlcnIpO1xyXG4gIH0pO1xyXG5cclxuICBjbGllbnQudXNlcnNJblNlc3Npb24uZGVsZXRlKG9sZFVzZXIpO1xyXG4gIGNvbnNvbGUubG9nKGAqUmVtb3ZlZCBbJHtvbGRVc2VyfV0gZnJvbSBzZXNzaW9uYCk7XHJcblxyXG4gIGlmIChtZXNzYWdlKVxyXG4gICAgbWVzc2FnZS5kZWxldGUoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcbn07XHJcbiJdfQ==
