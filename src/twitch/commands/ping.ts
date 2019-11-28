import ChatClient from 'twitch-chat-client';

module.exports.run = (client: ChatClient, channel: string, message: string) => {
  client.say(channel, "pong!");
}