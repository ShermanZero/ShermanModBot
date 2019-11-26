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
    description: "removes a maximum of 100 messages from a channel",
    usage: "<amount> <?member>"
};
module.exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    const user = message.mentions.users.first();
    var amount = !!parseInt(message.content.split(" ")[1])
        ? parseInt(message.content.split(" ")[1])
        : parseInt(message.content.split(" ")[2]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvcHVyZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixpQkFBaUIsRUFBRSxLQUFLO0lBQ3hCLFdBQVcsRUFBRSxrREFBa0Q7SUFDL0QsS0FBSyxFQUFFLG9CQUFvQjtDQUM1QixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBTyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxJQUFjLEVBQUUsRUFBRTtJQUMzRSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUc1QyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTVDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxHQUFHLEdBQUc7UUFBRSxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBQzFDLElBQUksTUFBTSxHQUFHLENBQUM7UUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBRzFCLE9BQU8sQ0FBQyxPQUF1QixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFhLEVBQUUsRUFBRTtRQUNuRixJQUFJLElBQUksRUFBRTtZQUNSLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDakQsUUFBUSxHQUFHLFFBQVE7aUJBQ2hCLE1BQU0sQ0FBQyxDQUFDLENBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssUUFBUSxDQUFDO2lCQUNoRCxLQUFLLEVBQUU7aUJBQ1AsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNyQjtRQUVELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2UsIFRleHRDaGFubmVsIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wcm9wcyA9IHtcclxuICByZXF1aXJlc0VsZXZhdGlvbjogXCJtb2RcIixcclxuICBkZXNjcmlwdGlvbjogXCJyZW1vdmVzIGEgbWF4aW11bSBvZiAxMDAgbWVzc2FnZXMgZnJvbSBhIGNoYW5uZWxcIixcclxuICB1c2FnZTogXCI8YW1vdW50PiA8P21lbWJlcj5cIlxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMucnVuID0gYXN5bmMgKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkgPT4ge1xyXG4gIGNvbnN0IHVzZXIgPSBtZXNzYWdlLm1lbnRpb25zLnVzZXJzLmZpcnN0KCk7XHJcblxyXG4gIC8vcGFyc2UgYW1vdW50XHJcbiAgdmFyIGFtb3VudCA9ICEhcGFyc2VJbnQobWVzc2FnZS5jb250ZW50LnNwbGl0KFwiIFwiKVsxXSlcclxuICAgID8gcGFyc2VJbnQobWVzc2FnZS5jb250ZW50LnNwbGl0KFwiIFwiKVsxXSlcclxuICAgIDogcGFyc2VJbnQobWVzc2FnZS5jb250ZW50LnNwbGl0KFwiIFwiKVsyXSk7XHJcblxyXG4gIGlmICghYW1vdW50IHx8IGFtb3VudCA+IDEwMCkgYW1vdW50ID0gMTAwO1xyXG4gIGlmIChhbW91bnQgPCAyKSBhbW91bnQgPSAyO1xyXG5cclxuICAvL2ZldGNoIDEwMCBtZXNzYWdlcyAod2lsbCBiZSBmaWx0ZXJlZCBhbmQgbG93ZXJlZCB1cCB0byBtYXggYW1vdW50IHJlcXVlc3RlZClcclxuICAobWVzc2FnZS5jaGFubmVsIGFzIFRleHRDaGFubmVsKS5tZXNzYWdlcy5mZXRjaCh7bGltaXQ6IDEwMH0pLnRoZW4oKG1lc3NhZ2VzOiBhbnkpID0+IHtcclxuICAgIGlmICh1c2VyKSB7XHJcbiAgICAgIGNvbnN0IGZpbHRlckJ5ID0gdXNlciA/IHVzZXIuaWQgOiBjbGllbnQudXNlci5pZDtcclxuICAgICAgbWVzc2FnZXMgPSBtZXNzYWdlc1xyXG4gICAgICAgIC5maWx0ZXIoKG06IE1lc3NhZ2UpID0+IG0uYXV0aG9yLmlkID09PSBmaWx0ZXJCeSlcclxuICAgICAgICAuYXJyYXkoKVxyXG4gICAgICAgIC5zbGljZSgwLCBhbW91bnQpO1xyXG4gICAgfVxyXG5cclxuICAgIG1lc3NhZ2UuY2hhbm5lbC5idWxrRGVsZXRlKG1lc3NhZ2VzKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn07XHJcbiJdfQ==