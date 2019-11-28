import 'colors';

import { Client } from 'discord.js';

export default class ExitHandler {
  //initialize
  static init(client: Client) {
    console.log(`Registered client with ExitHandler... your crashes are protected now :)`.inverse, "\n...");

    //when app is closing
    process.on("exit" as any, ExitHandler.exitHandler.bind(null, client, { clean: true }));

    //catches ctrl-c event
    process.on("SIGINT" as any, ExitHandler.exitHandler.bind(null, client, { clean: true }));

    //catches kill pid
    process.on("SIGUSR1" as any, ExitHandler.exitHandler.bind(null, client, { clean: true }));
    process.on("SIGUSR2" as any, ExitHandler.exitHandler.bind(null, client, { clean: true }));

    //catches uncaught exceptions
    process.on("uncaughtException" as any, (e: Error) => {
      console.log("Uncaught exception:");
      console.log((e.stack as any).red.dim);
    });

    //catch unhandled promise rejections
    process.on("unhandledRejection" as any, (e: Error) => {
      console.log("Unhandled rejection:");
      console.log((e.stack as any).red.dim);
    });
  }

  static exitHandler(client: any, options: any, exitCode: number) {
    //if we executed the "restart" command
    if (client.alreadyShutdown) return;

    console.log(`Preparing to shutdown with exit code (${exitCode})...`.magenta);

    if (exitCode == 2) {
      console.log("Forcing shutdown without clean attempt, process will not be restarted".red);
      client.destroy();
    } else if (options.clean) {
      console.log("Attempting to run `restart` command...".magenta);
      client.getCommand("restart").run(client, null, false);
    }
  }
}
