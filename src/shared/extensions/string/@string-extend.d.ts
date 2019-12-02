declare interface String {
  hideID(username?: string): string;
  print(verbose?: boolean, message?: string): string;
  warning(verbose?: boolean, message?: string): string;
  error(verbose?: boolean, message?: string): string;
  success(verbose?: boolean, message?: string): string;
  mention(verbose?: boolean, message?: string): string;
  highlight(verbose?: boolean, message?: string): string;
  log(message?: string, verbose?: boolean): string;
  masterLog(client: any, guild: any, logType?: string, output?: boolean, message?: string): string;
  memberLog(client: any, guild: any, memberConfig: any, logType?: string, output?: boolean, message?: string): string;
}
