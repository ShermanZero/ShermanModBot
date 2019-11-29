export default {
  status: "dead | !help",
  debug: false,
  verbose: true,
  prefix: "!",

  elevation_names: {
    botowner: "botowner",
    owner: "owner",
    moderator: "mod"
  },

  channel_names: {
    default: "default",
    mod_logs: "mod_logs"
  },

  preferences: {
    xp_threshold: 10,
    log_threshold_user: 10,
    log_threshold_master: 25
  },

  files: {
    logs: {
      all: "all.txt",
      message: "messages.txt",
      warning: "warnings.txt",
      command: "commands.txt",
      twitch: "twitch_messages.txt"
    },
    removed: ".removed",
    guild_config: "guild_config.json"
  }
};
