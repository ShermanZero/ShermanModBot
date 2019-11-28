import * as paypal from 'paypal-rest-sdk';

import global_config from '../resources/global_config';

export default class PurchaseHandler {
  constructor() {
    paypal.configure({
      mode: "sandbox", //sandbox or live
      client_id: global_config.paypal.sandbox.client_id,
      client_secret: global_config.paypal.sandbox.secret_id
    });
  }

  createPayment(quantity: number) {
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal"
      },
      redirect_urls: {
        return_url: "http://return.url",
        cancel_url: "http://cancel.url"
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: global_config.paypal.name.toString(),
                price: global_config.paypal.costPerCoin.toString(),
                currency: "USD",
                quantity: quantity
              }
            ]
          },
          amount: {
            currency: "USD",
            total: (quantity * global_config.paypal.costPerCoin).toString()
          },
          description: `You are purchasing coins for the server`
        }
      ]
    };

    paypal.payment.create(create_payment_json, function(error, payment) {
      if (error) {
        throw error;
      } else {
        console.log("Create Payment Response");
        console.log(payment);
      }
    });
  }
}
