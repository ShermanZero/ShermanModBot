export interface GuildConfigType {
  setup: boolean;
  members: Array<MemberName>;

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

export class MemberName extends String {
  constructor() {
    super();
  }
}

export const guildConfigFileName = "guild_config.json";
