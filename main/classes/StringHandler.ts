interface String {
    hideID(username: string)
}

String.prototype.hideID = function (username: string) {
    if (!username) username = this;
    return "**"+String(username).substring(0, String(username).lastIndexOf("_"))+"**";
};