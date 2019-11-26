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
module.exports = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    const user = message.mentions.users.first();
    var amount = !!parseInt(message.content.split(" ")[1])
        ? parseInt(message.content.split(" ")[1])
        : parseInt(message.content.split(" ")[2]);
    if (!amount || amount > 100)
        amount = 100;
    if (amount < 2)
        amount = 2;
    message.channel.fetch().then((messages) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvcHVyZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixpQkFBaUIsRUFBRSxLQUFLO0lBQ3hCLFdBQVcsRUFBRSxrREFBa0Q7SUFDL0QsS0FBSyxFQUFFLG9CQUFvQjtDQUM1QixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFPLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWMsRUFBRSxFQUFFO0lBQ3ZFLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRzVDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLEdBQUcsR0FBRztRQUFFLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDMUMsSUFBSSxNQUFNLEdBQUcsQ0FBQztRQUFFLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFHM0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFhLEVBQUUsRUFBRTtRQUM3QyxJQUFJLElBQUksRUFBRTtZQUNSLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDakQsUUFBUSxHQUFHLFFBQVE7aUJBQ2hCLE1BQU0sQ0FBQyxDQUFDLENBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssUUFBUSxDQUFDO2lCQUNoRCxLQUFLLEVBQUU7aUJBQ1AsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNyQjtRQUVELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdkaXNjb3JkLmpzJztcclxuXHJcbm1vZHVsZS5leHBvcnRzLnByb3BzID0ge1xyXG4gIHJlcXVpcmVzRWxldmF0aW9uOiBcIm1vZFwiLFxyXG4gIGRlc2NyaXB0aW9uOiBcInJlbW92ZXMgYSBtYXhpbXVtIG9mIDEwMCBtZXNzYWdlcyBmcm9tIGEgY2hhbm5lbFwiLFxyXG4gIHVzYWdlOiBcIjxhbW91bnQ+IDw/bWVtYmVyPlwiXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIChjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSwgYXJnczogc3RyaW5nW10pID0+IHtcclxuICBjb25zdCB1c2VyID0gbWVzc2FnZS5tZW50aW9ucy51c2Vycy5maXJzdCgpO1xyXG5cclxuICAvL3BhcnNlIGFtb3VudFxyXG4gIHZhciBhbW91bnQgPSAhIXBhcnNlSW50KG1lc3NhZ2UuY29udGVudC5zcGxpdChcIiBcIilbMV0pXHJcbiAgICA/IHBhcnNlSW50KG1lc3NhZ2UuY29udGVudC5zcGxpdChcIiBcIilbMV0pXHJcbiAgICA6IHBhcnNlSW50KG1lc3NhZ2UuY29udGVudC5zcGxpdChcIiBcIilbMl0pO1xyXG5cclxuICBpZiAoIWFtb3VudCB8fCBhbW91bnQgPiAxMDApIGFtb3VudCA9IDEwMDtcclxuICBpZiAoYW1vdW50IDwgMikgYW1vdW50ID0gMjtcclxuXHJcbiAgLy9mZXRjaCAxMDAgbWVzc2FnZXMgKHdpbGwgYmUgZmlsdGVyZWQgYW5kIGxvd2VyZWQgdXAgdG8gbWF4IGFtb3VudCByZXF1ZXN0ZWQpXHJcbiAgbWVzc2FnZS5jaGFubmVsLmZldGNoKCkudGhlbigobWVzc2FnZXM6IGFueSkgPT4ge1xyXG4gICAgaWYgKHVzZXIpIHtcclxuICAgICAgY29uc3QgZmlsdGVyQnkgPSB1c2VyID8gdXNlci5pZCA6IGNsaWVudC51c2VyLmlkO1xyXG4gICAgICBtZXNzYWdlcyA9IG1lc3NhZ2VzXHJcbiAgICAgICAgLmZpbHRlcigobTogTWVzc2FnZSkgPT4gbS5hdXRob3IuaWQgPT09IGZpbHRlckJ5KVxyXG4gICAgICAgIC5hcnJheSgpXHJcbiAgICAgICAgLnNsaWNlKDAsIGFtb3VudCk7XHJcbiAgICB9XHJcblxyXG4gICAgbWVzc2FnZS5jaGFubmVsLmJ1bGtEZWxldGUobWVzc2FnZXMpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxuICB9KTtcclxufTtcclxuIl19