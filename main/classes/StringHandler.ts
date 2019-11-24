String.prototype.hideID = function (username) {
    if (!username) username = this;
    return "**"+String(username).substring(0, String(username).lastIndexOf("_"))+"**";
};