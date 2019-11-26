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
    requiresElevation: "owner",
    description: "runs a line of javascript",
    usage: "<javascript>"
};
module.exports = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = args.join(" ");
        let evaled = eval(code);
        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
        message.channel.send(clean(evaled), { code: "x1" });
    }
    catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
});
function clean(text) {
    if (typeof text === "string")
        return text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9ldmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUc7SUFDckIsaUJBQWlCLEVBQUUsT0FBTztJQUMxQixXQUFXLEVBQUUsMkJBQTJCO0lBQ3hDLEtBQUssRUFBRSxjQUFjO0NBQ3RCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLENBQU8sTUFBVyxFQUFFLE9BQWdCLEVBQUUsSUFBYyxFQUFFLEVBQUU7SUFDdkUsSUFBSTtRQUNGLE1BQU0sSUFBSSxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtZQUFFLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXpFLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3JEO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNuRTtBQUNILENBQUMsQ0FBQSxDQUFDO0FBRUYsU0FBUyxLQUFLLENBQUMsSUFBUztJQUN0QixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVE7UUFDMUIsT0FBTyxJQUFJO2FBQ1IsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM5QyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O1FBQy9DLE9BQU8sSUFBSSxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wcm9wcyA9IHtcclxuICByZXF1aXJlc0VsZXZhdGlvbjogXCJvd25lclwiLFxyXG4gIGRlc2NyaXB0aW9uOiBcInJ1bnMgYSBsaW5lIG9mIGphdmFzY3JpcHRcIixcclxuICB1c2FnZTogXCI8amF2YXNjcmlwdD5cIlxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyAoY2xpZW50OiBhbnksIG1lc3NhZ2U6IE1lc3NhZ2UsIGFyZ3M6IHN0cmluZ1tdKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGNvZGU6IHN0cmluZyA9IGFyZ3Muam9pbihcIiBcIik7XHJcbiAgICBsZXQgZXZhbGVkID0gZXZhbChjb2RlKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIGV2YWxlZCAhPT0gXCJzdHJpbmdcIikgZXZhbGVkID0gcmVxdWlyZShcInV0aWxcIikuaW5zcGVjdChldmFsZWQpO1xyXG5cclxuICAgIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGNsZWFuKGV2YWxlZCksIHsgY29kZTogXCJ4MVwiIH0pO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgbWVzc2FnZS5jaGFubmVsLnNlbmQoYFxcYEVSUk9SXFxgIFxcYFxcYFxcYHhsXFxuJHtjbGVhbihlcnIpfVxcblxcYFxcYFxcYGApO1xyXG4gIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGNsZWFuKHRleHQ6IGFueSkge1xyXG4gIGlmICh0eXBlb2YgdGV4dCA9PT0gXCJzdHJpbmdcIilcclxuICAgIHJldHVybiB0ZXh0XHJcbiAgICAgIC5yZXBsYWNlKC9gL2csIFwiYFwiICsgU3RyaW5nLmZyb21DaGFyQ29kZSg4MjAzKSlcclxuICAgICAgLnJlcGxhY2UoL0AvZywgXCJAXCIgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDgyMDMpKTtcclxuICBlbHNlIHJldHVybiB0ZXh0O1xyXG59XHJcbiJdfQ==