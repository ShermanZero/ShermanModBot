export class TwitchConfig {
  static readonly debug = false;
  static readonly verbose = true;
  static readonly prefix = "!";

  static readonly elevation_names = {
    broadcaster: "broadcaster",
    moderator: "moderator",
    subscriber: "subscriber",
    everyone: "everyone"
  };

  static readonly files = {
    logs: {
      twitch: "twitch.txt"
    }
  };
}
