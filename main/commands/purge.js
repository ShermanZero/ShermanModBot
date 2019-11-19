
exports.props = {
  "requiresElevation": true,
  "description": "removes a maximum of 100 messages from a channel",
  "usage": "{amount} {user}"
};

exports.run = (client, message, args) => {
  const modRole = message.member.roles.has(client.config.modID);

  if(!modRole)
    return;

  const user = message.mentions.users.first();

  //parse amount
  var amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2]);

  if(!amount) amount = 100;

  //fetch 100 messages (will be filtered and lowered up to max amount requested)
  message.channel.fetchMessages({limit: 100})
    .then((messages) => {
      if(user) {
        const filterBy = user ? user.id : Client.user.id;
        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
      }

      message.channel.bulkDelete(messages).catch((err) => {console.log(err)});
  });
}
