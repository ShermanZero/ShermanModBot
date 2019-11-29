class TwitchConfig {
  static readonly debug: false;
  static readonly verbose: true;
  static readonly prefix: "!";

  static readonly elevation_names: {
    [key: string]: string;
    readonly broadcaster: "broadcaster";
    readonly moderator: "moderator";
    readonly subscriber: "subscriber";
    readonly everyone: "everyone";
  };

  static readonly files: {
    [key: string]: any;
    readonly logs: {
      [key: string]: string;
      readonly twitch: "twitch.txt";
    };
  };
}
