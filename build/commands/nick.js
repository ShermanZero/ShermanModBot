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
    requiresElevation: "mod",
    description: "changes the nickname of a member",
    usage: "<member> <nickname>"
};
module.exports = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    if (!message.mentions.members || message.mentions.members.size === 0)
        return message
            .reply("please mention a member to change their nickname")
            .catch(err => {
            console.log(err);
        });
    const nickMember = message.mentions.members.first();
    nickMember.setNickname(args[1]);
    yield message
        .reply(`${nickMember}'s nickname has been changed!`)
        .catch(err => {
        console.log(err);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmljay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9uaWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUc7SUFDckIsaUJBQWlCLEVBQUUsS0FBSztJQUN4QixXQUFXLEVBQUUsa0NBQWtDO0lBQy9DLEtBQUssRUFBRSxxQkFBcUI7Q0FDN0IsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBTyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxJQUFjLEVBQUUsRUFBRTtJQUN2RSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUM7UUFDbEUsT0FBTyxPQUFPO2FBQ1gsS0FBSyxDQUFDLGtEQUFrRCxDQUFDO2FBQ3pELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFFUCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNwRCxVQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWpDLE1BQU0sT0FBTztTQUNWLEtBQUssQ0FBQyxHQUFHLFVBQVUsK0JBQStCLENBQUM7U0FDbkQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XHJcbiAgcmVxdWlyZXNFbGV2YXRpb246IFwibW9kXCIsXHJcbiAgZGVzY3JpcHRpb246IFwiY2hhbmdlcyB0aGUgbmlja25hbWUgb2YgYSBtZW1iZXJcIixcclxuICB1c2FnZTogXCI8bWVtYmVyPiA8bmlja25hbWU+XCJcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkgPT4ge1xyXG4gIGlmICghbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzIHx8IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycy5zaXplID09PSAwKVxyXG4gICAgcmV0dXJuIG1lc3NhZ2VcclxuICAgICAgLnJlcGx5KFwicGxlYXNlIG1lbnRpb24gYSBtZW1iZXIgdG8gY2hhbmdlIHRoZWlyIG5pY2tuYW1lXCIpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIH0pO1xyXG5cclxuICBjb25zdCBuaWNrTWVtYmVyID0gbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLmZpcnN0KCk7XHJcbiAgbmlja01lbWJlciEuc2V0Tmlja25hbWUoYXJnc1sxXSk7XHJcblxyXG4gIGF3YWl0IG1lc3NhZ2VcclxuICAgIC5yZXBseShgJHtuaWNrTWVtYmVyfSdzIG5pY2tuYW1lIGhhcyBiZWVuIGNoYW5nZWQhYClcclxuICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcbn07XHJcbiJdfQ==