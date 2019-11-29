import { Client } from "discord.js";

/**
 * Protects the bot against some of the standard exit commands
 *
 * @author ShermanZero
 */
export default class ExitHandler {
  /**
   * Initializes the exit handler
   *
   * @static
   * @param client the Discord client
   * @memberof ExitHandler
   */
  static init(client: Client) {
    `Registered client with ExitHandler... your crashes are protected now :)`.inverse.print();

    "...".print();
    //when app is closing
    process.on("exit" as any, ExitHandler.exitHandler.bind(null, client, { clean: true }));

    //catches ctrl-c event
    process.on("SIGINT" as any, ExitHandler.exitHandler.bind(null, client, { clean: true }));

    //catches kill pid
    process.on("SIGUSR1" as any, ExitHandler.exitHandler.bind(null, client, { clean: true }));
    process.on("SIGUSR2" as any, ExitHandler.exitHandler.bind(null, client, { clean: true }));

    //catches uncaught exceptions
    process.on("uncaughtException" as any, (e: Error) => {
      "Uncaught exception:".error(true);
      e.stack.red.dim.error(true);
    });

    //catch unhandled promise rejections
    process.on("unhandledRejection" as any, (e: Error) => {
      "Unhandled rejection:".error(true);
      e.stack.dim.dim.error(true);
    });
  }

  /**
   * The method bound to the exit handler
   *
   * @static
   * @param {Client} client the Discord client
   * @param {*} options { clean }
   * @param {number} exitCode the exit code
   * @returns
   * @memberof ExitHandler
   */
  static exitHandler(client: Client, options: any, exitCode: number) {
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
