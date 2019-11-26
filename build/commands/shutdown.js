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
module.exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    let exitCode = 1;
    if (args.length == 1 && args[0].toLowerCase().includes("force"))
        exitCode = 2;
    process.exit(exitCode);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2h1dGRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvc2h1dGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixpQkFBaUIsRUFBRSxPQUFPO0lBQzFCLFdBQVcsRUFBRSxnQ0FBZ0M7Q0FDOUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQU8sTUFBVyxFQUFFLE9BQWdCLEVBQUUsSUFBYyxFQUFFLEVBQUU7SUFDM0UsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFBRSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBRTlFLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wcm9wcyA9IHtcclxuICByZXF1aXJlc0VsZXZhdGlvbjogXCJvd25lclwiLFxyXG4gIGRlc2NyaXB0aW9uOiBcInNodXRzIHRoZSBib3QgZG93biBpbW1lZGlhdGVseVwiXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5ydW4gPSBhc3luYyAoY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UsIGFyZ3M6IHN0cmluZ1tdKSA9PiB7XHJcbiAgbGV0IGV4aXRDb2RlID0gMTtcclxuICBpZiAoYXJncy5sZW5ndGggPT0gMSAmJiBhcmdzWzBdLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJmb3JjZVwiKSkgZXhpdENvZGUgPSAyO1xyXG5cclxuICBwcm9jZXNzLmV4aXQoZXhpdENvZGUpO1xyXG59O1xyXG4iXX0=