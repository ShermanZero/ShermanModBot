"use strict";
String.prototype.hideID = function (username) {
    if (!username)
        username = String(this);
    return ("**" +
        String(username).substring(0, String(username).lastIndexOf("_")) +
        "**");
};
//# sourceMappingURL=StringHandler.js.map