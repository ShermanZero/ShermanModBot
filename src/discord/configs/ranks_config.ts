export interface RankConfig {
  readonly levels: {
    [key: string]: string;
    readonly "0": "unranked";
    readonly "5": "bronze";
    readonly "10": "silver";
    readonly "15": "gold";
    readonly "20": "platinum";
    readonly "25": "diamond";
    readonly "30": "masters";
    readonly "35": "grandmaster";
  };

  readonly urls: {
    [key: string]: string;
    readonly bronze: "https://i.ibb.co/Bt7v30V/01-bronze.png";
    readonly silver: "https://i.ibb.co/k49yxwb/02-silver.png";
    readonly gold: "https://i.ibb.co/k5PhGLv/03-gold.png";
    readonly platinum: "https://i.ibb.co/T2PFwyt/04-plat.png";
    readonly diamond: "https://i.ibb.co/hRnvbWh/05-diamond.png";
    readonly masters: "https://i.ibb.co/zfHh6Fh/06-masters.png";
    readonly grandmaster: "https://i.ibb.co/8g04NTS/07-grandmaster.png";
  };

  readonly info: {
    [key: string]: number;
    readonly unranked: 0;
    readonly bronze: 180;
    readonly silver: 2420;
    readonly gold: 11520;
    readonly platinum: 35280;
    readonly diamond: 84500;
    readonly masters: 172980;
    readonly grandmaster: 317520;
  };
}
