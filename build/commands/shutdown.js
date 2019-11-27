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
    requiresElevation: global_config_1.default.elevation_names.botowner,
    description: "shuts the bot down immediately"
};
module.exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    let exitCode = 1;
    if (args.length == 1 && args[0].toLowerCase().includes("force"))
        exitCode = 2;
    process.exit(exitCode);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2h1dGRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvc2h1dGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSw4REFBZ0Q7QUFFaEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUc7SUFDckIsaUJBQWlCLEVBQUUsdUJBQU0sQ0FBQyxlQUFlLENBQUMsUUFBUTtJQUNsRCxXQUFXLEVBQUUsZ0NBQWdDO0NBQzlDLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWMsRUFBRSxFQUFFO0lBQzNFLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztJQUNqQixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQUUsUUFBUSxHQUFHLENBQUMsQ0FBQztJQUU5RSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5cclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9yZXNvdXJjZXMvZ2xvYmFsX2NvbmZpZyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wcm9wcyA9IHtcclxuICByZXF1aXJlc0VsZXZhdGlvbjogY29uZmlnLmVsZXZhdGlvbl9uYW1lcy5ib3Rvd25lcixcclxuICBkZXNjcmlwdGlvbjogXCJzaHV0cyB0aGUgYm90IGRvd24gaW1tZWRpYXRlbHlcIlxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMucnVuID0gYXN5bmMgKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkgPT4ge1xyXG4gIGxldCBleGl0Q29kZSA9IDE7XHJcbiAgaWYgKGFyZ3MubGVuZ3RoID09IDEgJiYgYXJnc1swXS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwiZm9yY2VcIikpIGV4aXRDb2RlID0gMjtcclxuXHJcbiAgcHJvY2Vzcy5leGl0KGV4aXRDb2RlKTtcclxufTtcclxuIl19