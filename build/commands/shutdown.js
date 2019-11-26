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
class shutdown {
    constructor() {
        this.props = {
            requiresElevation: "owner",
            description: "shuts the bot down immediately"
        };
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let exitCode = 1;
            if (args.length == 1 && args[0].toLowerCase().includes("force"))
                exitCode = 2;
            process.exit(exitCode);
        });
    }
}
exports.default = shutdown;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2h1dGRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvc2h1dGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxNQUFxQixRQUFRO0lBQTdCO1FBQ0UsVUFBSyxHQUFHO1lBQ04saUJBQWlCLEVBQUUsT0FBTztZQUMxQixXQUFXLEVBQUUsZ0NBQWdDO1NBQzlDLENBQUM7SUFTSixDQUFDO0lBUE8sR0FBRyxDQUFDLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWM7O1lBQ3JELElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO2dCQUM3RCxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBRWYsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QixDQUFDO0tBQUE7Q0FDRjtBQWJELDJCQWFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc2h1dGRvd24ge1xyXG4gIHByb3BzID0ge1xyXG4gICAgcmVxdWlyZXNFbGV2YXRpb246IFwib3duZXJcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcInNodXRzIHRoZSBib3QgZG93biBpbW1lZGlhdGVseVwiXHJcbiAgfTtcclxuXHJcbiAgYXN5bmMgcnVuKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkge1xyXG4gICAgbGV0IGV4aXRDb2RlID0gMTtcclxuICAgIGlmIChhcmdzLmxlbmd0aCA9PSAxICYmIGFyZ3NbMF0udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcImZvcmNlXCIpKVxyXG4gICAgICBleGl0Q29kZSA9IDI7XHJcblxyXG4gICAgcHJvY2Vzcy5leGl0KGV4aXRDb2RlKTtcclxuICB9XHJcbn1cclxuIl19