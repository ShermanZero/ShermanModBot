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
class say {
    constructor() {
        this.props = {
            description: "makes the bot say your message",
            usage: "<message>"
        };
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const sayMessage = args.join(" ");
            message.delete().catch(err => {
                console.log(err);
            });
            message.channel.send(sayMessage).catch(err => {
                console.log(err);
            });
        });
    }
}
exports.default = say;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3NheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE1BQXFCLEdBQUc7SUFBeEI7UUFDRSxVQUFLLEdBQUc7WUFDTixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLEtBQUssRUFBRSxXQUFXO1NBQ25CLENBQUM7SUFZSixDQUFDO0lBVk8sR0FBRyxDQUFDLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWM7O1lBQ3JELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFbEMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtDQUNGO0FBaEJELHNCQWdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNheSB7XHJcbiAgcHJvcHMgPSB7XHJcbiAgICBkZXNjcmlwdGlvbjogXCJtYWtlcyB0aGUgYm90IHNheSB5b3VyIG1lc3NhZ2VcIixcclxuICAgIHVzYWdlOiBcIjxtZXNzYWdlPlwiXHJcbiAgfTtcclxuXHJcbiAgYXN5bmMgcnVuKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkge1xyXG4gICAgY29uc3Qgc2F5TWVzc2FnZSA9IGFyZ3Muam9pbihcIiBcIik7XHJcblxyXG4gICAgbWVzc2FnZS5kZWxldGUoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcbiAgICBtZXNzYWdlLmNoYW5uZWwuc2VuZChzYXlNZXNzYWdlKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==