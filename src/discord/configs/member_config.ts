import { MemberConfigType } from "../@utilities/@member_config";
import { Ranks } from "../@utilities/@ranks";

export default class MemberConfig implements MemberConfigType {
  hidden = {
    username: null as string,
    guildname: null as string
  };

  rank = {
    name: Ranks.levels["0"],
    rankup: 5,
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
