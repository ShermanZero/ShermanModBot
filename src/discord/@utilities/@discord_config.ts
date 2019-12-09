export interface DiscordConfigType {
  status: string;
  prefix: string;
  verbose: boolean;

  preferences: {
    [key: string]: number;
    xp_threshold: number;
    log_threshold_member: number;
    log_threshold_master: number;
  };

  logs: {
    [key: string]: string;
    all: string;
    message: string;
    warning: string;
    command: string;
    twitch: string;
  };

  files: {
    [key: string]: string;
    removed: string;
  };
}
