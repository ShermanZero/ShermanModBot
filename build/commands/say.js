"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.props = {
    description: "makes the bot say your message",
    usage: "{message}"
};
exports.run = function (client, message, args) {
    var sayMessage = args.join(" ");
    message.delete().catch(function (err) {
        console.log(err);
    });
    message.channel.send(sayMessage).catch(function (err) {
        console.log(err);
    });
};
//# sourceMappingURL=say.js.map