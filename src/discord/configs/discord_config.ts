import { DiscordConfigType } from '../@utilities/@discord_config';

export default class DiscordConfig implements DiscordConfigType {
  status = "dead | !help";
  prefix = "!";
  verbose = true;

  preferences = {
    xp_threshold: 10,
    log_threshold_member: 10,
    log_threshold_master: 50
  };

  logs = {
    all: "all.txt",
    message: "messages.txt",
    warning: "warnings.txt",
    command: "commands.txt",
    twitch: "twitch.txt"
  };

  files = {
    removed: ".removed"
  };
}
