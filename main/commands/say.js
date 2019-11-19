
exports.props = {
  "requiresElevation": false,
  "description": "makes the bot say your message",
  "usage": "{message}"
};

exports.run = (client, message, args) => {
  const sayMessage = args.join(" ");

  message.delete().catch(error=>{});
  message.channel.send(sayMessage);
}
