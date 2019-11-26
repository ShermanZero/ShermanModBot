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
class nick {
    constructor() {
        this.props = {
            requiresElevation: "mod",
            description: "changes the nickname of a member",
            usage: "<member> <nickname>"
        };
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.mentions.members || message.mentions.members.size === 0)
                return message
                    .reply("please mention a member to change their nickname")
                    .catch(err => {
                    console.log(err);
                });
            const nickMember = message.mentions.members.first();
            nickMember.setNickname(args[1]);
            yield message.reply(`${nickMember}'s nickname has been changed!`).catch(err => {
                console.log(err);
            });
        });
    }
}
exports.default = nick;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmljay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9uaWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsTUFBcUIsSUFBSTtJQUF6QjtRQUNFLFVBQUssR0FBRztZQUNOLGlCQUFpQixFQUFFLEtBQUs7WUFDeEIsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxLQUFLLEVBQUUscUJBQXFCO1NBQzdCLENBQUM7SUFpQkosQ0FBQztJQWZPLEdBQUcsQ0FBQyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxJQUFjOztZQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUM7Z0JBQ2xFLE9BQU8sT0FBTztxQkFDWCxLQUFLLENBQUMsa0RBQWtELENBQUM7cUJBQ3pELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixDQUFDLENBQUMsQ0FBQztZQUVQLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3BELFVBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFakMsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSwrQkFBK0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtDQUNGO0FBdEJELHVCQXNCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5pY2sge1xyXG4gIHByb3BzID0ge1xyXG4gICAgcmVxdWlyZXNFbGV2YXRpb246IFwibW9kXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJjaGFuZ2VzIHRoZSBuaWNrbmFtZSBvZiBhIG1lbWJlclwiLFxyXG4gICAgdXNhZ2U6IFwiPG1lbWJlcj4gPG5pY2tuYW1lPlwiXHJcbiAgfTtcclxuXHJcbiAgYXN5bmMgcnVuKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkge1xyXG4gICAgaWYgKCFtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMgfHwgbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLnNpemUgPT09IDApXHJcbiAgICAgIHJldHVybiBtZXNzYWdlXHJcbiAgICAgICAgLnJlcGx5KFwicGxlYXNlIG1lbnRpb24gYSBtZW1iZXIgdG8gY2hhbmdlIHRoZWlyIG5pY2tuYW1lXCIpXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IG5pY2tNZW1iZXIgPSBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMuZmlyc3QoKTtcclxuICAgIG5pY2tNZW1iZXIhLnNldE5pY2tuYW1lKGFyZ3NbMV0pO1xyXG5cclxuICAgIGF3YWl0IG1lc3NhZ2UucmVwbHkoYCR7bmlja01lbWJlcn0ncyBuaWNrbmFtZSBoYXMgYmVlbiBjaGFuZ2VkIWApLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19