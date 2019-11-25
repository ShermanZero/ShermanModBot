"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.props = {
    requiresElevation: "owner",
    description: "runs a line of javascript",
    usage: "{javascript}"
};
exports.run = function (client, message, args) {
    try {
        var code = args.join(" ");
        var evaled = eval(code);
        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
        message.channel.send(clean(evaled), { code: "x1" });
    }
    catch (err) {
        message.channel.send("`ERROR` ```xl\n" + clean(err) + "\n```");
    }
};
function clean(text) {
    if (typeof text === "string")
        return text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
//# sourceMappingURL=eval.js.map