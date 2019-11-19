
exports.props = {
  "requiresElevation": "owner",
  "description": "tests an event",
  "usage": "{event}"
};

exports.run = (client, message, args) => {
  let member = message.member;

  console.log(message.mentions.members.first().displayName + " : : : : " + message.mentions.members.last().displayName);

  if(message.mentions.members.size > 0)
    member = message.mentions.members.first();

  client.emit(args[0], message.mentions.members.first(), message.mentions.members.last());
};
