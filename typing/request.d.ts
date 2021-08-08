import { ResultResponse } from './result';
import type { IRequestOptions, IResult } from './typescript/interfaces';
declare class RequestTerter {
    url: string;
    requests: number;
    maxRequestTimeout: number;
    output: string;
    cooldown: number;
    throwOnError: boolean;
    method: string;
    body: any;
    constructor(url: string, options: IRequestOptions);
    _request(url: string, max: number): Promise<Error | IResult>;
    start(): Promise<ResultResponse>;
}
export { RequestTerter };
