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
const Resources_1 = require("../classes/Resources");
module.exports.props = {
    requiresElevation: "owner",
    description: "shuts the bot down cleanly"
};
module.exports = (client, message, userTriggered = true) => __awaiter(void 0, void 0, void 0, function* () {
    if (client.alreadyShutdown) {
        console.log("Already executed clean shutdown... restarting now".magenta);
        return true;
    }
    client.alreadyShutdown = true;
    console.log("Attempting to restart cleanly...".magenta);
    let entries = Object.entries(client.usersInSession);
    for (const [, users] of entries) {
        let allUsers = Object.entries(users);
        for (const [username, userContent] of allUsers)
            Resources_1.default.writeUserContentToFile(client, username, userContent);
    }
    if (userTriggered)
        message.delete().catch(err => {
            console.log(err);
        });
    console.log("Successfully wrote user data to files!".magenta);
    for (var i = 0; i < client.masterLog.length; i++)
        fs.appendFileSync(path.join(__dirname, "..", "logs", client.config.files.log_all), client.masterLog[i]);
    console.log("Successfully stored pending user logs!".magenta);
    console.log("Destroying client...".magenta);
    client.destroy();
    console.log("Done".yellow);
    process.exit();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9yZXN0YXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsa0JBQWdCO0FBR2hCLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFFN0Isb0RBQXdDO0FBRXhDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHO0lBQ3JCLGlCQUFpQixFQUFFLE9BQU87SUFDMUIsV0FBVyxFQUFFLDRCQUE0QjtDQUMxQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUNmLE1BQVcsRUFDWCxPQUFnQixFQUNoQixnQkFBeUIsSUFBSSxFQUM3QixFQUFFO0lBQ0YsSUFBSSxNQUFNLENBQUMsZUFBZSxFQUFFO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbURBQW1ELENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekUsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELE1BQU0sQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFeEQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDcEQsS0FBSyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxPQUFPLEVBQUU7UUFDL0IsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFZLENBQUMsQ0FBQztRQUU1QyxLQUFLLE1BQU0sQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLElBQUksUUFBUTtZQUM1QyxtQkFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7S0FDOUQ7SUFHRCxJQUFJLGFBQWE7UUFDZixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFFTCxPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRzlELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7UUFDOUMsRUFBRSxDQUFDLGNBQWMsQ0FDZixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUMvRCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUNwQixDQUFDO0lBRUosT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU5RCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUVqQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDakIsQ0FBQyxDQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2NvbG9ycyc7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbmltcG9ydCByc3JjIGZyb20gJy4uL2NsYXNzZXMvUmVzb3VyY2VzJztcclxuXHJcbm1vZHVsZS5leHBvcnRzLnByb3BzID0ge1xyXG4gIHJlcXVpcmVzRWxldmF0aW9uOiBcIm93bmVyXCIsXHJcbiAgZGVzY3JpcHRpb246IFwic2h1dHMgdGhlIGJvdCBkb3duIGNsZWFubHlcIlxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyAoXHJcbiAgY2xpZW50OiBhbnksXHJcbiAgbWVzc2FnZTogTWVzc2FnZSxcclxuICB1c2VyVHJpZ2dlcmVkOiBib29sZWFuID0gdHJ1ZVxyXG4pID0+IHtcclxuICBpZiAoY2xpZW50LmFscmVhZHlTaHV0ZG93bikge1xyXG4gICAgY29uc29sZS5sb2coXCJBbHJlYWR5IGV4ZWN1dGVkIGNsZWFuIHNodXRkb3duLi4uIHJlc3RhcnRpbmcgbm93XCIubWFnZW50YSk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNsaWVudC5hbHJlYWR5U2h1dGRvd24gPSB0cnVlO1xyXG4gIGNvbnNvbGUubG9nKFwiQXR0ZW1wdGluZyB0byByZXN0YXJ0IGNsZWFubHkuLi5cIi5tYWdlbnRhKTtcclxuXHJcbiAgbGV0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhjbGllbnQudXNlcnNJblNlc3Npb24pO1xyXG4gIGZvciAoY29uc3QgWywgdXNlcnNdIG9mIGVudHJpZXMpIHtcclxuICAgIGxldCBhbGxVc2VycyA9IE9iamVjdC5lbnRyaWVzKHVzZXJzIGFzIGFueSk7XHJcblxyXG4gICAgZm9yIChjb25zdCBbdXNlcm5hbWUsIHVzZXJDb250ZW50XSBvZiBhbGxVc2VycylcclxuICAgICAgcnNyYy53cml0ZVVzZXJDb250ZW50VG9GaWxlKGNsaWVudCwgdXNlcm5hbWUsIHVzZXJDb250ZW50KTtcclxuICB9XHJcblxyXG4gIC8vY2hlY2sgaWYgdGhlIGNvbW1hbmQgd2FzIHVzZXItdHJpZ2dlcmVkXHJcbiAgaWYgKHVzZXJUcmlnZ2VyZWQpXHJcbiAgICBtZXNzYWdlLmRlbGV0ZSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxuXHJcbiAgY29uc29sZS5sb2coXCJTdWNjZXNzZnVsbHkgd3JvdGUgdXNlciBkYXRhIHRvIGZpbGVzIVwiLm1hZ2VudGEpO1xyXG5cclxuICAvL2FwcGVuZCBhbGwgbGFzdCBsb2cgZGF0YSB0byB0aGUgbWFzdGVyIGxvZ1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xpZW50Lm1hc3RlckxvZy5sZW5ndGg7IGkrKylcclxuICAgIGZzLmFwcGVuZEZpbGVTeW5jKFxyXG4gICAgICBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uXCIsIFwibG9nc1wiLCBjbGllbnQuY29uZmlnLmZpbGVzLmxvZ19hbGwpLFxyXG4gICAgICBjbGllbnQubWFzdGVyTG9nW2ldXHJcbiAgICApO1xyXG5cclxuICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3NmdWxseSBzdG9yZWQgcGVuZGluZyB1c2VyIGxvZ3MhXCIubWFnZW50YSk7XHJcblxyXG4gIGNvbnNvbGUubG9nKFwiRGVzdHJveWluZyBjbGllbnQuLi5cIi5tYWdlbnRhKTtcclxuICBjbGllbnQuZGVzdHJveSgpO1xyXG5cclxuICBjb25zb2xlLmxvZyhcIkRvbmVcIi55ZWxsb3cpO1xyXG4gIHByb2Nlc3MuZXhpdCgpO1xyXG59O1xyXG4iXX0=