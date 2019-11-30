export interface GuildConfigType {
  setup: boolean;

  roles: {
    [key: string]: string;
    owner: string;
    moderator: string;
  };

  channels: {
    [key: string]: string;
    default: string;
    mod_logs: string;
  };
}
