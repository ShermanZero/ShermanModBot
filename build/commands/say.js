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
    description: "makes the bot say your message",
    usage: "<message>"
};
module.exports = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    const sayMessage = args.join(" ");
    message.delete().catch(err => {
        console.log(err);
    });
    message.channel.send(sayMessage).catch(err => {
        console.log(err);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3NheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHO0lBQ3JCLFdBQVcsRUFBRSxnQ0FBZ0M7SUFDN0MsS0FBSyxFQUFFLFdBQVc7Q0FDbkIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBTyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxJQUFjLEVBQUUsRUFBRTtJQUN2RSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWxDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wcm9wcyA9IHtcclxuICBkZXNjcmlwdGlvbjogXCJtYWtlcyB0aGUgYm90IHNheSB5b3VyIG1lc3NhZ2VcIixcclxuICB1c2FnZTogXCI8bWVzc2FnZT5cIlxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyAoY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UsIGFyZ3M6IHN0cmluZ1tdKSA9PiB7XHJcbiAgY29uc3Qgc2F5TWVzc2FnZSA9IGFyZ3Muam9pbihcIiBcIik7XHJcblxyXG4gIG1lc3NhZ2UuZGVsZXRlKCkuY2F0Y2goZXJyID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgfSk7XHJcbiAgbWVzc2FnZS5jaGFubmVsLnNlbmQoc2F5TWVzc2FnZSkuY2F0Y2goZXJyID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgfSk7XHJcbn07XHJcbiJdfQ==