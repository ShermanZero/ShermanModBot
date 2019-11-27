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
    requiresElevation: global_config_1.default.elevation_names.moderator,
    description: "removes a maximum of 100 messages from a channel",
    usage: "<amount> <?member>"
};
module.exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    const user = message.mentions.users.first();
    var amount = !!parseInt(message.content.split(" ")[1]) ? parseInt(message.content.split(" ")[1]) : parseInt(message.content.split(" ")[2]);
    if (!amount || amount > 100)
        amount = 100;
    if (amount < 2)
        amount = 2;
    message.channel.messages.fetch({ limit: 100 }).then((messages) => {
        if (user) {
            const filterBy = user ? user.id : client.user.id;
            messages = messages
                .filter((m) => m.author.id === filterBy)
                .array()
                .slice(0, amount);
        }
        message.channel.bulkDelete(messages).catch(err => {
            console.log(err);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvcHVyZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSw4REFBZ0Q7QUFFaEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUc7SUFDckIsaUJBQWlCLEVBQUUsdUJBQU0sQ0FBQyxlQUFlLENBQUMsU0FBUztJQUNuRCxXQUFXLEVBQUUsa0RBQWtEO0lBQy9ELEtBQUssRUFBRSxvQkFBb0I7Q0FDNUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQU8sTUFBVyxFQUFFLE9BQWdCLEVBQUUsSUFBYyxFQUFFLEVBQUU7SUFDM0UsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFHNUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFM0ksSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLEdBQUcsR0FBRztRQUFFLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDMUMsSUFBSSxNQUFNLEdBQUcsQ0FBQztRQUFFLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFHMUIsT0FBTyxDQUFDLE9BQXVCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQWEsRUFBRSxFQUFFO1FBQ3JGLElBQUksSUFBSSxFQUFFO1lBQ1IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNqRCxRQUFRLEdBQUcsUUFBUTtpQkFDaEIsTUFBTSxDQUFDLENBQUMsQ0FBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxRQUFRLENBQUM7aUJBQ2hELEtBQUssRUFBRTtpQkFDUCxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3JCO1FBRUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZSwgVGV4dENoYW5uZWwgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vcmVzb3VyY2VzL2dsb2JhbF9jb25maWcnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XHJcbiAgcmVxdWlyZXNFbGV2YXRpb246IGNvbmZpZy5lbGV2YXRpb25fbmFtZXMubW9kZXJhdG9yLFxyXG4gIGRlc2NyaXB0aW9uOiBcInJlbW92ZXMgYSBtYXhpbXVtIG9mIDEwMCBtZXNzYWdlcyBmcm9tIGEgY2hhbm5lbFwiLFxyXG4gIHVzYWdlOiBcIjxhbW91bnQ+IDw/bWVtYmVyPlwiXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5ydW4gPSBhc3luYyAoY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UsIGFyZ3M6IHN0cmluZ1tdKSA9PiB7XHJcbiAgY29uc3QgdXNlciA9IG1lc3NhZ2UubWVudGlvbnMudXNlcnMuZmlyc3QoKTtcclxuXHJcbiAgLy9wYXJzZSBhbW91bnRcclxuICB2YXIgYW1vdW50ID0gISFwYXJzZUludChtZXNzYWdlLmNvbnRlbnQuc3BsaXQoXCIgXCIpWzFdKSA/IHBhcnNlSW50KG1lc3NhZ2UuY29udGVudC5zcGxpdChcIiBcIilbMV0pIDogcGFyc2VJbnQobWVzc2FnZS5jb250ZW50LnNwbGl0KFwiIFwiKVsyXSk7XHJcblxyXG4gIGlmICghYW1vdW50IHx8IGFtb3VudCA+IDEwMCkgYW1vdW50ID0gMTAwO1xyXG4gIGlmIChhbW91bnQgPCAyKSBhbW91bnQgPSAyO1xyXG5cclxuICAvL2ZldGNoIDEwMCBtZXNzYWdlcyAod2lsbCBiZSBmaWx0ZXJlZCBhbmQgbG93ZXJlZCB1cCB0byBtYXggYW1vdW50IHJlcXVlc3RlZClcclxuICAobWVzc2FnZS5jaGFubmVsIGFzIFRleHRDaGFubmVsKS5tZXNzYWdlcy5mZXRjaCh7IGxpbWl0OiAxMDAgfSkudGhlbigobWVzc2FnZXM6IGFueSkgPT4ge1xyXG4gICAgaWYgKHVzZXIpIHtcclxuICAgICAgY29uc3QgZmlsdGVyQnkgPSB1c2VyID8gdXNlci5pZCA6IGNsaWVudC51c2VyLmlkO1xyXG4gICAgICBtZXNzYWdlcyA9IG1lc3NhZ2VzXHJcbiAgICAgICAgLmZpbHRlcigobTogTWVzc2FnZSkgPT4gbS5hdXRob3IuaWQgPT09IGZpbHRlckJ5KVxyXG4gICAgICAgIC5hcnJheSgpXHJcbiAgICAgICAgLnNsaWNlKDAsIGFtb3VudCk7XHJcbiAgICB9XHJcblxyXG4gICAgbWVzc2FnZS5jaGFubmVsLmJ1bGtEZWxldGUobWVzc2FnZXMpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxuICB9KTtcclxufTtcclxuIl19