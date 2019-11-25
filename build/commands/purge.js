"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.props = {
    requiresElevation: "mod",
    description: "removes a maximum of 100 messages from a channel",
    usage: "{amount} {user}"
};
exports.run = function (client, message, args) {
    var user = message.mentions.users.first();
    //parse amount
    var amount = !!parseInt(message.content.split(" ")[1])
        ? parseInt(message.content.split(" ")[1])
        : parseInt(message.content.split(" ")[2]);
    if (!amount || amount > 100)
        amount = 100;
    if (amount < 2)
        amount = 2;
    //fetch 100 messages (will be filtered and lowered up to max amount requested)
    message.channel.fetchMessages({ limit: amount }).then(function (messages) {
        if (user) {
            var filterBy_1 = user ? user.id : client.user.id;
            messages = messages
                .filter(function (m) { return m.author.id === filterBy_1; })
                .array()
                .slice(0, amount);
        }
        message.channel.bulkDelete(messages).catch(function (err) {
            console.log(err);
        });
    });
};
//# sourceMappingURL=purge.js.map