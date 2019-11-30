import { DiscordConfigType } from "../@interfaces/@discord_config";

export default class DiscordConfig implements DiscordConfigType {
  status: "dead | !help";
  prefix: "!";
  verbose: true;

  elevation_names: {
    [key: string]: string;
    botowner: "botowner";
    owner: "owner";
    moderator: "mod";
  };

  channel_names: {
    [key: string]: string;
    default: "default";
    mod_logs: "mod_logs";
  };

  preferences: {
    [key: string]: number;
    xp_threshold: 10;
    log_threshold_member: 10;
    log_threshold_master: 50;
  };

  logs: {
    [key: string]: string;
    all: "all.txt";
    message: "messages.txt";
    warning: "warnings.txt";
    command: "commands.txt";
    twitch: "twitch.txt";
  };

  files: {
    [key: string]: string;
    removed: ".removed";
  };
}
