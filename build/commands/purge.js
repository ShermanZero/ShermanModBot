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
class merge {
    constructor() {
        this.props = {
            requiresElevation: "mod",
            description: "removes a maximum of 100 messages from a channel",
            usage: "<amount> <?member>"
        };
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
}
exports.default = merge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvcHVyZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxNQUFxQixLQUFLO0lBQTFCO1FBQ0UsVUFBSyxHQUFHO1lBQ04saUJBQWlCLEVBQUUsS0FBSztZQUN4QixXQUFXLEVBQUUsa0RBQWtEO1lBQy9ELEtBQUssRUFBRSxvQkFBb0I7U0FDNUIsQ0FBQztJQTRCSixDQUFDO0lBMUJPLEdBQUcsQ0FBQyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxJQUFjOztZQUNyRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUc1QyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFNUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLEdBQUcsR0FBRztnQkFBRSxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQzFDLElBQUksTUFBTSxHQUFHLENBQUM7Z0JBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUczQixPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQWEsRUFBRSxFQUFFO2dCQUM3QyxJQUFJLElBQUksRUFBRTtvQkFDUixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUNqRCxRQUFRLEdBQUcsUUFBUTt5QkFDaEIsTUFBTSxDQUFDLENBQUMsQ0FBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxRQUFRLENBQUM7eUJBQ2hELEtBQUssRUFBRTt5QkFDUCxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUNyQjtnQkFFRCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25CLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7Q0FDRjtBQWpDRCx3QkFpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBtZXJnZSB7XHJcbiAgcHJvcHMgPSB7XHJcbiAgICByZXF1aXJlc0VsZXZhdGlvbjogXCJtb2RcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcInJlbW92ZXMgYSBtYXhpbXVtIG9mIDEwMCBtZXNzYWdlcyBmcm9tIGEgY2hhbm5lbFwiLFxyXG4gICAgdXNhZ2U6IFwiPGFtb3VudD4gPD9tZW1iZXI+XCJcclxuICB9O1xyXG5cclxuICBhc3luYyBydW4oY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UsIGFyZ3M6IHN0cmluZ1tdKSB7XHJcbiAgICBjb25zdCB1c2VyID0gbWVzc2FnZS5tZW50aW9ucy51c2Vycy5maXJzdCgpO1xyXG5cclxuICAgIC8vcGFyc2UgYW1vdW50XHJcbiAgICB2YXIgYW1vdW50ID0gISFwYXJzZUludChtZXNzYWdlLmNvbnRlbnQuc3BsaXQoXCIgXCIpWzFdKVxyXG4gICAgICA/IHBhcnNlSW50KG1lc3NhZ2UuY29udGVudC5zcGxpdChcIiBcIilbMV0pXHJcbiAgICAgIDogcGFyc2VJbnQobWVzc2FnZS5jb250ZW50LnNwbGl0KFwiIFwiKVsyXSk7XHJcblxyXG4gICAgaWYgKCFhbW91bnQgfHwgYW1vdW50ID4gMTAwKSBhbW91bnQgPSAxMDA7XHJcbiAgICBpZiAoYW1vdW50IDwgMikgYW1vdW50ID0gMjtcclxuXHJcbiAgICAvL2ZldGNoIDEwMCBtZXNzYWdlcyAod2lsbCBiZSBmaWx0ZXJlZCBhbmQgbG93ZXJlZCB1cCB0byBtYXggYW1vdW50IHJlcXVlc3RlZClcclxuICAgIG1lc3NhZ2UuY2hhbm5lbC5mZXRjaCgpLnRoZW4oKG1lc3NhZ2VzOiBhbnkpID0+IHtcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICBjb25zdCBmaWx0ZXJCeSA9IHVzZXIgPyB1c2VyLmlkIDogY2xpZW50LnVzZXIuaWQ7XHJcbiAgICAgICAgbWVzc2FnZXMgPSBtZXNzYWdlc1xyXG4gICAgICAgICAgLmZpbHRlcigobTogTWVzc2FnZSkgPT4gbS5hdXRob3IuaWQgPT09IGZpbHRlckJ5KVxyXG4gICAgICAgICAgLmFycmF5KClcclxuICAgICAgICAgIC5zbGljZSgwLCBhbW91bnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBtZXNzYWdlLmNoYW5uZWwuYnVsa0RlbGV0ZShtZXNzYWdlcykuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufSJdfQ==