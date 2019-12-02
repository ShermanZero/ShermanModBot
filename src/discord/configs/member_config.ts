import { MemberConfigType } from "../@interfaces/@member_config";

export default class MemberConfig implements MemberConfigType {
  hidden = {
    username: null as string,
    guildname: null as string
  };

  rank = {
    name: "uranked",
    level: 0,
    xp: 0,
    levelup: 1
  };

  misc = {
    joined: null as string,
    first_message: null as string,
    warnings: 0
  };

  race = {
    wins: 0
  };

  permissions = {};

  memberLog = new Array<string>();
}
