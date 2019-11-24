"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
class ExitHandler {
    static init(client) {
        console.log(`Registered client with ExitHandler... your crashes are protected now :)`.inverse, "\n...");
        process.on("exit", this.exitHandler.bind(null, client, { clean: true }));
        process.on("SIGINT", this.exitHandler.bind(null, client, { clean: true }));
        process.on("SIGUSR1", this.exitHandler.bind(null, client, { clean: true }));
        process.on("SIGUSR2", this.exitHandler.bind(null, client, { clean: true }));
        process.on("uncaughtException", (e) => {
            console.log("Uncaught exception:");
            console.log(e.stack.red.dim);
        });
        process.on("unhandledRejection", (e) => {
            console.log("Unhandled rejection:");
            console.log(e.stack.red.dim);
        });
    }
    static exitHandler(client, options, exitCode) {
        if (client.alreadyShutdown)
            return;
        console.log(`Preparing to shutdown with exit code (${exitCode})...`.magenta);
        if (exitCode == 2) {
            console.log("Forcing shutdown without clean attempt, process will not be restarted".red);
            client.destroy();
        }
        else if (options.clean) {
            console.log("Attempting to run `restart` command...".magenta);
            client.commands.get("restart").run(client, null, false);
        }
    }
}
exports.default = ExitHandler;
//# sourceMappingURL=ExitHandler.js.map