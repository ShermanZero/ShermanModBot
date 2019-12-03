import { GuildConfigType } from '../@interfaces/@guild_config';

export default class GuildConfig implements GuildConfigType {
  setup: boolean = false;
  members: Array<string> = [];

  roles = {
    guildowner: null as string,
    administrator: null as string,
    moderator: null as string
  };

  channels = {
    default: null as string,
    mod_logs: null as string,
    server_rules: null as string,
    server_info: null as string
  };

  role_names = {
    guildowner: null as string,
    administrator: null as string,
    moderator: null as string
  };

  message_formats = {
    welcome: null as string,
    goodbye: null as string,
    moderation: null as string
  };
}
