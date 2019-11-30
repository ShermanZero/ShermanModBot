import { DiscordConfigType } from "../@interfaces/@discord_config";

export default class DiscordConfig implements DiscordConfigType {
  status: "dead | !help";
  prefix: "!";
  verbose: true;

  elevation_names = {
    botowner: "botowner",
    owner: "owner",
    moderator: "mod"
  };

  channel_names = {
    default: "default",
    mod_logs: "mod_logs"
  };

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
