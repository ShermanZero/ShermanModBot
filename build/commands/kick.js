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
const global_config_1 = require("../resources/global_config");
module.exports.props = {
    requiresElevation: global_config_1.default.elevation_names.moderator,
    description: "kicks a member from the server",
    usage: "<member> <?reason>"
};
module.exports.run = (client, message, [mention, ...reason]) => __awaiter(void 0, void 0, void 0, function* () {
    if (!message.mentions.members || message.mentions.members.size === 0)
        return message.reply("please mention a user to kick");
    const kickMember = message.mentions.members.first();
    yield kickMember.kick(reason.join(" "));
    let modChannel = client.channels.get(client.config.channels.mod.logs);
    yield modChannel.send(`${kickMember.user.username} was kicked by ${message.author.tag} for reason: ${reason}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2ljay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9raWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsOERBQWdEO0FBRWhELE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHO0lBQ3JCLGlCQUFpQixFQUFFLHVCQUFNLENBQUMsZUFBZSxDQUFDLFNBQVM7SUFDbkQsV0FBVyxFQUFFLGdDQUFnQztJQUM3QyxLQUFLLEVBQUUsb0JBQW9CO0NBQzVCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQVcsRUFBRSxPQUFnQixFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRTtJQUNqRixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUM7UUFBRSxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztJQUU1SCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUVwRCxNQUFNLFVBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRXpDLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RSxNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsa0JBQWtCLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxnQkFBZ0IsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUNsSCxDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vcmVzb3VyY2VzL2dsb2JhbF9jb25maWcnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XHJcbiAgcmVxdWlyZXNFbGV2YXRpb246IGNvbmZpZy5lbGV2YXRpb25fbmFtZXMubW9kZXJhdG9yLFxyXG4gIGRlc2NyaXB0aW9uOiBcImtpY2tzIGEgbWVtYmVyIGZyb20gdGhlIHNlcnZlclwiLFxyXG4gIHVzYWdlOiBcIjxtZW1iZXI+IDw/cmVhc29uPlwiXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5ydW4gPSBhc3luYyAoY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UsIFttZW50aW9uLCAuLi5yZWFzb25dKSA9PiB7XHJcbiAgaWYgKCFtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMgfHwgbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLnNpemUgPT09IDApIHJldHVybiBtZXNzYWdlLnJlcGx5KFwicGxlYXNlIG1lbnRpb24gYSB1c2VyIHRvIGtpY2tcIik7XHJcblxyXG4gIGNvbnN0IGtpY2tNZW1iZXIgPSBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMuZmlyc3QoKTtcclxuXHJcbiAgYXdhaXQga2lja01lbWJlciEua2ljayhyZWFzb24uam9pbihcIiBcIikpO1xyXG5cclxuICBsZXQgbW9kQ2hhbm5lbCA9IGNsaWVudC5jaGFubmVscy5nZXQoY2xpZW50LmNvbmZpZy5jaGFubmVscy5tb2QubG9ncyk7XHJcbiAgYXdhaXQgbW9kQ2hhbm5lbC5zZW5kKGAke2tpY2tNZW1iZXIhLnVzZXIudXNlcm5hbWV9IHdhcyBraWNrZWQgYnkgJHttZXNzYWdlLmF1dGhvci50YWd9IGZvciByZWFzb246ICR7cmVhc29ufWApO1xyXG59O1xyXG4iXX0=