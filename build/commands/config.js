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
const fs = require("fs");
const path = require("path");
const Resources_1 = require("../classes/Resources");
const guild_config_1 = require("../resources/guild_config");
module.exports.props = {
  requiresElevetaion: "owner",
  description: "sets up the discord bot for the server"
};
module.exports.run = (client, message) =>
  __awaiter(void 0, void 0, void 0, function*() {
    let guildDir;
    if (message.guild) guildDir = Resources_1.default.getGuildDirectoryFromGuild(message.guild);
    else guildDir = null;
    if (!guildDir) return yield message.reply("you are not messaging me from a guild!");
    let configFile = path.resolve(guildDir, "config.js");
    if (!fs.existsSync(configFile)) yield message.reply("you don't appear to have a configuration set up for your guild, let's create one");
    fs.writeFileSync(configFile, JSON.stringify(guild_config_1.default, null, "\t"));
    let response = yield askQuestion(message.channel, "What is the owner's role ID?  You can mention them, the role, or input the ID directly if you know it");
    console.log("response", response);
  });
function askQuestion(channel, question, options = { max: 1, time: 30000, errors: ["time"] }) {
  return __awaiter(this, void 0, void 0, function*() {
    yield channel.send(question);
    yield channel
      .awaitMessages(response => response.content, options)
      .then(collected => {
        return collected;
      })
      .catch(collected => {
        channel.send("No answer was given in time, aborting setup.  Run !config to rereun setup");
        return null;
      });
  });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFFN0Isb0RBQTZDO0FBQzdDLDREQUFvRDtBQUVwRCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixrQkFBa0IsRUFBRSxPQUFPO0lBQzNCLFdBQVcsRUFBRSx3Q0FBd0M7Q0FDdEQsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQU8sTUFBVyxFQUFFLE9BQWdCLEVBQUUsRUFBRTtJQUMzRCxJQUFJLFFBQWdCLENBQUM7SUFFckIsSUFBSSxPQUFPLENBQUMsS0FBSztRQUFFLFFBQVEsR0FBRyxtQkFBUyxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7UUFDN0UsUUFBUSxHQUFHLElBQVcsQ0FBQztJQUU1QixJQUFJLENBQUMsUUFBUTtRQUFFLE9BQU8sTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7SUFFcEYsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDckQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1FBQUUsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLGtGQUFrRixDQUFDLENBQUM7SUFFeEksRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBVyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXRFLElBQUksUUFBUSxHQUFHLE1BQU0sV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFzQixFQUFFLHVHQUF1RyxDQUFDLENBQUM7SUFFMUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFcEMsQ0FBQyxDQUFBLENBQUM7QUFFRixTQUFlLFdBQVcsQ0FBQyxPQUFvQixFQUFFLFFBQWdCLEVBQUUsT0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFOztRQUNwSCxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsTUFBTSxPQUFPO2FBQ1YsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7YUFDcEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2hCLE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLDJFQUEyRSxDQUFDLENBQUM7WUFDMUYsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2UsIFRleHRDaGFubmVsIH0gZnJvbSAnZGlzY29yZC5qcyc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgUmVzb3VyY2VzIGZyb20gJy4uL2NsYXNzZXMvUmVzb3VyY2VzJztcbmltcG9ydCB1c2VyX2NvbmZpZyBmcm9tICcuLi9yZXNvdXJjZXMvZ3VpbGRfY29uZmlnJztcblxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XG4gIHJlcXVpcmVzRWxldmV0YWlvbjogXCJvd25lclwiLFxuICBkZXNjcmlwdGlvbjogXCJzZXRzIHVwIHRoZSBkaXNjb3JkIGJvdCBmb3IgdGhlIHNlcnZlclwiXG59O1xuXG5tb2R1bGUuZXhwb3J0cy5ydW4gPSBhc3luYyAoY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHtcbiAgbGV0IGd1aWxkRGlyOiBzdHJpbmc7XG5cbiAgaWYgKG1lc3NhZ2UuZ3VpbGQpIGd1aWxkRGlyID0gUmVzb3VyY2VzLmdldEd1aWxkRGlyZWN0b3J5RnJvbUd1aWxkKG1lc3NhZ2UuZ3VpbGQpO1xuICBlbHNlIGd1aWxkRGlyID0gbnVsbCBhcyBhbnk7XG5cbiAgaWYgKCFndWlsZERpcikgcmV0dXJuIGF3YWl0IG1lc3NhZ2UucmVwbHkoXCJ5b3UgYXJlIG5vdCBtZXNzYWdpbmcgbWUgZnJvbSBhIGd1aWxkIVwiKTtcblxuICBsZXQgY29uZmlnRmlsZSA9IHBhdGgucmVzb2x2ZShndWlsZERpciwgXCJjb25maWcuanNcIik7XG4gIGlmICghZnMuZXhpc3RzU3luYyhjb25maWdGaWxlKSkgYXdhaXQgbWVzc2FnZS5yZXBseShcInlvdSBkb24ndCBhcHBlYXIgdG8gaGF2ZSBhIGNvbmZpZ3VyYXRpb24gc2V0IHVwIGZvciB5b3VyIGd1aWxkLCBsZXQncyBjcmVhdGUgb25lXCIpO1xuXG4gIGZzLndyaXRlRmlsZVN5bmMoY29uZmlnRmlsZSwgSlNPTi5zdHJpbmdpZnkodXNlcl9jb25maWcsIG51bGwsIFwiXFx0XCIpKTtcblxuICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBhc2tRdWVzdGlvbihtZXNzYWdlLmNoYW5uZWwgYXMgVGV4dENoYW5uZWwsIFwiV2hhdCBpcyB0aGUgb3duZXIncyByb2xlIElEPyAgWW91IGNhbiBtZW50aW9uIHRoZW0sIHRoZSByb2xlLCBvciBpbnB1dCB0aGUgSUQgZGlyZWN0bHkgaWYgeW91IGtub3cgaXRcIik7XG5cbiAgY29uc29sZS5sb2coXCJyZXNwb25zZVwiLCByZXNwb25zZSk7XG5cbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGFza1F1ZXN0aW9uKGNoYW5uZWw6IFRleHRDaGFubmVsLCBxdWVzdGlvbjogc3RyaW5nLCBvcHRpb25zID0geyBtYXg6IDEsIHRpbWU6IDMwMDAwLCBlcnJvcnM6IFtcInRpbWVcIl0gfSkge1xuICBhd2FpdCBjaGFubmVsLnNlbmQocXVlc3Rpb24pO1xuICBhd2FpdCBjaGFubmVsXG4gICAgLmF3YWl0TWVzc2FnZXMocmVzcG9uc2UgPT4gcmVzcG9uc2UuY29udGVudCwgb3B0aW9ucylcbiAgICAudGhlbihjb2xsZWN0ZWQgPT4ge1xuICAgICAgcmV0dXJuIGNvbGxlY3RlZDtcbiAgICB9KVxuICAgIC5jYXRjaChjb2xsZWN0ZWQgPT4ge1xuICAgICAgY2hhbm5lbC5zZW5kKFwiTm8gYW5zd2VyIHdhcyBnaXZlbiBpbiB0aW1lLCBhYm9ydGluZyBzZXR1cC4gIFJ1biAhY29uZmlnIHRvIHJlcmV1biBzZXR1cFwiKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuIl19
