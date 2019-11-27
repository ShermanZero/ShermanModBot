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
const global_config_1 = require("../resources/global_config");
module.exports.props = {
    requiresElevation: global_config_1.default.elevation_names.moderator,
    description: "displays all members registered in the server"
};
module.exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    let guildUsers = Resources_1.default.getGuildUsersFromGuild(client, message.guild);
    let allUsers = Object.keys(guildUsers);
    message.reply(`here are the current registered members of the server:\n[**${allUsers.join("**, **")}**]`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxvQ0FBa0M7QUFJbEMsb0RBQXdDO0FBQ3hDLDhEQUFnRDtBQUVoRCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixpQkFBaUIsRUFBRSx1QkFBTSxDQUFDLGVBQWUsQ0FBQyxTQUFTO0lBQ25ELFdBQVcsRUFBRSwrQ0FBK0M7Q0FDN0QsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQU8sTUFBVyxFQUFFLE9BQWdCLEVBQUUsSUFBYyxFQUFFLEVBQUU7SUFDM0UsSUFBSSxVQUFVLEdBQUcsbUJBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BFLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFdkMsT0FBTyxDQUFDLEtBQUssQ0FBQyw4REFBOEQsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUcsQ0FBQyxDQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL2NsYXNzZXMvU3RyaW5nSGFuZGxlcic7XG5cbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJztcblxuaW1wb3J0IHJzcmMgZnJvbSAnLi4vY2xhc3Nlcy9SZXNvdXJjZXMnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9yZXNvdXJjZXMvZ2xvYmFsX2NvbmZpZyc7XG5cbm1vZHVsZS5leHBvcnRzLnByb3BzID0ge1xuICByZXF1aXJlc0VsZXZhdGlvbjogY29uZmlnLmVsZXZhdGlvbl9uYW1lcy5tb2RlcmF0b3IsXG4gIGRlc2NyaXB0aW9uOiBcImRpc3BsYXlzIGFsbCBtZW1iZXJzIHJlZ2lzdGVyZWQgaW4gdGhlIHNlcnZlclwiXG59O1xuXG5tb2R1bGUuZXhwb3J0cy5ydW4gPSBhc3luYyAoY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UsIGFyZ3M6IHN0cmluZ1tdKSA9PiB7XG4gIGxldCBndWlsZFVzZXJzID0gcnNyYy5nZXRHdWlsZFVzZXJzRnJvbUd1aWxkKGNsaWVudCwgbWVzc2FnZS5ndWlsZCk7XG4gIGxldCBhbGxVc2VycyA9IE9iamVjdC5rZXlzKGd1aWxkVXNlcnMpO1xuXG4gIG1lc3NhZ2UucmVwbHkoYGhlcmUgYXJlIHRoZSBjdXJyZW50IHJlZ2lzdGVyZWQgbWVtYmVycyBvZiB0aGUgc2VydmVyOlxcblsqKiR7YWxsVXNlcnMuam9pbihcIioqLCAqKlwiKX0qKl1gKTtcbn07XG4iXX0=