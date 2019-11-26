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
class reload {
    constructor() {
        this.props = {
            requiresElevation: "owner",
            description: "reloads a command",
            usage: "<command>"
        };
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
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
            message
                .reply(`the command "${commandName}" has been reloaded`)
                .catch(err => {
                console.log(err);
            });
        });
    }
}
exports.default = reload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3JlbG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDZCQUE2QjtBQUU3QixNQUFxQixNQUFNO0lBQTNCO1FBQ0UsVUFBSyxHQUFHO1lBQ04saUJBQWlCLEVBQUUsT0FBTztZQUMxQixXQUFXLEVBQUUsbUJBQW1CO1lBQ2hDLEtBQUssRUFBRSxXQUFXO1NBQ25CLENBQUM7SUErQkosQ0FBQztJQTdCTyxHQUFHLENBQUMsTUFBVyxFQUFFLE9BQWdCLEVBQUUsSUFBYzs7WUFDckQsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQzFCLElBQUk7b0JBQ0YsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7aUJBQ25FO2dCQUFDLE9BQU8sR0FBRyxFQUFFO29CQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2xCO1lBRUgsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRzVCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7Z0JBQ25DLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBRXRELE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FDbEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FDM0QsQ0FBQztZQUdGLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNqRSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFeEMsT0FBTztpQkFDSixLQUFLLENBQUMsZ0JBQWdCLFdBQVcscUJBQXFCLENBQUM7aUJBQ3ZELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0NBQ0Y7QUFwQ0QseUJBb0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcmVsb2FkIHtcclxuICBwcm9wcyA9IHtcclxuICAgIHJlcXVpcmVzRWxldmF0aW9uOiBcIm93bmVyXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJyZWxvYWRzIGEgY29tbWFuZFwiLFxyXG4gICAgdXNhZ2U6IFwiPGNvbW1hbmQ+XCJcclxuICB9O1xyXG5cclxuICBhc3luYyBydW4oY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UsIGFyZ3M6IHN0cmluZ1tdKSB7XHJcbiAgICBpZiAoIWFyZ3MgfHwgYXJncy5sZW5ndGggPCAxKVxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwieW91IG11c3QgcHJvdmlkZSBhIGNvbW1hbmQgbmFtZSB0byByZWxvYWRcIik7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIH1cclxuXHJcbiAgICBjb25zdCBjb21tYW5kTmFtZSA9IGFyZ3NbMF07XHJcblxyXG4gICAgLy9jaGVjayBpZiB0aGUgY29tbWFuZCBleGlzdHMgYW5kIGlzIHZhbGlkXHJcbiAgICBpZiAoIWNsaWVudC5jb21tYW5kcy5oYXMoY29tbWFuZE5hbWUpKVxyXG4gICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcInRoYXQgY29tbWFuZCBkb2VzIG5vdCBleGlzdFwiKTtcclxuXHJcbiAgICBkZWxldGUgcmVxdWlyZS5jYWNoZVtcclxuICAgICAgcmVxdWlyZS5yZXNvbHZlKHBhdGguam9pbihfX2Rpcm5hbWUsIGNvbW1hbmROYW1lICsgXCIuanNcIikpXHJcbiAgICBdO1xyXG5cclxuICAgIC8vZGVsZXRlIGFuZCByZWxvYWQgdGhlIGNvbW1hbmQgZnJvbSB0aGUgY2xpZW50LmNvbW1hbmRzIEVubWFwXHJcbiAgICBjbGllbnQuY29tbWFuZHMuZGVsZXRlKGNvbW1hbmROYW1lKTtcclxuICAgIGNvbnN0IHByb3BzID0gcmVxdWlyZShwYXRoLmpvaW4oX19kaXJuYW1lLCBjb21tYW5kTmFtZSArIFwiLmpzXCIpKTtcclxuICAgIGNsaWVudC5jb21tYW5kcy5zZXQoY29tbWFuZE5hbWUsIHByb3BzKTtcclxuXHJcbiAgICBtZXNzYWdlXHJcbiAgICAgIC5yZXBseShgdGhlIGNvbW1hbmQgXCIke2NvbW1hbmROYW1lfVwiIGhhcyBiZWVuIHJlbG9hZGVkYClcclxuICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==