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
module.exports.props = {
  requiresElevation: "mod",
  description: "changes the nickname of a member",
  usage: "<member> <nickname>"
};
module.exports.run = (client, message, args) =>
  __awaiter(void 0, void 0, void 0, function*() {
    if (!message.mentions.members || message.mentions.members.size === 0)
      return message.reply("please mention a member to change their nickname").catch(err => {
        console.log(err);
      });
    const nickMember = message.mentions.members.first();
    nickMember.setNickname(args[1]);
    yield message.reply(`${nickMember}'s nickname has been changed!`).catch(err => {
      console.log(err);
    });
  });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmljay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9uaWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUc7SUFDckIsaUJBQWlCLEVBQUUsS0FBSztJQUN4QixXQUFXLEVBQUUsa0NBQWtDO0lBQy9DLEtBQUssRUFBRSxxQkFBcUI7Q0FDN0IsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQU8sTUFBVyxFQUFFLE9BQWdCLEVBQUUsSUFBYyxFQUFFLEVBQUU7SUFDM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxDQUFDO1FBQ2xFLE9BQU8sT0FBTzthQUNYLEtBQUssQ0FBQyxrREFBa0QsQ0FBQzthQUN6RCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBRVAsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEQsVUFBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVqQyxNQUFNLE9BQU87U0FDVixLQUFLLENBQUMsR0FBRyxVQUFVLCtCQUErQixDQUFDO1NBQ25ELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuXHJcbm1vZHVsZS5leHBvcnRzLnByb3BzID0ge1xyXG4gIHJlcXVpcmVzRWxldmF0aW9uOiBcIm1vZFwiLFxyXG4gIGRlc2NyaXB0aW9uOiBcImNoYW5nZXMgdGhlIG5pY2tuYW1lIG9mIGEgbWVtYmVyXCIsXHJcbiAgdXNhZ2U6IFwiPG1lbWJlcj4gPG5pY2tuYW1lPlwiXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5ydW4gPSBhc3luYyAoY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UsIGFyZ3M6IHN0cmluZ1tdKSA9PiB7XHJcbiAgaWYgKCFtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMgfHwgbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLnNpemUgPT09IDApXHJcbiAgICByZXR1cm4gbWVzc2FnZVxyXG4gICAgICAucmVwbHkoXCJwbGVhc2UgbWVudGlvbiBhIG1lbWJlciB0byBjaGFuZ2UgdGhlaXIgbmlja25hbWVcIilcclxuICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfSk7XHJcblxyXG4gIGNvbnN0IG5pY2tNZW1iZXIgPSBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMuZmlyc3QoKTtcclxuICBuaWNrTWVtYmVyIS5zZXROaWNrbmFtZShhcmdzWzFdKTtcclxuXHJcbiAgYXdhaXQgbWVzc2FnZVxyXG4gICAgLnJlcGx5KGAke25pY2tNZW1iZXJ9J3Mgbmlja25hbWUgaGFzIGJlZW4gY2hhbmdlZCFgKVxyXG4gICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxufTtcclxuIl19
