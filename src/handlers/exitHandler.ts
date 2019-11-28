import 'colors';

import { Client } from 'discord.js';

export default class ExitHandler {
  //initialize
  static init(client: Client) {
    `Registered client with ExitHandler... your crashes are protected now :)`.inverse.normal();

    "...".normal();
    //when app is closing
    process.on("exit" as any, ExitHandler.exitHandler.bind(null, client, { clean: true }));

    //catches ctrl-c event
    process.on("SIGINT" as any, ExitHandler.exitHandler.bind(null, client, { clean: true }));

    //catches kill pid
    process.on("SIGUSR1" as any, ExitHandler.exitHandler.bind(null, client, { clean: true }));
    process.on("SIGUSR2" as any, ExitHandler.exitHandler.bind(null, client, { clean: true }));

    //catches uncaught exceptions
    process.on("uncaughtException" as any, (e: Error) => {
      "Uncaught exception:".error();
      e.stack.red.dim.error();
    });

    //catch unhandled promise rejections
    process.on("unhandledRejection" as any, (e: Error) => {
      "Unhandled rejection:".error();
      e.stack.dim.dim.error();
    });
  }

  static exitHandler(client: any, options: any, exitCode: number) {
    //if we executed the "restart" command
    if (client.alreadyShutdown) return;

    `Preparing to shutdown with exit code (${exitCode})...`.mention;

    if (exitCode == 2) {
      "Forcing shutdown without clean attempt, process will not be restarted".error();
      client.destroy();
    } else if (options.clean) {
      "Attempting to run `restart` command...".mention;
      client.getCommand("restart").run(client, null, false);
    }
  }
}
