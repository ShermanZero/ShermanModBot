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
const path = require("path");
module.exports.props = {
  requiresElevation: "owner",
  description: "reloads a command",
  usage: "<command>"
};
module.exports.run = (client, message, args) =>
  __awaiter(void 0, void 0, void 0, function*() {
    if (!args || args.length < 1)
      try {
        return message.reply("you must provide a command name to reload");
      } catch (err) {
        console.log(err);
      }
    const commandName = args[0];
    if (!client.commands.has(commandName)) return message.reply("that command does not exist");
    delete require.cache[require.resolve(path.join(__dirname, commandName + ".js"))];
    client.commands.delete(commandName);
    const props = require(path.join(__dirname, commandName + ".js"));
    client.commands.set(commandName, props);
    message.reply(`the command "${commandName}" has been reloaded`).catch(err => {
      console.log(err);
    });
  });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3JlbG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDZCQUE2QjtBQUU3QixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixpQkFBaUIsRUFBRSxPQUFPO0lBQzFCLFdBQVcsRUFBRSxtQkFBbUI7SUFDaEMsS0FBSyxFQUFFLFdBQVc7Q0FDbkIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQU8sTUFBVyxFQUFFLE9BQWdCLEVBQUUsSUFBYyxFQUFFLEVBQUU7SUFDM0UsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7UUFDMUIsSUFBSTtZQUNGLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1NBQ25FO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2xCO0lBRUgsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRzVCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDbkMsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFFdEQsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUNsQixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUMzRCxDQUFDO0lBR0YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUV4QyxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixXQUFXLHFCQUFxQixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbm1vZHVsZS5leHBvcnRzLnByb3BzID0ge1xyXG4gIHJlcXVpcmVzRWxldmF0aW9uOiBcIm93bmVyXCIsXHJcbiAgZGVzY3JpcHRpb246IFwicmVsb2FkcyBhIGNvbW1hbmRcIixcclxuICB1c2FnZTogXCI8Y29tbWFuZD5cIlxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMucnVuID0gYXN5bmMgKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkgPT4ge1xyXG4gIGlmICghYXJncyB8fCBhcmdzLmxlbmd0aCA8IDEpXHJcbiAgICB0cnkge1xyXG4gICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcInlvdSBtdXN0IHByb3ZpZGUgYSBjb21tYW5kIG5hbWUgdG8gcmVsb2FkXCIpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9XHJcblxyXG4gIGNvbnN0IGNvbW1hbmROYW1lID0gYXJnc1swXTtcclxuXHJcbiAgLy9jaGVjayBpZiB0aGUgY29tbWFuZCBleGlzdHMgYW5kIGlzIHZhbGlkXHJcbiAgaWYgKCFjbGllbnQuY29tbWFuZHMuaGFzKGNvbW1hbmROYW1lKSlcclxuICAgIHJldHVybiBtZXNzYWdlLnJlcGx5KFwidGhhdCBjb21tYW5kIGRvZXMgbm90IGV4aXN0XCIpO1xyXG5cclxuICBkZWxldGUgcmVxdWlyZS5jYWNoZVtcclxuICAgIHJlcXVpcmUucmVzb2x2ZShwYXRoLmpvaW4oX19kaXJuYW1lLCBjb21tYW5kTmFtZSArIFwiLmpzXCIpKVxyXG4gIF07XHJcblxyXG4gIC8vZGVsZXRlIGFuZCByZWxvYWQgdGhlIGNvbW1hbmQgZnJvbSB0aGUgY2xpZW50LmNvbW1hbmRzIEVubWFwXHJcbiAgY2xpZW50LmNvbW1hbmRzLmRlbGV0ZShjb21tYW5kTmFtZSk7XHJcbiAgY29uc3QgcHJvcHMgPSByZXF1aXJlKHBhdGguam9pbihfX2Rpcm5hbWUsIGNvbW1hbmROYW1lICsgXCIuanNcIikpO1xyXG4gIGNsaWVudC5jb21tYW5kcy5zZXQoY29tbWFuZE5hbWUsIHByb3BzKTtcclxuXHJcbiAgbWVzc2FnZS5yZXBseShgdGhlIGNvbW1hbmQgXCIke2NvbW1hbmROYW1lfVwiIGhhcyBiZWVuIHJlbG9hZGVkYCkuY2F0Y2goZXJyID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgfSk7XHJcbn07XHJcbiJdfQ==
