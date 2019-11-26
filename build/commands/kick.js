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
class kick {
    constructor() {
        this.props = {
            requiresElevation: "mod",
            description: "kicks a member from the server",
            usage: "<member> <?reason>"
        };
    }
    run(client, message, [mention, ...reason]) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.mentions.members || message.mentions.members.size === 0)
                return message.reply("please mention a user to kick");
            const kickMember = message.mentions.members.first();
            yield kickMember.kick(reason.join(" "));
            let modChannel = client.channels.get(client.config.channels.mod.logs);
            yield modChannel.send(`${kickMember.user.username} was kicked by ${message.author.tag} for reason: ${reason}`);
        });
    }
}
exports.default = kick;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2ljay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9raWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsTUFBcUIsSUFBSTtJQUF6QjtRQUNFLFVBQUssR0FBRztZQUNOLGlCQUFpQixFQUFFLEtBQUs7WUFDeEIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxLQUFLLEVBQUUsb0JBQW9CO1NBQzVCLENBQUM7SUFlSixDQUFDO0lBYk8sR0FBRyxDQUFDLE1BQVcsRUFBRSxPQUFnQixFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDOztZQUMzRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUM7Z0JBQ2xFLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBRXhELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRXBELE1BQU0sVUFBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFekMsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RFLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FDbkIsR0FBRyxVQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsa0JBQWtCLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxnQkFBZ0IsTUFBTSxFQUFFLENBQ3pGLENBQUM7UUFDSixDQUFDO0tBQUE7Q0FDRjtBQXBCRCx1QkFvQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBraWNrIHtcclxuICBwcm9wcyA9IHtcclxuICAgIHJlcXVpcmVzRWxldmF0aW9uOiBcIm1vZFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwia2lja3MgYSBtZW1iZXIgZnJvbSB0aGUgc2VydmVyXCIsXHJcbiAgICB1c2FnZTogXCI8bWVtYmVyPiA8P3JlYXNvbj5cIlxyXG4gIH07XHJcblxyXG4gIGFzeW5jIHJ1bihjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSwgW21lbnRpb24sIC4uLnJlYXNvbl0pIHtcclxuICAgIGlmICghbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzIHx8IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycy5zaXplID09PSAwKVxyXG4gICAgICByZXR1cm4gbWVzc2FnZS5yZXBseShcInBsZWFzZSBtZW50aW9uIGEgdXNlciB0byBraWNrXCIpO1xyXG5cclxuICAgIGNvbnN0IGtpY2tNZW1iZXIgPSBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMuZmlyc3QoKTtcclxuXHJcbiAgICBhd2FpdCBraWNrTWVtYmVyIS5raWNrKHJlYXNvbi5qb2luKFwiIFwiKSk7XHJcblxyXG4gICAgbGV0IG1vZENoYW5uZWwgPSBjbGllbnQuY2hhbm5lbHMuZ2V0KGNsaWVudC5jb25maWcuY2hhbm5lbHMubW9kLmxvZ3MpO1xyXG4gICAgYXdhaXQgbW9kQ2hhbm5lbC5zZW5kKFxyXG4gICAgICBgJHtraWNrTWVtYmVyIS51c2VyLnVzZXJuYW1lfSB3YXMga2lja2VkIGJ5ICR7bWVzc2FnZS5hdXRob3IudGFnfSBmb3IgcmVhc29uOiAke3JlYXNvbn1gXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=