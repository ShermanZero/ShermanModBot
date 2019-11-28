import { Message } from 'discord.js';

import PurchaseHandler from '../classes/PurchaseHandler';

module.exports.props = {
  description: "purchase coins for the server",
  usage: "<amount>"
};

module.exports.run = async (client: any, message: Message, args: string[]) => {
  if(args.length === 0) return message.reply("you have to specify an amount!");

  let quantity = parseInt(args[0]);
  if(!quantity) return message.reply("I was not able to determine the amount you want :(");

  if(quantity < 1 || quantity > 100)
    return message.reply("I cannot process amounts less than 0 or greater than 100!");

  const ph = new PurchaseHandler();

  ph.createPayment(quantity);
};
