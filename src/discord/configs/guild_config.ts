import { GuildConfigType } from "../@interfaces/@guild_config";

export default class GuildConfig implements GuildConfigType {
  setup: boolean = false;
  members: Array<string> = [];

  roles = {
    owner: null as string,
    administrator: null as string,
    moderator: null as string
  };

  channels = {
    default: null as string,
    mod_logs: null as string
  };
}
