import TwitchClient from 'twitch';
import ChatClient from 'twitch-chat-client';

import secrets from '../secrets';

export default class TwitchIntegration {
  static async start() {
    const clientID = secrets.twitch.client_id;
    const accessToken = secrets.twitch.access_token;

    console.log(`...\n${"Beginning Twitch integration".inverse}`);

    console.log("  *Attempting to authorize to Twitch...");
    const twitchClient = await TwitchClient.withCredentials(clientID, accessToken);

    console.log("  *Attempting to authorize chat client...");
    const chatClient = await ChatClient.forTwitchClient(twitchClient);

    console.log("    *Successful authorization to Twitch!".green);

    await chatClient.connect();

    console.log("  *Connected to chat client, awaiting registration...");
    await chatClient.waitForRegistration();

    console.log("  *Got registration, attempting to join....");
    await chatClient.join("ShermanZero");

    console.log("    *Joined chat!".green);
    console.log(`${"Twitch chat has been linked".inverse}\n...`);

    chatClient.onPrivmsg((channel, user, message) => {
      if (message === "!ping") {
        chatClient.say(channel, "Pong!");
      } else if (message === "!dice") {
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        chatClient.say(channel, `@${user} rolled a ${diceRoll}`);
      }
    });

    chatClient.onSub((channel, user) => {
      chatClient.say(channel, `Thanks to @${user} for subscribing to the channel!`);
    });

    chatClient.onResub((channel, user, subInfo) => {
      chatClient.say(channel, `Thanks to @${user} for subscribing to the channel for a total of ${subInfo.months} months!`);
    });

    chatClient.onSubGift((channel, user, subInfo) => {
      chatClient.say(channel, `Thanks to ${subInfo.gifter} for gifting a subscription to ${user}!`);
    });
  }
}
