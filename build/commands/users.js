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
    let guildUsers = Resources_1.default.getGuildUsersFromGuild(client, message.guild);
    let allUsers = Object.keys(guildUsers);
    message.reply(`here are the current registered members of the server:\n[**${allUsers.join("**, **")}**]`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxvQ0FBa0M7QUFJbEMsb0RBQXdDO0FBRXhDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHO0lBQ3JCLGlCQUFpQixFQUFFLEtBQUs7SUFDeEIsV0FBVyxFQUFFLCtDQUErQztDQUM3RCxDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBTyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxJQUFjLEVBQUUsRUFBRTtJQUMzRSxJQUFJLFVBQVUsR0FBRyxtQkFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEUsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUV2QyxPQUFPLENBQUMsS0FBSyxDQUNYLDhEQUE4RCxRQUFRLENBQUMsSUFBSSxDQUN6RSxRQUFRLENBQ1QsS0FBSyxDQUNQLENBQUM7QUFDSixDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vY2xhc3Nlcy9TdHJpbmdIYW5kbGVyJztcblxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xuXG5pbXBvcnQgcnNyYyBmcm9tICcuLi9jbGFzc2VzL1Jlc291cmNlcyc7XG5cbm1vZHVsZS5leHBvcnRzLnByb3BzID0ge1xuICByZXF1aXJlc0VsZXZhdGlvbjogXCJtb2RcIixcbiAgZGVzY3JpcHRpb246IFwiZGlzcGxheXMgYWxsIG1lbWJlcnMgcmVnaXN0ZXJlZCBpbiB0aGUgc2VydmVyXCJcbn07XG5cbm1vZHVsZS5leHBvcnRzLnJ1biA9IGFzeW5jIChjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSwgYXJnczogc3RyaW5nW10pID0+IHtcbiAgbGV0IGd1aWxkVXNlcnMgPSByc3JjLmdldEd1aWxkVXNlcnNGcm9tR3VpbGQoY2xpZW50LCBtZXNzYWdlLmd1aWxkKTtcbiAgbGV0IGFsbFVzZXJzID0gT2JqZWN0LmtleXMoZ3VpbGRVc2Vycyk7XG5cbiAgbWVzc2FnZS5yZXBseShcbiAgICBgaGVyZSBhcmUgdGhlIGN1cnJlbnQgcmVnaXN0ZXJlZCBtZW1iZXJzIG9mIHRoZSBzZXJ2ZXI6XFxuWyoqJHthbGxVc2Vycy5qb2luKFxuICAgICAgXCIqKiwgKipcIlxuICAgICl9KipdYFxuICApO1xufTtcbiJdfQ==