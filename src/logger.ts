const LEVEL_LENGTH = 5;
const PREFIX_LENGTH = 6;

enum LogLevel {
  Debug = "DEBUG",
  Info = "INFO",
  Warn = "WARN",
  Error = "ERROR"
}

export class Logger {
  private prefix: string;

  constructor(prefix: string) {
    this.prefix = this.formatStr(prefix, PREFIX_LENGTH);
  }

  public debug(...data: any[]) {
    this.log(LogLevel.Debug, ...data);
  }

  public info(...data: any[]) {
    this.log(LogLevel.Info, ...data);
  }

  public warn(...data: any[]) {
    this.log(LogLevel.Warn, ...data);
  }

  public error(...data: any[]) {
    this.log(LogLevel.Error, ...data);
  }

  private log(level: LogLevel, ...data: any[]) {
    const levelStr = this.formatStr(level, LEVEL_LENGTH);
    console.log(levelStr, this.prefix, ...data);
  }

  private formatStr(str: string, length: number) {
    return str
      .substring(0, length)
      .padEnd(length+1, ' ')
      .toUpperCase();
  }
}
