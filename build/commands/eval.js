"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
module.exports.props = {
  requiresElevation: "owner",
  description: "runs a line of javascript",
  usage: "<javascript>"
};
module.exports.run = (client, message, args) =>
  __awaiter(void 0, void 0, void 0, function*() {
    try {
      const code = args.join(" ");
      let evaled = eval(code);
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      message.channel.send(clean(evaled), { code: "x1" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  });
function clean(text) {
  if (typeof text === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9ldmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUc7SUFDckIsaUJBQWlCLEVBQUUsT0FBTztJQUMxQixXQUFXLEVBQUUsMkJBQTJCO0lBQ3hDLEtBQUssRUFBRSxjQUFjO0NBQ3RCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFPLE1BQVcsRUFBRSxPQUFnQixFQUFFLElBQWMsRUFBRSxFQUFFO0lBQzNFLElBQUk7UUFDRixNQUFNLElBQUksR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7WUFBRSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV6RSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNyRDtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDbkU7QUFDSCxDQUFDLENBQUEsQ0FBQztBQUVGLFNBQVMsS0FBSyxDQUFDLElBQVM7SUFDdEIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRO1FBQzFCLE9BQU8sSUFBSTthQUNSLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDOUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztRQUMvQyxPQUFPLElBQUksQ0FBQztBQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMucHJvcHMgPSB7XHJcbiAgcmVxdWlyZXNFbGV2YXRpb246IFwib3duZXJcIixcclxuICBkZXNjcmlwdGlvbjogXCJydW5zIGEgbGluZSBvZiBqYXZhc2NyaXB0XCIsXHJcbiAgdXNhZ2U6IFwiPGphdmFzY3JpcHQ+XCJcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLnJ1biA9IGFzeW5jIChjbGllbnQ6IGFueSwgbWVzc2FnZTogTWVzc2FnZSwgYXJnczogc3RyaW5nW10pID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgY29kZTogc3RyaW5nID0gYXJncy5qb2luKFwiIFwiKTtcclxuICAgIGxldCBldmFsZWQgPSBldmFsKGNvZGUpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgZXZhbGVkICE9PSBcInN0cmluZ1wiKSBldmFsZWQgPSByZXF1aXJlKFwidXRpbFwiKS5pbnNwZWN0KGV2YWxlZCk7XHJcblxyXG4gICAgbWVzc2FnZS5jaGFubmVsLnNlbmQoY2xlYW4oZXZhbGVkKSwgeyBjb2RlOiBcIngxXCIgfSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBtZXNzYWdlLmNoYW5uZWwuc2VuZChgXFxgRVJST1JcXGAgXFxgXFxgXFxgeGxcXG4ke2NsZWFuKGVycil9XFxuXFxgXFxgXFxgYCk7XHJcbiAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gY2xlYW4odGV4dDogYW55KSB7XHJcbiAgaWYgKHR5cGVvZiB0ZXh0ID09PSBcInN0cmluZ1wiKVxyXG4gICAgcmV0dXJuIHRleHRcclxuICAgICAgLnJlcGxhY2UoL2AvZywgXCJgXCIgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDgyMDMpKVxyXG4gICAgICAucmVwbGFjZSgvQC9nLCBcIkBcIiArIFN0cmluZy5mcm9tQ2hhckNvZGUoODIwMykpO1xyXG4gIGVsc2UgcmV0dXJuIHRleHQ7XHJcbn1cclxuIl19
