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
    description: "changes the nickname of a member",
    usage: "<member> <nickname>"
};
module.exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmljay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9uaWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsOERBQWdEO0FBRWhELE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHO0lBQ3JCLGlCQUFpQixFQUFFLHVCQUFNLENBQUMsZUFBZSxDQUFDLFNBQVM7SUFDbkQsV0FBVyxFQUFFLGtDQUFrQztJQUMvQyxLQUFLLEVBQUUscUJBQXFCO0NBQzdCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWMsRUFBRSxFQUFFO0lBQzNFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQztRQUNsRSxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbkYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUVMLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3BELFVBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFakMsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSwrQkFBK0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUM1RSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL3Jlc291cmNlcy9nbG9iYWxfY29uZmlnJztcclxuXHJcbm1vZHVsZS5leHBvcnRzLnByb3BzID0ge1xyXG4gIHJlcXVpcmVzRWxldmF0aW9uOiBjb25maWcuZWxldmF0aW9uX25hbWVzLm1vZGVyYXRvcixcclxuICBkZXNjcmlwdGlvbjogXCJjaGFuZ2VzIHRoZSBuaWNrbmFtZSBvZiBhIG1lbWJlclwiLFxyXG4gIHVzYWdlOiBcIjxtZW1iZXI+IDxuaWNrbmFtZT5cIlxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMucnVuID0gYXN5bmMgKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkgPT4ge1xyXG4gIGlmICghbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzIHx8IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycy5zaXplID09PSAwKVxyXG4gICAgcmV0dXJuIG1lc3NhZ2UucmVwbHkoXCJwbGVhc2UgbWVudGlvbiBhIG1lbWJlciB0byBjaGFuZ2UgdGhlaXIgbmlja25hbWVcIikuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG5cclxuICBjb25zdCBuaWNrTWVtYmVyID0gbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLmZpcnN0KCk7XHJcbiAgbmlja01lbWJlciEuc2V0Tmlja25hbWUoYXJnc1sxXSk7XHJcblxyXG4gIGF3YWl0IG1lc3NhZ2UucmVwbHkoYCR7bmlja01lbWJlcn0ncyBuaWNrbmFtZSBoYXMgYmVlbiBjaGFuZ2VkIWApLmNhdGNoKGVyciA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gIH0pO1xyXG59O1xyXG4iXX0=