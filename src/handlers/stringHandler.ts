interface String {
  hideID(username?: string): string;
}

String.prototype.hideID = function(username?: string): string {
  if (!username) username = String(this);
  return "**" + String(username).substring(0, String(username).lastIndexOf("_")) + "**";
};
