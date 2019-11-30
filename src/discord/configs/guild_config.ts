import { GuildConfigType, MemberName } from "../@interfaces/@guild_config";

export default class GuildConfig implements GuildConfigType {
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
