import { Message, TextChannel } from "discord.js";

import config from "../resources/global_config";

module.exports.props = {
  requiresElevation: config.elevation_names.moderator,
  description: "removes a maximum of 100 messages from a channel",
  usage: "<amount> <?member>"
};

module.exports.run = async (client: any, message: Message, args: string[]) => {
  const user = message.mentions.users.first();

  //parse amount
  let amount = !!parseInt(message.content.split(" ")[1]) ? parseInt(message.content.split(" ")[1]) : parseInt(message.content.split(" ")[2]);

  if (!amount || amount > 100) amount = 100;
  if (amount < 2) amount = 2;

  //fetch 100 messages (will be filtered and lowered up to max amount requested)
  (message.channel as TextChannel).messages.fetch({ limit: 100 }).then(async (messages: any) => {
    if (user) {
      const filterBy = user ? user.id : client.user.id;
      messages = messages
        .filter((m: Message) => m.author.id === filterBy)
        .array()
        .slice(0, amount);
    }

    await message.channel.bulkDelete(messages);
  });
};
