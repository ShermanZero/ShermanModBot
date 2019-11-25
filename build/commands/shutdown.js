"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.props = {
    requiresElevation: "owner",
    description: "shuts the bot down immediately",
    usage: ""
};
exports.run = function (client, message, args) {
    var exitCode = 1;
    if (args.length == 1 && args[0].toLowerCase().includes("force"))
        exitCode = 2;
    process.exit(exitCode);
};
//# sourceMappingURL=shutdown.js.map