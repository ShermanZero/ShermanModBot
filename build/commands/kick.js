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
  description: "kicks a member from the server",
  usage: "<member> <?reason>"
};
module.exports.run = (client, message, [mention, ...reason]) =>
  __awaiter(void 0, void 0, void 0, function*() {
    if (!message.mentions.members || message.mentions.members.size === 0) return message.reply("please mention a user to kick");
    const kickMember = message.mentions.members.first();
    yield kickMember.kick(reason.join(" "));
    let modChannel = client.channels.get(client.config.channels.mod.logs);
    yield modChannel.send(`${kickMember.user.username} was kicked by ${message.author.tag} for reason: ${reason}`);
  });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2ljay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9raWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUc7SUFDckIsaUJBQWlCLEVBQUUsS0FBSztJQUN4QixXQUFXLEVBQUUsZ0NBQWdDO0lBQzdDLEtBQUssRUFBRSxvQkFBb0I7Q0FDNUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQ25CLE1BQVcsRUFDWCxPQUFnQixFQUNoQixDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUNwQixFQUFFO0lBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxDQUFDO1FBQ2xFLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0lBRXhELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRXBELE1BQU0sVUFBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFekMsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RFLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FDbkIsR0FBRyxVQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsa0JBQzFCLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FDakIsZ0JBQWdCLE1BQU0sRUFBRSxDQUN6QixDQUFDO0FBQ0osQ0FBQyxDQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wcm9wcyA9IHtcclxuICByZXF1aXJlc0VsZXZhdGlvbjogXCJtb2RcIixcclxuICBkZXNjcmlwdGlvbjogXCJraWNrcyBhIG1lbWJlciBmcm9tIHRoZSBzZXJ2ZXJcIixcclxuICB1c2FnZTogXCI8bWVtYmVyPiA8P3JlYXNvbj5cIlxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMucnVuID0gYXN5bmMgKFxyXG4gIGNsaWVudDogYW55LFxyXG4gIG1lc3NhZ2U6IE1lc3NhZ2UsXHJcbiAgW21lbnRpb24sIC4uLnJlYXNvbl1cclxuKSA9PiB7XHJcbiAgaWYgKCFtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMgfHwgbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLnNpemUgPT09IDApXHJcbiAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcInBsZWFzZSBtZW50aW9uIGEgdXNlciB0byBraWNrXCIpO1xyXG5cclxuICBjb25zdCBraWNrTWVtYmVyID0gbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLmZpcnN0KCk7XHJcblxyXG4gIGF3YWl0IGtpY2tNZW1iZXIhLmtpY2socmVhc29uLmpvaW4oXCIgXCIpKTtcclxuXHJcbiAgbGV0IG1vZENoYW5uZWwgPSBjbGllbnQuY2hhbm5lbHMuZ2V0KGNsaWVudC5jb25maWcuY2hhbm5lbHMubW9kLmxvZ3MpO1xyXG4gIGF3YWl0IG1vZENoYW5uZWwuc2VuZChcclxuICAgIGAke2tpY2tNZW1iZXIhLnVzZXIudXNlcm5hbWV9IHdhcyBraWNrZWQgYnkgJHtcclxuICAgICAgbWVzc2FnZS5hdXRob3IudGFnXHJcbiAgICB9IGZvciByZWFzb246ICR7cmVhc29ufWBcclxuICApO1xyXG59O1xyXG4iXX0=
