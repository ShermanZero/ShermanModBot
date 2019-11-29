class DiscordConfig {
  static readonly status: "dead | !help";
  static readonly prefix: "!";
  static readonly verbose: true;

  static readonly elevation_names: {
    [key: string]: string;
    readonly botowner: "botowner";
    readonly owner: "owner";
    readonly moderator: "mod";
  };

  static readonly channel_names: {
    [key: string]: string;
    readonly default: "default";
    readonly mod_logs: "mod_logs";
  };

  static readonly preferences: {
    [key: string]: number;
    readonly xp_threshold: 10;
    readonly log_threshold_member: 10;
    readonly log_threshold_master: 50;
  };

  static readonly logs: {
    [key: string]: string;
    readonly all: "all.txt";
    readonly message: "messages.txt";
    readonly warning: "warnings.txt";
    readonly command: "commands.txt";
    readonly twitch: "twitch.txt";
  };

  static readonly files: {
    [key: string]: string;
    readonly removed: ".removed";
  };
}
