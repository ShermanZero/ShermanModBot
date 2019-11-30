import { MemberConfigType } from "../@interfaces/@member_config";

export default class MemberConfig implements MemberConfigType {
  memberLog: Array<string> | null;

  hidden: {
    [key: string]: string | null;
    username: string | null;
    guildname: string | null;
  };

  rank: {
    [key: string]: string | number | null;
    name: string | null;
    level: number | null;
    xp: number | null;
    levelup: number | null;
  };

  misc: {
    [key: string]: string | number;
    joined: string | null;
    first_message: string | null;
    warnings: number | null;
  };

  race: {
    [key: string]: number | null;
    wins: number | null;
  };
}
