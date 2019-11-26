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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvcHVyZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRztJQUNyQixpQkFBaUIsRUFBRSxLQUFLO0lBQ3hCLFdBQVcsRUFBRSxrREFBa0Q7SUFDL0QsS0FBSyxFQUFFLG9CQUFvQjtDQUM1QixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBTyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxJQUFjLEVBQUUsRUFBRTtJQUMzRSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUc1QyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTVDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxHQUFHLEdBQUc7UUFBRSxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBQzFDLElBQUksTUFBTSxHQUFHLENBQUM7UUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBRzNCLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBYSxFQUFFLEVBQUU7UUFDN0MsSUFBSSxJQUFJLEVBQUU7WUFDUixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2pELFFBQVEsR0FBRyxRQUFRO2lCQUNoQixNQUFNLENBQUMsQ0FBQyxDQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLFFBQVEsQ0FBQztpQkFDaEQsS0FBSyxFQUFFO2lCQUNQLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDckI7UUFFRCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wcm9wcyA9IHtcclxuICByZXF1aXJlc0VsZXZhdGlvbjogXCJtb2RcIixcclxuICBkZXNjcmlwdGlvbjogXCJyZW1vdmVzIGEgbWF4aW11bSBvZiAxMDAgbWVzc2FnZXMgZnJvbSBhIGNoYW5uZWxcIixcclxuICB1c2FnZTogXCI8YW1vdW50PiA8P21lbWJlcj5cIlxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMucnVuID0gYXN5bmMgKGNsaWVudDogYW55LCBtZXNzYWdlOiBNZXNzYWdlLCBhcmdzOiBzdHJpbmdbXSkgPT4ge1xyXG4gIGNvbnN0IHVzZXIgPSBtZXNzYWdlLm1lbnRpb25zLnVzZXJzLmZpcnN0KCk7XHJcblxyXG4gIC8vcGFyc2UgYW1vdW50XHJcbiAgdmFyIGFtb3VudCA9ICEhcGFyc2VJbnQobWVzc2FnZS5jb250ZW50LnNwbGl0KFwiIFwiKVsxXSlcclxuICAgID8gcGFyc2VJbnQobWVzc2FnZS5jb250ZW50LnNwbGl0KFwiIFwiKVsxXSlcclxuICAgIDogcGFyc2VJbnQobWVzc2FnZS5jb250ZW50LnNwbGl0KFwiIFwiKVsyXSk7XHJcblxyXG4gIGlmICghYW1vdW50IHx8IGFtb3VudCA+IDEwMCkgYW1vdW50ID0gMTAwO1xyXG4gIGlmIChhbW91bnQgPCAyKSBhbW91bnQgPSAyO1xyXG5cclxuICAvL2ZldGNoIDEwMCBtZXNzYWdlcyAod2lsbCBiZSBmaWx0ZXJlZCBhbmQgbG93ZXJlZCB1cCB0byBtYXggYW1vdW50IHJlcXVlc3RlZClcclxuICBtZXNzYWdlLmNoYW5uZWwuZmV0Y2goKS50aGVuKChtZXNzYWdlczogYW55KSA9PiB7XHJcbiAgICBpZiAodXNlcikge1xyXG4gICAgICBjb25zdCBmaWx0ZXJCeSA9IHVzZXIgPyB1c2VyLmlkIDogY2xpZW50LnVzZXIuaWQ7XHJcbiAgICAgIG1lc3NhZ2VzID0gbWVzc2FnZXNcclxuICAgICAgICAuZmlsdGVyKChtOiBNZXNzYWdlKSA9PiBtLmF1dGhvci5pZCA9PT0gZmlsdGVyQnkpXHJcbiAgICAgICAgLmFycmF5KClcclxuICAgICAgICAuc2xpY2UoMCwgYW1vdW50KTtcclxuICAgIH1cclxuXHJcbiAgICBtZXNzYWdlLmNoYW5uZWwuYnVsa0RlbGV0ZShtZXNzYWdlcykuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59O1xyXG4iXX0=