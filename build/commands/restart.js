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
const global_config_1 = require("../resources/global_config");
module.exports.props = {
    requiresElevation: global_config_1.default.elevation_names.botowner,
    description: "shuts the bot down cleanly"
};
module.exports.run = (client, message, userTriggered = true) => __awaiter(void 0, void 0, void 0, function* () {
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
        fs.appendFileSync(path.join(__dirname, "..", "logs", client.global_config.files.log_all), client.masterLog[i]);
    console.log("Successfully stored pending user logs!".magenta);
    console.log("Destroying client...".magenta);
    client.destroy();
    console.log("Done".yellow);
    process.exit();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9yZXN0YXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsa0JBQWdCO0FBR2hCLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFFN0Isb0RBQXdDO0FBQ3hDLDhEQUFnRDtBQUVoRCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixpQkFBaUIsRUFBRSx1QkFBTSxDQUFDLGVBQWUsQ0FBQyxRQUFRO0lBQ2xELFdBQVcsRUFBRSw0QkFBNEI7Q0FDMUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQU8sTUFBVyxFQUFFLE9BQWdCLEVBQUUsZ0JBQXlCLElBQUksRUFBRSxFQUFFO0lBQzFGLElBQUksTUFBTSxDQUFDLGVBQWUsRUFBRTtRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLG1EQUFtRCxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pFLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxNQUFNLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXhELElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3BELEtBQUssTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksT0FBTyxFQUFFO1FBQy9CLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBWSxDQUFDLENBQUM7UUFFNUMsS0FBSyxNQUFNLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxJQUFJLFFBQVE7WUFBRSxtQkFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7S0FDNUc7SUFHRCxJQUFJLGFBQWE7UUFDZixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFFTCxPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRzlELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7UUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWpLLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2pCLENBQUMsQ0FBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdjb2xvcnMnO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5pbXBvcnQgcnNyYyBmcm9tICcuLi9jbGFzc2VzL1Jlc291cmNlcyc7XHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vcmVzb3VyY2VzL2dsb2JhbF9jb25maWcnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XHJcbiAgcmVxdWlyZXNFbGV2YXRpb246IGNvbmZpZy5lbGV2YXRpb25fbmFtZXMuYm90b3duZXIsXHJcbiAgZGVzY3JpcHRpb246IFwic2h1dHMgdGhlIGJvdCBkb3duIGNsZWFubHlcIlxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMucnVuID0gYXN5bmMgKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCB1c2VyVHJpZ2dlcmVkOiBib29sZWFuID0gdHJ1ZSkgPT4ge1xyXG4gIGlmIChjbGllbnQuYWxyZWFkeVNodXRkb3duKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkFscmVhZHkgZXhlY3V0ZWQgY2xlYW4gc2h1dGRvd24uLi4gcmVzdGFydGluZyBub3dcIi5tYWdlbnRhKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgY2xpZW50LmFscmVhZHlTaHV0ZG93biA9IHRydWU7XHJcbiAgY29uc29sZS5sb2coXCJBdHRlbXB0aW5nIHRvIHJlc3RhcnQgY2xlYW5seS4uLlwiLm1hZ2VudGEpO1xyXG5cclxuICBsZXQgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKGNsaWVudC51c2Vyc0luU2Vzc2lvbik7XHJcbiAgZm9yIChjb25zdCBbLCB1c2Vyc10gb2YgZW50cmllcykge1xyXG4gICAgbGV0IGFsbFVzZXJzID0gT2JqZWN0LmVudHJpZXModXNlcnMgYXMgYW55KTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IFt1c2VybmFtZSwgdXNlckNvbnRlbnRdIG9mIGFsbFVzZXJzKSByc3JjLndyaXRlVXNlckNvbnRlbnRUb0ZpbGUoY2xpZW50LCB1c2VybmFtZSwgdXNlckNvbnRlbnQpO1xyXG4gIH1cclxuXHJcbiAgLy9jaGVjayBpZiB0aGUgY29tbWFuZCB3YXMgdXNlci10cmlnZ2VyZWRcclxuICBpZiAodXNlclRyaWdnZXJlZClcclxuICAgIG1lc3NhZ2UuZGVsZXRlKCkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG5cclxuICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3NmdWxseSB3cm90ZSB1c2VyIGRhdGEgdG8gZmlsZXMhXCIubWFnZW50YSk7XHJcblxyXG4gIC8vYXBwZW5kIGFsbCBsYXN0IGxvZyBkYXRhIHRvIHRoZSBtYXN0ZXIgbG9nXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGllbnQubWFzdGVyTG9nLmxlbmd0aDsgaSsrKSBmcy5hcHBlbmRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uXCIsIFwibG9nc1wiLCBjbGllbnQuZ2xvYmFsX2NvbmZpZy5maWxlcy5sb2dfYWxsKSwgY2xpZW50Lm1hc3RlckxvZ1tpXSk7XHJcblxyXG4gIGNvbnNvbGUubG9nKFwiU3VjY2Vzc2Z1bGx5IHN0b3JlZCBwZW5kaW5nIHVzZXIgbG9ncyFcIi5tYWdlbnRhKTtcclxuXHJcbiAgY29uc29sZS5sb2coXCJEZXN0cm95aW5nIGNsaWVudC4uLlwiLm1hZ2VudGEpO1xyXG4gIGNsaWVudC5kZXN0cm95KCk7XHJcblxyXG4gIGNvbnNvbGUubG9nKFwiRG9uZVwiLnllbGxvdyk7XHJcbiAgcHJvY2Vzcy5leGl0KCk7XHJcbn07XHJcbiJdfQ==