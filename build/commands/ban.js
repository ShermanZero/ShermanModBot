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
    description: "bans a member from the server",
    usage: "<member> <?reason>"
};
module.exports.run = (client, message, [mention, ...reason]) => __awaiter(void 0, void 0, void 0, function* () {
    if (!message.mentions.members || message.mentions.members.size === 0)
        try {
            return message.reply("please mention a user to kick");
        }
        catch (err) {
            console.log(err);
            return;
        }
    const banMember = message.mentions.members.first();
    yield banMember.ban({ reason: reason.join(" ") });
    let modChannel = client.channels.get(client.config.channels.mod.logs);
    yield modChannel.send(`${banMember.user.username} was banned by ${message.author.tag} for reason: ${reason}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2Jhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLDhEQUFnRDtBQUVoRCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixpQkFBaUIsRUFBRSx1QkFBTSxDQUFDLGVBQWUsQ0FBQyxTQUFTO0lBQ25ELFdBQVcsRUFBRSwrQkFBK0I7SUFDNUMsS0FBSyxFQUFFLG9CQUFvQjtDQUM1QixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBTyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLEVBQUU7SUFDakYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxDQUFDO1FBQ2xFLElBQUk7WUFDRixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztTQUN2RDtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixPQUFPO1NBQ1I7SUFFSCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQWlCLENBQUM7SUFDbEUsTUFBTSxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRWxELElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RSxNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsa0JBQWtCLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxnQkFBZ0IsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUNoSCxDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEd1aWxkTWVtYmVyLCBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL3Jlc291cmNlcy9nbG9iYWxfY29uZmlnJztcclxuXHJcbm1vZHVsZS5leHBvcnRzLnByb3BzID0ge1xyXG4gIHJlcXVpcmVzRWxldmF0aW9uOiBjb25maWcuZWxldmF0aW9uX25hbWVzLm1vZGVyYXRvcixcclxuICBkZXNjcmlwdGlvbjogXCJiYW5zIGEgbWVtYmVyIGZyb20gdGhlIHNlcnZlclwiLFxyXG4gIHVzYWdlOiBcIjxtZW1iZXI+IDw/cmVhc29uPlwiXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5ydW4gPSBhc3luYyAoY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UsIFttZW50aW9uLCAuLi5yZWFzb25dKSA9PiB7XHJcbiAgaWYgKCFtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMgfHwgbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLnNpemUgPT09IDApXHJcbiAgICB0cnkge1xyXG4gICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcInBsZWFzZSBtZW50aW9uIGEgdXNlciB0byBraWNrXCIpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgY29uc3QgYmFuTWVtYmVyID0gbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLmZpcnN0KCkgYXMgR3VpbGRNZW1iZXI7XHJcbiAgYXdhaXQgYmFuTWVtYmVyLmJhbih7IHJlYXNvbjogcmVhc29uLmpvaW4oXCIgXCIpIH0pO1xyXG5cclxuICBsZXQgbW9kQ2hhbm5lbCA9IGNsaWVudC5jaGFubmVscy5nZXQoY2xpZW50LmNvbmZpZy5jaGFubmVscy5tb2QubG9ncyk7XHJcbiAgYXdhaXQgbW9kQ2hhbm5lbC5zZW5kKGAke2Jhbk1lbWJlci51c2VyLnVzZXJuYW1lfSB3YXMgYmFubmVkIGJ5ICR7bWVzc2FnZS5hdXRob3IudGFnfSBmb3IgcmVhc29uOiAke3JlYXNvbn1gKTtcclxufTtcclxuIl19