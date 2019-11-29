export interface DiscordConfig {
  readonly status: "dead | !help";
  readonly prefix: "!";
  readonly verbose: true;

  readonly elevation_names: {
    [key: string]: string;
    readonly botowner: "botowner";
    readonly owner: "owner";
    readonly moderator: "mod";
  };

  readonly channel_names: {
    [key: string]: string;
    readonly default: "default";
    readonly mod_logs: "mod_logs";
  };

  readonly preferences: {
    [key: string]: number;
    readonly xp_threshold: 10;
    readonly log_threshold_member: 10;
    readonly log_threshold_master: 50;
  };

  readonly logs: {
    [key: string]: string;
    readonly all: "all.txt";
    readonly message: "messages.txt";
    readonly warning: "warnings.txt";
    readonly command: "commands.txt";
    readonly twitch: "twitch.txt";
  };

  readonly files: {
    [key: string]: string;
    readonly removed: ".removed";
  };
}
