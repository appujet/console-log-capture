import fs from 'fs';
import { Options } from './types';

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
      fs.appendFileSync(this.location + this.fileName, logText + '\n');
    }
  }
  private createLogFile(): void {
    if (!fs.existsSync(this.location + this.fileName)) {
      fs.writeFile(this.location + this.fileName, '', (err: any) => {
        if (err) throw err;
      });
    }
  }

  private getLogsFromFile(): string[] {
    const data = fs.readFileSync(this.location + this.fileName, 'utf8');
    return data.split('\n');
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
  public getCapturedLogs(length?: number): string {
    if (length) {
      return this.getLogsFromFile().slice(0, length).join('\n');
    }
    return this.getLogsFromFile().join('\n');
  }
  /**
   * @returns The cleared logs as an array of strings.
   */
  public clear(deleteFile: boolean = false): void {
    if (deleteFile) {
      this.deleteLogFile();
    } else {
      this.createLogFile();
    }
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

