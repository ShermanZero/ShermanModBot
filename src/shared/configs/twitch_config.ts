export interface TwitchConfig {
  readonly debug: false;
  readonly verbose: true;
  readonly prefix: "!";

  readonly elevation_names: {
    [key: string]: string;
    readonly broadcaster: "broadcaster";
    readonly moderator: "moderator";
    readonly subscriber: "subscriber";
    readonly everyone: "everyone";
  };

  readonly files: {
    [key: string]: any;
    readonly logs: {
      [key: string]: string;
      readonly twitch: "twitch.txt";
    };
  };
}
