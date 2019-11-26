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
module.exports.props = {
    requiresElevation: "owner",
    description: "shuts the bot down immediately"
};
module.exports = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    let exitCode = 1;
    if (args.length == 1 && args[0].toLowerCase().includes("force"))
        exitCode = 2;
    process.exit(exitCode);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2h1dGRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvc2h1dGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixpQkFBaUIsRUFBRSxPQUFPO0lBQzFCLFdBQVcsRUFBRSxnQ0FBZ0M7Q0FDOUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBTyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxJQUFjLEVBQUUsRUFBRTtJQUN2RSxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDakIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUFFLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFFOUUsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuXHJcbm1vZHVsZS5leHBvcnRzLnByb3BzID0ge1xyXG4gIHJlcXVpcmVzRWxldmF0aW9uOiBcIm93bmVyXCIsXHJcbiAgZGVzY3JpcHRpb246IFwic2h1dHMgdGhlIGJvdCBkb3duIGltbWVkaWF0ZWx5XCJcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkgPT4ge1xyXG4gIGxldCBleGl0Q29kZSA9IDE7XHJcbiAgaWYgKGFyZ3MubGVuZ3RoID09IDEgJiYgYXJnc1swXS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwiZm9yY2VcIikpIGV4aXRDb2RlID0gMjtcclxuXHJcbiAgcHJvY2Vzcy5leGl0KGV4aXRDb2RlKTtcclxufTtcclxuIl19