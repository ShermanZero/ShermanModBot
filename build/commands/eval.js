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
    description: "runs a line of javascript",
    usage: "<javascript>"
};
module.exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
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
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9ldmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsOERBQWdEO0FBRWhELE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHO0lBQ3JCLGlCQUFpQixFQUFFLHVCQUFNLENBQUMsZUFBZSxDQUFDLFNBQVM7SUFDbkQsV0FBVyxFQUFFLDJCQUEyQjtJQUN4QyxLQUFLLEVBQUUsY0FBYztDQUN0QixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBTyxNQUFXLEVBQUUsT0FBZ0IsRUFBRSxJQUFjLEVBQUUsRUFBRTtJQUMzRSxJQUFJO1FBQ0YsTUFBTSxJQUFJLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEIsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO1lBQUUsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFekUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7S0FDckQ7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ25FO0FBQ0gsQ0FBQyxDQUFBLENBQUM7QUFFRixTQUFTLEtBQUssQ0FBQyxJQUFTO0lBQ3RCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUTtRQUFFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O1FBQ25JLE9BQU8sSUFBSSxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcblxyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL3Jlc291cmNlcy9nbG9iYWxfY29uZmlnJztcclxuXHJcbm1vZHVsZS5leHBvcnRzLnByb3BzID0ge1xyXG4gIHJlcXVpcmVzRWxldmF0aW9uOiBjb25maWcuZWxldmF0aW9uX25hbWVzLm1vZGVyYXRvcixcclxuICBkZXNjcmlwdGlvbjogXCJydW5zIGEgbGluZSBvZiBqYXZhc2NyaXB0XCIsXHJcbiAgdXNhZ2U6IFwiPGphdmFzY3JpcHQ+XCJcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLnJ1biA9IGFzeW5jIChjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSwgYXJnczogc3RyaW5nW10pID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgY29kZTogc3RyaW5nID0gYXJncy5qb2luKFwiIFwiKTtcclxuICAgIGxldCBldmFsZWQgPSBldmFsKGNvZGUpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgZXZhbGVkICE9PSBcInN0cmluZ1wiKSBldmFsZWQgPSByZXF1aXJlKFwidXRpbFwiKS5pbnNwZWN0KGV2YWxlZCk7XHJcblxyXG4gICAgbWVzc2FnZS5jaGFubmVsLnNlbmQoY2xlYW4oZXZhbGVkKSwgeyBjb2RlOiBcIngxXCIgfSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBtZXNzYWdlLmNoYW5uZWwuc2VuZChgXFxgRVJST1JcXGAgXFxgXFxgXFxgeGxcXG4ke2NsZWFuKGVycil9XFxuXFxgXFxgXFxgYCk7XHJcbiAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gY2xlYW4odGV4dDogYW55KSB7XHJcbiAgaWYgKHR5cGVvZiB0ZXh0ID09PSBcInN0cmluZ1wiKSByZXR1cm4gdGV4dC5yZXBsYWNlKC9gL2csIFwiYFwiICsgU3RyaW5nLmZyb21DaGFyQ29kZSg4MjAzKSkucmVwbGFjZSgvQC9nLCBcIkBcIiArIFN0cmluZy5mcm9tQ2hhckNvZGUoODIwMykpO1xyXG4gIGVsc2UgcmV0dXJuIHRleHQ7XHJcbn1cclxuIl19