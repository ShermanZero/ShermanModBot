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
class users {
    constructor() {
        this.props = {
            requiresElevation: "mod",
            description: "displays all members registered in the server",
        };
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let guildUsers = Resources_1.default.getGuildUsersFromGuild(message.guild);
            let allUsers = Object.keys(guildUsers);
            message.reply(`here are the current registered members of the server:\n[**${allUsers.join("**, **")}**]`);
        });
    }
}
exports.default = users;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxvQ0FBa0M7QUFJbEMsb0RBQXdDO0FBRXhDLE1BQXFCLEtBQUs7SUFBMUI7UUFDRSxVQUFLLEdBQUc7WUFDTixpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLFdBQVcsRUFBRSwrQ0FBK0M7U0FDN0QsQ0FBQztJQVlKLENBQUM7SUFWTyxHQUFHLENBQUMsTUFBVyxFQUFFLE9BQWdCLEVBQUUsSUFBYzs7WUFDckQsSUFBSSxVQUFVLEdBQUcsbUJBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUQsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV2QyxPQUFPLENBQUMsS0FBSyxDQUNYLDhEQUE4RCxRQUFRLENBQUMsSUFBSSxDQUN6RSxRQUFRLENBQ1QsS0FBSyxDQUNQLENBQUM7UUFDSixDQUFDO0tBQUE7Q0FDRjtBQWhCRCx3QkFnQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL2NsYXNzZXMvU3RyaW5nSGFuZGxlcic7XG5cbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJztcblxuaW1wb3J0IHJzcmMgZnJvbSAnLi4vY2xhc3Nlcy9SZXNvdXJjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB1c2VycyB7XG4gIHByb3BzID0ge1xuICAgIHJlcXVpcmVzRWxldmF0aW9uOiBcIm1vZFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcImRpc3BsYXlzIGFsbCBtZW1iZXJzIHJlZ2lzdGVyZWQgaW4gdGhlIHNlcnZlclwiLFxuICB9O1xuXG4gIGFzeW5jIHJ1bihjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSwgYXJnczogc3RyaW5nW10pIHtcbiAgICBsZXQgZ3VpbGRVc2VycyA9IHJzcmMuZ2V0R3VpbGRVc2Vyc0Zyb21HdWlsZChtZXNzYWdlLmd1aWxkKTtcbiAgICBsZXQgYWxsVXNlcnMgPSBPYmplY3Qua2V5cyhndWlsZFVzZXJzKTtcblxuICAgIG1lc3NhZ2UucmVwbHkoXG4gICAgICBgaGVyZSBhcmUgdGhlIGN1cnJlbnQgcmVnaXN0ZXJlZCBtZW1iZXJzIG9mIHRoZSBzZXJ2ZXI6XFxuWyoqJHthbGxVc2Vycy5qb2luKFxuICAgICAgICBcIioqLCAqKlwiXG4gICAgICApfSoqXWBcbiAgICApO1xuICB9XG59XG4iXX0=