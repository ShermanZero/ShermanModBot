import { GuildConfigType } from "../@interfaces/@guild_config";

export default class GuildConfig implements GuildConfigType {
  setup: false;

  roles = {
    owner: null as string,
    moderator: null as string
  };

  channels = {
    default: null as string,
    mod_logs: null as string
  };
}
