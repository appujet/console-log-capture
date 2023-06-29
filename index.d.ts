declare class ConsoleLogCapture {
    private logs: string[];
    private originalLog: (...data: any[]) => void;
    constructor();
    public restore(): void;
    public getCapturedLogs(length?: number): string;
    public getCapturedLogsAsArray(): string[];
    public getCapturedLogsAsArraySlice(start: number, end: number): string[];
    public clear(): void;
    public get length(): number;
    public get last(): string;
    public get first(): string;
}
export default ConsoleLogCapture;

export interface Options {
    fileName?: string;
    location?: string;
}