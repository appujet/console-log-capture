import fs from 'fs';
import type { Options } from './index.d';

export default class ConsoleLogCapture {
  private fileName = '.console.log';
  private location = './';
  private originalLog!: (...data: any[]) => void;
  constructor(options?: Options) {
    this.createLogFile();
    if (options) {
      if (options.fileName) {
        this.fileName = options.fileName;
        this.createLogFile();
      }
      if (options.location) {
        this.location = options.location;
        this.createLogFile();
      }
    }
  }
  /**
   * @param fileName - The name of the file to save the logs to. Defaults to `.console.log`.
   * Starts capturing logs.
   * 
   */
  public start(): void {
    this.originalLog = console.log;
    console.log = (...args: any[]): void => {
      const logText = args.map(arg => String(arg)).join(' ');
      this.writeLogToFile(logText);
      this.originalLog.apply(console, args);
    };
  }
  private writeLogToFile(logText: string): void {
    if (!fs.existsSync(this.location + this.fileName)) {
      this.createLogFile();
    } else {
      const timeFormat = new Date();
      const time = timeFormat.getFullYear() + '-' + (timeFormat.getMonth() + 1) + '-' + timeFormat.getDate() + '-' + timeFormat.getHours() + ':' + timeFormat.getMinutes();

      fs.appendFileSync(this.location + this.fileName, time + ' ' + logText + '\n');
    }
  }
  private readLogFile(): string[] {
    if (!fs.existsSync(this.location + this.fileName)) {
      this.createLogFile();
      return [];
    }
    const data = fs.readFileSync(this.location + this.fileName, 'utf8');
    return data.split('\n');
  }
  private createLogFile(): void {
    if (!fs.existsSync(this.location + this.fileName)) {
      fs.writeFile(this.location + this.fileName, '', (err: any) => {
        if (err) throw err;
      });
    } else {
      return;
    }
  }
  private getLogsFromFile(startTime?: string, endTime?: string): string[] {
    try {
      const logs = this.readLogFile();
      if (startTime && endTime) {
        return logs.filter(log => {
          const logTime = this.getLogTime(log);
          return logTime >= startTime && logTime <= endTime;
        }).map(log => log.split(' ').slice(1).join(' '));
      } else if (startTime) {
        return logs.filter(log => {
          const logTime = this.getLogTime(log);
          return logTime >= startTime;
        }).map(log => log.split(' ').slice(1).join(' '));
      } else if (endTime) {
        return logs.filter(log => {
          const logTime = this.getLogTime(log);
          return logTime <= endTime;
        }).map(log => log.split(' ').slice(1).join(' '));
      } else {
        return logs.map(log => log.split(' ').slice(1).join(' '));
      }
    } catch (error) {
      return [];
    }
  }

  private getLogTime(log: string): string {
    return log.split(' ')[0];
  }

  private deleteLogFile(): void {
    if (fs.existsSync(this.location + this.fileName)) {
      fs.unlinkSync(this.location + this.fileName);
    }
  }
  /**
   * 
   * Restores the original `console.log` function.
   * Stops capturing logs.
   * 
   */

  public stop(): void {
    console.log = this.originalLog;
  }
  /**
   * @param length - The number of lines to return. If not specified, all lines are returned.
   * @returns The captured logs as a single string, separated by newlines.
   * 
   */
  public getCapturedLogs(startTime?: string, endTime?: string): string {
    return this.getLogsFromFile(startTime, endTime).join('\n');
  }
  /**
   * @returns The cleared logs as an array of strings.
   */
  public clear(deleteFile: boolean = false): void {
    if (deleteFile) {
      this.deleteLogFile();
    }
    this.createLogFile();
  }
  /**
   * @returns The number of logs captured.
   */
  public get length(): number {
    return this.getLogsFromFile().length;
  }
  /**
   * @returns The last log captured.
   */
  public get last(): string {
    return this.getLogsFromFile()[this.length - 1];
  }
  /**
   * @returns The first log captured.
   */
  public get first(): string {
    return this.getLogsFromFile()[0];
  }
}
