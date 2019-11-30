import { GuildConfigType } from "../@interfaces/@guild_config";

export default class GuildConfig implements GuildConfigType {
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
