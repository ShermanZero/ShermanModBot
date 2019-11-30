import { MemberConfigType } from "../@interfaces/@member_config";

export default class MemberConfig implements MemberConfigType {
  memberLog: string[];

  hidden: {
    [key: string]: string;
    username: string;
    guildname: string;
  };

  rank: {
    [key: string]: string | number;
    name: string;
    level: number;
    xp: number;
    levelup: number;
  };

  misc: {
    joined: string;
    first_message: string;
    warnings: number;
  };

  race: { wins: number };
}
