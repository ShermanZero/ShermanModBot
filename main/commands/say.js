
exports.props = {
  "description": "makes the bot say your message",
  "usage": "{message}"
};

exports.run = (client, message, args) => {
  const sayMessage = args.join(" ");

  message.delete().catch((err) => {console.log(err)});
  message.channel.send(sayMessage).catch((err) => {console.log(err)});
}
