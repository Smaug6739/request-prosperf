export interface IRequestOptions {
    requests: number;
    maxRequestTimeout: number;
    output: string;
    cooldown: number;
    throwOnError: boolean;
    method: string;
    body: any;
}
export interface IResult {
    statusCode: number;
    statusText: string;
    ping: number;
}
export interface IGlobal {
    start: number;
    end: number;
    totalRequests: number;
    fails: number;
}
