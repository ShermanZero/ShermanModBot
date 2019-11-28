declare interface String {
  hideID(username?: string): string;
  normal(verbose?: boolean, message?: string): string;
  warning(verbose?: boolean, message?: string): string;
  error(verbose?: boolean, message?: string): string;
  success(verbose?: boolean, message?: string): string;
  mention(verbose?: boolean, message?: string): string;
  highlight(verbose?: boolean, message?: string): string;
  log(message?: string, verbose?: boolean): string;
  masterLog(client: any, logType?: string, message?: string): string;
  userLog(client: any, guild: any, content: any, logType?: string, message?: string): string;
}
