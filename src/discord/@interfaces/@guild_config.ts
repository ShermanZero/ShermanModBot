export interface GuildConfigType {
  setup: boolean;
  members: Array<string>;

  roles: {
    [key: string]: string;
    guildowner: string;
    administrator: string;
    moderator: string;
  };

  role_names: {
    [key: string]: string;
    guildowner: string;
    administrator: string;
    moderator: string;
  };

  channels: {
    [key: string]: string;
    default: string;
    mod_logs: string;
  };
}

export enum GuildElevationTypes {
  botowner = "botowner",
  guildowner = "guild owner",
  administrator = "administrator",
  moderator = "moderator",
  everyone = "everyone"
}

export enum GuildChannelTypes {
  default = "default",
  mod_logs = "mod_logs"
}

export const guildConfigFileName = "guild_config.json";
