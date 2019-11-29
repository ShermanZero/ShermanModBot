import * as fs from "fs";
import * as path from "path";

import global_config from "../resources/global_config";
import rsrc from "../resources/resources";
import { Client } from "discord.js";
import { Guild } from "discord.js";

String.prototype.hideID = function(username?: string): string {
  if (!username) username = String(this);
  if (username.indexOf("_") == -1) return username;
  return String(username).substring(0, String(username).lastIndexOf("_"));
};

String.prototype.print = function(verbose?: boolean, message?: string): any {
  if (!message) message = String(this);
  String.prototype.log(message, verbose);
};

String.prototype.warning = function(verbose?: boolean, message?: string): any {
  if (!message) message = String(this);
  String.prototype.log(`~~ ${message.yellow} ~~`, verbose);
};

String.prototype.error = function(verbose?: boolean, message?: string): any {
  if (!message) message = String(this);
  String.prototype.log(`!! ${message?.red} !!`, verbose);
};

String.prototype.success = function(verbose?: boolean, message?: string): any {
  if (!message) message = String(this);
  String.prototype.log(message.green, verbose);
};

String.prototype.mention = function(verbose?: boolean, message?: string): any {
  if (!message) message = String(this);
  String.prototype.log(message.cyan, verbose);
};

String.prototype.highlight = function(verbose?: boolean, message?: string): any {
  if (!message) message = String(this);
  String.prototype.log(message.magenta, verbose);
};

String.prototype.log = function(message?: string, verbose?: boolean): any {
  if (!message) message = String(this);
  if (message.endsWith("\n")) message = message.substring(0, message.lastIndexOf("\n"));
  if (!verbose || (verbose && global_config.verbose)) console.log(message);

  return message;
};

/**
 * Appends a message to the master log contained by the Discord `Client`
 *
 * @param client the Discord `Client`
 * @param logType (optional) specify the type of the log
 * @param output (optional) whether or not to print to the console
 * @param message (optional) the message to log
 */
String.prototype.masterLog = function(client: Client, logType?: string, output?: boolean, message?: string): any {
  if (!message) message = String(this);
  if (!message.endsWith("\n")) message += "\n";

  if (!logType) logType = client.global_config.files.logs.all;

  let masterLogDir = path.join(__dirname, "..", "logs");
  if (!fs.existsSync(masterLogDir)) {
    fs.mkdirSync(masterLogDir, { recursive: true });
    fs.writeFileSync(path.resolve(masterLogDir, logType), "-- START OF LOG --");
  }

  //if the log length exceeds the threshold, update the master log
  if (client.masterLog.length >= client.global_config.preferences.log_threshold_master) {
    for (let i = 0; i < client.masterLog.length; i++) {
      fs.appendFileSync(masterLogDir, client.masterLog[i]);

      if (logType !== client.global_config.files.logs.all) fs.appendFileSync(path.resolve(masterLogDir, client.global_config.files.logs.all), client.masterLog[i]);
    }

    client.masterLog = [];
  }

  if (output) message.print();
};

/**
 * Appends a message to the user log contained by the Discord `Client`
 *
 * @param client the Discord `Client`
 * @param guild the Discord `Guild`
 * @param logType (optional) specify the type of the log
 * @param output (optional) whether or not to print to the console
 * @param message (optional) the message to log
 */
String.prototype.userLog = function(client: Client, guild: Guild, content: any, logType?: string, output?: boolean, message?: string): any {
  if (!message) message = String(this);
  if (!message.endsWith("\n")) message += "\n";

  if (!logType) logType = client.global_config.files.logs.all;

  let logsDir = path.join(rsrc.getMemerDirectoryFromGuild(guild, content.hidden.username), "logs");
  let userLog = path.join(logsDir, logType);

  //if the log length exceeds the threshold, update the master log
  if (content.userLog.length >= client.global_config.preferences.log_threshold_user) {
    for (let i = 0; i < content.userLog.length; i++) {
      fs.appendFileSync(userLog, content.userLog[i]);

      if (logType !== client.global_config.files.logs.all) fs.appendFileSync(path.resolve(logsDir, client.global_config.files.logs.all), content.userLog[i]);
    }

    content.userLog = [];
  }

  client.updateMember(content);

  if (output) message.print();
};
