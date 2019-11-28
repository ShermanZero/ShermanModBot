import * as fs from 'fs';
import * as path from 'path';

import global_config from '../resources/global_config';
import rsrc from '../resources/resources';

String.prototype.hideID = function(username?: string): string {
  if (!username) username = String(this);
  if (username.indexOf("_") == -1) return username;
  return String(username).substring(0, String(username).lastIndexOf("_"));
};

String.prototype.normal = function(verbose?: boolean, message?: string): any {
  if (!message) message = String(this);
  String.prototype.log(message?.white, verbose);
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
  if (!verbose || (verbose && global_config.verbose)) console.log(message);

  return message;
};

String.prototype.masterLog = function(client: any, logType?: string, message?: string): any {
  if(!message) message = String(this);

  let masterLogDir = path.join(__dirname, "..", "logs");

  if (!logType) logType = client.global_config.files.logs.all;

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

  message.normal(true);
};

String.prototype.userLog = function(client: any, guild: any, content: any, logType?: string, message?: string): any {
  if(!message) message = String(this);

  if (!logType) logType = client.global_config.files.logs.all;

  let logsDir = path.join(rsrc.getUserDirectoryFromGuild(guild, content.hidden.username), "logs");
  let userLog = path.join(logsDir, logType);

  //if the log length exceeds the threshold, update the master log
  if (content.userLog.length >= client.global_config.preferences.log_threshold_user) {
    for (let i = 0; i < content.userLog.length; i++) {
      fs.appendFileSync(userLog, content.userLog[i]);

      if (logType !== client.global_config.files.logs.all) fs.appendFileSync(path.resolve(logsDir, client.global_config.files.logs.all), client.masterLog[i]);
    }

    content.userLog = [];
  }

  //have to update the Enmap
  client.updateUser(content);

  //log it to the console
  message.normal(true);
};
