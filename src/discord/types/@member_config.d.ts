export interface MemberConfigType {
  memberLog: Array<string>;

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

  race: {
    wins: number;
  };
}
