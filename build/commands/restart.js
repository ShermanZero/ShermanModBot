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
const Resources_1 = require("../classes/Resources");
module.exports.props = {
  requiresElevation: "owner",
  description: "shuts the bot down cleanly"
};
module.exports.run = (client, message, userTriggered = true) =>
  __awaiter(void 0, void 0, void 0, function*() {
    if (client.alreadyShutdown) {
      console.log("Already executed clean shutdown... restarting now".magenta);
      return true;
    }
    client.alreadyShutdown = true;
    console.log("Attempting to restart cleanly...".magenta);
    let entries = Object.entries(client.usersInSession);
    for (const [, users] of entries) {
      let allUsers = Object.entries(users);
      for (const [username, userContent] of allUsers) Resources_1.default.writeUserContentToFile(client, username, userContent);
    }
    if (userTriggered)
      message.delete().catch(err => {
        console.log(err);
      });
    console.log("Successfully wrote user data to files!".magenta);
    for (var i = 0; i < client.masterLog.length; i++) fs.appendFileSync(path.join(__dirname, "..", "logs", client.config.files.log_all), client.masterLog[i]);
    console.log("Successfully stored pending user logs!".magenta);
    console.log("Destroying client...".magenta);
    client.destroy();
    console.log("Done".yellow);
    process.exit();
  });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9yZXN0YXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsa0JBQWdCO0FBR2hCLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFFN0Isb0RBQXdDO0FBRXhDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHO0lBQ3JCLGlCQUFpQixFQUFFLE9BQU87SUFDMUIsV0FBVyxFQUFFLDRCQUE0QjtDQUMxQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FDbkIsTUFBVyxFQUNYLE9BQWdCLEVBQ2hCLGdCQUF5QixJQUFJLEVBQzdCLEVBQUU7SUFDRixJQUFJLE1BQU0sQ0FBQyxlQUFlLEVBQUU7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6RSxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsTUFBTSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV4RCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNwRCxLQUFLLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLE9BQU8sRUFBRTtRQUMvQixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQVksQ0FBQyxDQUFDO1FBRTVDLEtBQUssTUFBTSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsSUFBSSxRQUFRO1lBQzVDLG1CQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztLQUM5RDtJQUdELElBQUksYUFBYTtRQUNmLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUVMLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsT0FBTyxDQUFDLENBQUM7SUFHOUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtRQUM5QyxFQUFFLENBQUMsY0FBYyxDQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQy9ELE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQ3BCLENBQUM7SUFFSixPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTlELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRWpCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNqQixDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnY29sb3JzJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuaW1wb3J0IHJzcmMgZnJvbSAnLi4vY2xhc3Nlcy9SZXNvdXJjZXMnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XHJcbiAgcmVxdWlyZXNFbGV2YXRpb246IFwib3duZXJcIixcclxuICBkZXNjcmlwdGlvbjogXCJzaHV0cyB0aGUgYm90IGRvd24gY2xlYW5seVwiXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5ydW4gPSBhc3luYyAoXHJcbiAgY2xpZW50OiBhbnksXHJcbiAgbWVzc2FnZTogTWVzc2FnZSxcclxuICB1c2VyVHJpZ2dlcmVkOiBib29sZWFuID0gdHJ1ZVxyXG4pID0+IHtcclxuICBpZiAoY2xpZW50LmFscmVhZHlTaHV0ZG93bikge1xyXG4gICAgY29uc29sZS5sb2coXCJBbHJlYWR5IGV4ZWN1dGVkIGNsZWFuIHNodXRkb3duLi4uIHJlc3RhcnRpbmcgbm93XCIubWFnZW50YSk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNsaWVudC5hbHJlYWR5U2h1dGRvd24gPSB0cnVlO1xyXG4gIGNvbnNvbGUubG9nKFwiQXR0ZW1wdGluZyB0byByZXN0YXJ0IGNsZWFubHkuLi5cIi5tYWdlbnRhKTtcclxuXHJcbiAgbGV0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhjbGllbnQudXNlcnNJblNlc3Npb24pO1xyXG4gIGZvciAoY29uc3QgWywgdXNlcnNdIG9mIGVudHJpZXMpIHtcclxuICAgIGxldCBhbGxVc2VycyA9IE9iamVjdC5lbnRyaWVzKHVzZXJzIGFzIGFueSk7XHJcblxyXG4gICAgZm9yIChjb25zdCBbdXNlcm5hbWUsIHVzZXJDb250ZW50XSBvZiBhbGxVc2VycylcclxuICAgICAgcnNyYy53cml0ZVVzZXJDb250ZW50VG9GaWxlKGNsaWVudCwgdXNlcm5hbWUsIHVzZXJDb250ZW50KTtcclxuICB9XHJcblxyXG4gIC8vY2hlY2sgaWYgdGhlIGNvbW1hbmQgd2FzIHVzZXItdHJpZ2dlcmVkXHJcbiAgaWYgKHVzZXJUcmlnZ2VyZWQpXHJcbiAgICBtZXNzYWdlLmRlbGV0ZSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxuXHJcbiAgY29uc29sZS5sb2coXCJTdWNjZXNzZnVsbHkgd3JvdGUgdXNlciBkYXRhIHRvIGZpbGVzIVwiLm1hZ2VudGEpO1xyXG5cclxuICAvL2FwcGVuZCBhbGwgbGFzdCBsb2cgZGF0YSB0byB0aGUgbWFzdGVyIGxvZ1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xpZW50Lm1hc3RlckxvZy5sZW5ndGg7IGkrKylcclxuICAgIGZzLmFwcGVuZEZpbGVTeW5jKFxyXG4gICAgICBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uXCIsIFwibG9nc1wiLCBjbGllbnQuY29uZmlnLmZpbGVzLmxvZ19hbGwpLFxyXG4gICAgICBjbGllbnQubWFzdGVyTG9nW2ldXHJcbiAgICApO1xyXG5cclxuICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3NmdWxseSBzdG9yZWQgcGVuZGluZyB1c2VyIGxvZ3MhXCIubWFnZW50YSk7XHJcblxyXG4gIGNvbnNvbGUubG9nKFwiRGVzdHJveWluZyBjbGllbnQuLi5cIi5tYWdlbnRhKTtcclxuICBjbGllbnQuZGVzdHJveSgpO1xyXG5cclxuICBjb25zb2xlLmxvZyhcIkRvbmVcIi55ZWxsb3cpO1xyXG4gIHByb2Nlc3MuZXhpdCgpO1xyXG59O1xyXG4iXX0=
