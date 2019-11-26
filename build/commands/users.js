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
require("../classes/StringHandler");
const Resources_1 = require("../classes/Resources");
module.exports.props = {
    requiresElevation: "mod",
    description: "displays all members registered in the server"
};
module.exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    let guildUsers = Resources_1.default.getGuildUsersFromGuild(message.guild);
    let allUsers = Object.keys(guildUsers);
    message.reply(`here are the current registered members of the server:\n[**${allUsers.join("**, **")}**]`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxvQ0FBa0M7QUFJbEMsb0RBQXdDO0FBRXhDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHO0lBQ3JCLGlCQUFpQixFQUFFLEtBQUs7SUFDeEIsV0FBVyxFQUFFLCtDQUErQztDQUM3RCxDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBTyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxJQUFjLEVBQUUsRUFBRTtJQUMzRSxJQUFJLFVBQVUsR0FBRyxtQkFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1RCxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXZDLE9BQU8sQ0FBQyxLQUFLLENBQ1gsOERBQThELFFBQVEsQ0FBQyxJQUFJLENBQ3pFLFFBQVEsQ0FDVCxLQUFLLENBQ1AsQ0FBQztBQUNKLENBQUMsQ0FBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9jbGFzc2VzL1N0cmluZ0hhbmRsZXInO1xuXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XG5cbmltcG9ydCByc3JjIGZyb20gJy4uL2NsYXNzZXMvUmVzb3VyY2VzJztcblxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XG4gIHJlcXVpcmVzRWxldmF0aW9uOiBcIm1vZFwiLFxuICBkZXNjcmlwdGlvbjogXCJkaXNwbGF5cyBhbGwgbWVtYmVycyByZWdpc3RlcmVkIGluIHRoZSBzZXJ2ZXJcIlxufTtcblxubW9kdWxlLmV4cG9ydHMucnVuID0gYXN5bmMgKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkgPT4ge1xuICBsZXQgZ3VpbGRVc2VycyA9IHJzcmMuZ2V0R3VpbGRVc2Vyc0Zyb21HdWlsZChtZXNzYWdlLmd1aWxkKTtcbiAgbGV0IGFsbFVzZXJzID0gT2JqZWN0LmtleXMoZ3VpbGRVc2Vycyk7XG5cbiAgbWVzc2FnZS5yZXBseShcbiAgICBgaGVyZSBhcmUgdGhlIGN1cnJlbnQgcmVnaXN0ZXJlZCBtZW1iZXJzIG9mIHRoZSBzZXJ2ZXI6XFxuWyoqJHthbGxVc2Vycy5qb2luKFxuICAgICAgXCIqKiwgKipcIlxuICAgICl9KipdYFxuICApO1xufTtcbiJdfQ==