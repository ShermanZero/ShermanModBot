export interface MemberConfigType {
  memberLog: Array<string>;

  hidden: {
    [key: string]: string;
    username: string | null;
    guildname: string | null;
  };

  rank: {
    [key: string]: string | number;
    name: string;
    level: number;
    xp: number;
    levelup: number;
  };

  misc: {
    [key: string]: string | number;
    joined: string | null;
    first_message: string | null;
    warnings: number;
  };

  race: {
    [key: string]: number;
    wins: number;
  };
}
