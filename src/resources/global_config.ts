export default {
  status: "dead | !help",
  debug: true,
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
    log_all: "allmessages.txt",
    removed: ".removed",
    guild_config: "guild_config.json"
  }
};
