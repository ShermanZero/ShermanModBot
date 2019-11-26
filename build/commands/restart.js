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
class restart {
    constructor() {
        this.props = {
            requiresElevation: "owner",
            description: "shuts the bot down cleanly",
        };
    }
    run(client, message, userTriggered = true) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
}
exports.default = restart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9yZXN0YXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsa0JBQWdCO0FBR2hCLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFFN0Isb0RBQXdDO0FBRXhDLE1BQXFCLE9BQU87SUFBNUI7UUFDRSxVQUFLLEdBQUc7WUFDTixpQkFBaUIsRUFBRSxPQUFPO1lBQzFCLFdBQVcsRUFBRSw0QkFBNEI7U0FDMUMsQ0FBQztJQTBDSixDQUFDO0lBeENPLEdBQUcsQ0FBQyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxnQkFBeUIsSUFBSTs7WUFDcEUsSUFBSSxNQUFNLENBQUMsZUFBZSxFQUFFO2dCQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLG1EQUFtRCxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN6RSxPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsTUFBTSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7WUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV4RCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNwRCxLQUFLLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLE9BQU8sRUFBRTtnQkFDL0IsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFZLENBQUMsQ0FBQztnQkFFNUMsS0FBSyxNQUFNLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxJQUFJLFFBQVE7b0JBQzVDLG1CQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQzthQUM5RDtZQUdELElBQUksYUFBYTtnQkFDZixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixDQUFDLENBQUMsQ0FBQztZQUVMLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsT0FBTyxDQUFDLENBQUM7WUFHOUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtnQkFDOUMsRUFBRSxDQUFDLGNBQWMsQ0FDZixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUMvRCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUNwQixDQUFDO1lBRUosT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUU5RCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUVqQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakIsQ0FBQztLQUFBO0NBQ0Y7QUE5Q0QsMEJBOENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdjb2xvcnMnO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5pbXBvcnQgcnNyYyBmcm9tICcuLi9jbGFzc2VzL1Jlc291cmNlcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyByZXN0YXJ0IHtcclxuICBwcm9wcyA9IHtcclxuICAgIHJlcXVpcmVzRWxldmF0aW9uOiBcIm93bmVyXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJzaHV0cyB0aGUgYm90IGRvd24gY2xlYW5seVwiLFxyXG4gIH07XHJcblxyXG4gIGFzeW5jIHJ1bihjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSwgdXNlclRyaWdnZXJlZDogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgIGlmIChjbGllbnQuYWxyZWFkeVNodXRkb3duKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiQWxyZWFkeSBleGVjdXRlZCBjbGVhbiBzaHV0ZG93bi4uLiByZXN0YXJ0aW5nIG5vd1wiLm1hZ2VudGEpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjbGllbnQuYWxyZWFkeVNodXRkb3duID0gdHJ1ZTtcclxuICAgIGNvbnNvbGUubG9nKFwiQXR0ZW1wdGluZyB0byByZXN0YXJ0IGNsZWFubHkuLi5cIi5tYWdlbnRhKTtcclxuXHJcbiAgICBsZXQgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKGNsaWVudC51c2Vyc0luU2Vzc2lvbik7XHJcbiAgICBmb3IgKGNvbnN0IFssIHVzZXJzXSBvZiBlbnRyaWVzKSB7XHJcbiAgICAgIGxldCBhbGxVc2VycyA9IE9iamVjdC5lbnRyaWVzKHVzZXJzIGFzIGFueSk7XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IFt1c2VybmFtZSwgdXNlckNvbnRlbnRdIG9mIGFsbFVzZXJzKVxyXG4gICAgICAgIHJzcmMud3JpdGVVc2VyQ29udGVudFRvRmlsZShjbGllbnQsIHVzZXJuYW1lLCB1c2VyQ29udGVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jaGVjayBpZiB0aGUgY29tbWFuZCB3YXMgdXNlci10cmlnZ2VyZWRcclxuICAgIGlmICh1c2VyVHJpZ2dlcmVkKVxyXG4gICAgICBtZXNzYWdlLmRlbGV0ZSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJTdWNjZXNzZnVsbHkgd3JvdGUgdXNlciBkYXRhIHRvIGZpbGVzIVwiLm1hZ2VudGEpO1xyXG5cclxuICAgIC8vYXBwZW5kIGFsbCBsYXN0IGxvZyBkYXRhIHRvIHRoZSBtYXN0ZXIgbG9nXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsaWVudC5tYXN0ZXJMb2cubGVuZ3RoOyBpKyspXHJcbiAgICAgIGZzLmFwcGVuZEZpbGVTeW5jKFxyXG4gICAgICAgIHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi5cIiwgXCJsb2dzXCIsIGNsaWVudC5jb25maWcuZmlsZXMubG9nX2FsbCksXHJcbiAgICAgICAgY2xpZW50Lm1hc3RlckxvZ1tpXVxyXG4gICAgICApO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiU3VjY2Vzc2Z1bGx5IHN0b3JlZCBwZW5kaW5nIHVzZXIgbG9ncyFcIi5tYWdlbnRhKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIkRlc3Ryb3lpbmcgY2xpZW50Li4uXCIubWFnZW50YSk7XHJcbiAgICBjbGllbnQuZGVzdHJveSgpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiRG9uZVwiLnllbGxvdyk7XHJcbiAgICBwcm9jZXNzLmV4aXQoKTtcclxuICB9XHJcbn1cclxuIl19