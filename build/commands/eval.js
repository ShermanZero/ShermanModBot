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
class evaluate {
    constructor() {
        this.props = {
            requiresElevation: "owner",
            description: "runs a line of javascript",
            usage: "<javascript>"
        };
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const code = args.join(" ");
                let evaled = eval(code);
                if (typeof evaled !== "string")
                    evaled = require("util").inspect(evaled);
                message.channel.send(this.clean(evaled), { code: "x1" });
            }
            catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${this.clean(err)}\n\`\`\``);
            }
        });
    }
    clean(text) {
        if (typeof text === "string")
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }
}
exports.default = evaluate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9ldmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsTUFBcUIsUUFBUTtJQUE3QjtRQUNFLFVBQUssR0FBRztZQUNOLGlCQUFpQixFQUFFLE9BQU87WUFDMUIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxLQUFLLEVBQUUsY0FBYztTQUN0QixDQUFDO0lBc0JKLENBQUM7SUFwQk8sR0FBRyxDQUFDLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWM7O1lBQ3JELElBQUk7Z0JBQ0YsTUFBTSxJQUFJLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUV4QixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7b0JBQUUsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXpFLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUMxRDtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN4RTtRQUNILENBQUM7S0FBQTtJQUVELEtBQUssQ0FBQyxJQUFTO1FBQ2IsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRO1lBQzFCLE9BQU8sSUFBSTtpQkFDUixPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM5QyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O1lBQy9DLE9BQU8sSUFBSSxDQUFDO0lBQ25CLENBQUM7Q0FDRjtBQTNCRCwyQkEyQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBldmFsdWF0ZSB7XHJcbiAgcHJvcHMgPSB7XHJcbiAgICByZXF1aXJlc0VsZXZhdGlvbjogXCJvd25lclwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwicnVucyBhIGxpbmUgb2YgamF2YXNjcmlwdFwiLFxyXG4gICAgdXNhZ2U6IFwiPGphdmFzY3JpcHQ+XCJcclxuICB9O1xyXG5cclxuICBhc3luYyBydW4oY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UsIGFyZ3M6IHN0cmluZ1tdKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjb2RlOiBzdHJpbmcgPSBhcmdzLmpvaW4oXCIgXCIpO1xyXG4gICAgICBsZXQgZXZhbGVkID0gZXZhbChjb2RlKTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgZXZhbGVkICE9PSBcInN0cmluZ1wiKSBldmFsZWQgPSByZXF1aXJlKFwidXRpbFwiKS5pbnNwZWN0KGV2YWxlZCk7XHJcblxyXG4gICAgICBtZXNzYWdlLmNoYW5uZWwuc2VuZCh0aGlzLmNsZWFuKGV2YWxlZCksIHsgY29kZTogXCJ4MVwiIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGBcXGBFUlJPUlxcYCBcXGBcXGBcXGB4bFxcbiR7dGhpcy5jbGVhbihlcnIpfVxcblxcYFxcYFxcYGApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2xlYW4odGV4dDogYW55KSB7XHJcbiAgICBpZiAodHlwZW9mIHRleHQgPT09IFwic3RyaW5nXCIpXHJcbiAgICAgIHJldHVybiB0ZXh0XHJcbiAgICAgICAgLnJlcGxhY2UoL2AvZywgXCJgXCIgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDgyMDMpKVxyXG4gICAgICAgIC5yZXBsYWNlKC9AL2csIFwiQFwiICsgU3RyaW5nLmZyb21DaGFyQ29kZSg4MjAzKSk7XHJcbiAgICBlbHNlIHJldHVybiB0ZXh0O1xyXG4gIH1cclxufVxyXG4iXX0=