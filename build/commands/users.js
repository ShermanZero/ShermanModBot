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
module.exports = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    let guildUsers = Resources_1.default.getGuildUsersFromGuild(message.guild);
    let allUsers = Object.keys(guildUsers);
    message.reply(`here are the current registered members of the server:\n[**${allUsers.join("**, **")}**]`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxvQ0FBa0M7QUFJbEMsb0RBQXdDO0FBRXhDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHO0lBQ3JCLGlCQUFpQixFQUFFLEtBQUs7SUFDeEIsV0FBVyxFQUFFLCtDQUErQztDQUM3RCxDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFPLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWMsRUFBRSxFQUFFO0lBQ3ZFLElBQUksVUFBVSxHQUFHLG1CQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFdkMsT0FBTyxDQUFDLEtBQUssQ0FDWCw4REFBOEQsUUFBUSxDQUFDLElBQUksQ0FDekUsUUFBUSxDQUNULEtBQUssQ0FDUCxDQUFDO0FBQ0osQ0FBQyxDQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL2NsYXNzZXMvU3RyaW5nSGFuZGxlcic7XG5cbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJztcblxuaW1wb3J0IHJzcmMgZnJvbSAnLi4vY2xhc3Nlcy9SZXNvdXJjZXMnO1xuXG5tb2R1bGUuZXhwb3J0cy5wcm9wcyA9IHtcbiAgcmVxdWlyZXNFbGV2YXRpb246IFwibW9kXCIsXG4gIGRlc2NyaXB0aW9uOiBcImRpc3BsYXlzIGFsbCBtZW1iZXJzIHJlZ2lzdGVyZWQgaW4gdGhlIHNlcnZlclwiXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIChjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSwgYXJnczogc3RyaW5nW10pID0+IHtcbiAgbGV0IGd1aWxkVXNlcnMgPSByc3JjLmdldEd1aWxkVXNlcnNGcm9tR3VpbGQobWVzc2FnZS5ndWlsZCk7XG4gIGxldCBhbGxVc2VycyA9IE9iamVjdC5rZXlzKGd1aWxkVXNlcnMpO1xuXG4gIG1lc3NhZ2UucmVwbHkoXG4gICAgYGhlcmUgYXJlIHRoZSBjdXJyZW50IHJlZ2lzdGVyZWQgbWVtYmVycyBvZiB0aGUgc2VydmVyOlxcblsqKiR7YWxsVXNlcnMuam9pbihcbiAgICAgIFwiKiosICoqXCJcbiAgICApfSoqXWBcbiAgKTtcbn07XG4iXX0=