import { Client, Guild } from "discord.js";
import * as fs from "fs";
import * as path from "path";

import { BuildOptions } from "../../..";
import rsrc from "../../../discord/discord-resources";
import { MemberConfigType } from "../../../discord/@interfaces/@member_config";

String.prototype.hideID = function(username?: string): string {
  if (!username) username = String(this);
  if (username.indexOf("_") == -1) return username;
  return String(username).substring(0, String(username).lastIndexOf("_"));
};

String.prototype.print = function(verbose?: boolean, message?: string): string {
  if (!message) message = String(this);
  String.prototype.log(message, verbose);
  return message;
};

String.prototype.warning = function(verbose?: boolean, message?: string): string {
  if (!message) message = String(this);
  String.prototype.log(`~~ ${message.yellow} ~~`, verbose);
  return message;
};

String.prototype.error = function(verbose?: boolean, message?: string): string {
  if (!message) message = String(this);
  String.prototype.log(`!! ${message?.red} !!`, verbose);
  return message;
};

String.prototype.success = function(verbose?: boolean, message?: string): string {
  if (!message) message = String(this);
  String.prototype.log(message.green, verbose);
  return message;
};

String.prototype.mention = function(verbose?: boolean, message?: string): string {
  if (!message) message = String(this);
  String.prototype.log(message.cyan, verbose);
  return message;
};

String.prototype.highlight = function(verbose?: boolean, message?: string): string {
  if (!message) message = String(this);
  String.prototype.log(message.magenta, verbose);
  return message;
};

String.prototype.log = function(message?: string, verbose?: boolean): string {
  if (!message) message = String(this);
  if (message.endsWith("\n")) message = message.substring(0, message.lastIndexOf("\n"));
  if (!verbose || (verbose && BuildOptions.verbose)) console.log(message);

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
String.prototype.masterLog = function(client: Client, logType?: string, output?: boolean, message?: string): string {
  if (!message) message = String(this);
  if (!message.endsWith("\n")) message += "\n";

  if (!logType) logType = client.discordConfig.logs.all;

  let masterLogDir = path.join(__dirname, "..", "discord", "logs");
  if (!fs.existsSync(masterLogDir)) {
    fs.mkdirSync(masterLogDir, { recursive: true });
    fs.writeFileSync(path.resolve(masterLogDir, logType), "-- START OF LOG --");
  }

  //if the log length exceeds the threshold, update the master log
  if (client.masterLog.length >= client.discordConfig.preferences.log_threshold_master) {
    for (let i = 0; i < client.masterLog.length; i++) {
      fs.appendFileSync(masterLogDir, client.masterLog[i]);

      if (logType !== client.discordConfig.logs.all) fs.appendFileSync(path.resolve(masterLogDir, client.discordConfig.logs.all), client.masterLog[i]);
    }

    client.masterLog = [];
  }

  if (output) message.print();
  return message;
};

/**
 * Appends a message to the member's log contained by the Discord `Client`
 *
 * @param client the Discord `Client`
 * @param guild the Discord `Guild`
 * @param logType (optional) specify the type of the log
 * @param output (optional) whether or not to print to the console
 * @param message (optional) the message to log
 */
String.prototype.memberLog = function(client: Client, guild: Guild, config: MemberConfigType, logType?: string, output?: boolean, message?: string): string {
  if (!message) message = String(this);
  if (!message.endsWith("\n")) message += "\n";

  if (!logType) logType = client.discordConfig.logs.all;

  let logsDir = path.join(rsrc.getMemberDirectoryFromGuild(guild, config.hidden.username), "logs");
  let memberLog = path.join(logsDir, logType);

  //if the log length exceeds the threshold, update the master log
  if (config.memberLog.length >= client.discordConfig.preferences.log_threshold_member) {
    for (let i = 0; i < config.memberLog.length; i++) {
      fs.appendFileSync(memberLog, config.memberLog[i]);

      if (logType !== client.discordConfig.logs.all) fs.appendFileSync(path.resolve(logsDir, client.discordConfig.logs.all), config.memberLog[i]);
    }

    config.memberLog = [];
  }

  client.updateMember(config);

  if (output) message.print();
  return message;
};
