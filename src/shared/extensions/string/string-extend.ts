import { Client, Guild } from "discord.js";
import * as fs from "fs";
import * as path from "path";

import { BuildOptions } from "../../..";
import rsrc from "../../../discord/resources";
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
  String.prototype.log(message.magenta, verbose);
  return message;
};

String.prototype.highlight = function(verbose?: boolean, message?: string): string {
  if (!message) message = String(this);
  String.prototype.log(message.cyan, verbose);
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
String.prototype.masterLog = function(client: Client, guild: Guild, logType?: string, output?: boolean, message?: string): string {
  if (!message) message = String(this);
  if (!message.endsWith("\n")) message += "\n";

  if (!logType) logType = client.discordConfig.logs.all;

  let guildName = rsrc.getGuildNameFromGuild(guild);

  let masterLogDir = path.join(__dirname, "..", "..", "..", "discord", "guilds", guildName, "logs");
  if (!fs.existsSync(masterLogDir)) fs.mkdirSync(masterLogDir, { recursive: true });

  //if the log length exceeds the threshold, update the master log
  if (client.masterLog.length >= client.discordConfig.preferences.log_threshold_master) {
    for (let i = 0; i < client.masterLog.length; i++) {
      fs.appendFileSync(path.join(masterLogDir, logType), client.masterLog[i]);

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
String.prototype.memberLog = function(client: Client, guild: Guild, memberConfig: MemberConfigType, logType?: string, output?: boolean, message?: string): string {
  if (!message) message = String(this);
  if (!message.endsWith("\n")) message += "\n";

  if (!logType) logType = client.discordConfig.logs.all;

  let logsDir = path.join(rsrc.getMemberDirectoryFromGuild(guild, memberConfig.hidden.username), "logs");
  let memberLogFile = path.join(logsDir, logType);

  //if the log length exceeds the threshold, update the master log
  if (memberConfig.memberLog.length >= client.discordConfig.preferences.log_threshold_member) {
    for (let i = 0; i < memberConfig.memberLog.length; i++) {
      fs.appendFileSync(memberLogFile, memberConfig.memberLog[i]);

      if (logType !== client.discordConfig.logs.all) fs.appendFileSync(path.resolve(logsDir, client.discordConfig.logs.all), memberConfig.memberLog[i]);
    }

    memberConfig.memberLog = [];
  }

  client.updateMember(memberConfig);

  if (output) message.print();
  return message;
};
