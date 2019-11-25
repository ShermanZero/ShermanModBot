"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
var ExitHandler = /** @class */ (function () {
    function ExitHandler() {
    }
    //initialize
    ExitHandler.init = function (client) {
        console.log("Registered client with ExitHandler... your crashes are protected now :)"
            .inverse, "\n...");
        //when app is closing
        process.on("exit", ExitHandler.exitHandler.bind(null, client, { clean: true }));
        //catches ctrl-c event
        process.on("SIGINT", ExitHandler.exitHandler.bind(null, client, { clean: true }));
        //catches kill pid
        process.on("SIGUSR1", ExitHandler.exitHandler.bind(null, client, { clean: true }));
        process.on("SIGUSR2", ExitHandler.exitHandler.bind(null, client, { clean: true }));
        //catches uncaught exceptions
        process.on("uncaughtException", function (e) {
            var _a;
            console.log("Uncaught exception:");
            console.log((_a = e.stack) === null || _a === void 0 ? void 0 : _a.red.dim);
        });
        //catch unhandled promise rejections
        process.on("unhandledRejection", function (e) {
            var _a;
            console.log("Unhandled rejection:");
            console.log((_a = e.stack) === null || _a === void 0 ? void 0 : _a.red.dim);
        });
    };
    ExitHandler.exitHandler = function (client, options, exitCode) {
        //if we executed the "restart" command
        if (client.alreadyShutdown)
            return;
        console.log(("Preparing to shutdown with exit code (" + exitCode + ")...").magenta);
        if (exitCode == 2) {
            console.log("Forcing shutdown without clean attempt, process will not be restarted"
                .red);
            client.destroy();
        }
        else if (options.clean) {
            console.log("Attempting to run `restart` command...".magenta);
            client.commands.get("restart").run(client, null, false);
        }
    };
    return ExitHandler;
}());
exports.default = ExitHandler;
module.exports = ExitHandler;
//# sourceMappingURL=ExitHandler.js.map