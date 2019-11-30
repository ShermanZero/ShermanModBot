import { MemberConfigType } from "../@interfaces/@member_config";

export default class MemberConfig implements MemberConfigType {
  memberLog: [];

  hidden = {
    username: null as any,
    guildname: null as any
  };

  rank = {
    name: "unranked",
    level: 0,
    xp: 0,
    levelup: 1
  };

  misc = {
    joined: null as any,
    first_message: null as any,
    warnings: 0
  };

  race: { wins: 0 };
}
