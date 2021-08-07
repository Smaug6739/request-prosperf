import fetch from 'node-fetch';

import { ResultResponse } from './result';
import type { Response } from 'node-fetch';
import type { IRequestOptions, IResult } from './typescript/interfaces';
class RequestTerter {
	public url: string;
	public requests: number; // Number of requests to test
	maxRequestTimeout: number; // Maximum time in milliseconds
	public output: string; // Json file
	public cooldown: number; // Setup cooldown between requests (in ms)
	public throwOnError: boolean; // Throw on error
	public method: string; // HTTP method to use
	public body: any; // The body of the request
	constructor(url: string, options: IRequestOptions) {
		if (!url) throw new Error('[MISSING_PARAMETER] The url must be provided.');

		this.url = url;

		this.requests = options.requests || 100;
		this.maxRequestTimeout = options.maxRequestTimeout || 2000
		this.output = options.output || '';
		this.cooldown = options.cooldown || 0;
		this.throwOnError = options.throwOnError || false;
		this.method = options.method || 'GET';
		this.body = options.body || {};
	}
	_request(url: string, max: number) {
		const startPing: number = Date.now()
		const timeout: Promise<Error> = new Promise(((_, reject) => {
			setTimeout(() => {
				reject(new Error('timeout'))
			}, max);
		}))
		const fetchFunction: Promise<IResult> = new Promise((resolve, reject) => {
			fetch(url)
				.then((res: Response) => {
					resolve({
						statusCode: res.status,
						statusText: res.statusText,
						ping: Date.now() - startPing
					})
				})
				.catch((err: Error) => reject(err))
		})
		return Promise.race([fetchFunction, timeout])
	}
	async start() {
		const results: IResult[] = [];
		let fails: number = 0;
		const start = Date.now();
		for (let i = 0; i < this.requests; i++) {
			let error = false;
			const call = await this._request(this.url, this.maxRequestTimeout)
				.catch(() => {
					fails++
					error = true;
				})
			if (!error) results.push(call as IResult);
		}
		//const result: any = await Promise.allSettled(asyncCalls.map(a => a.execute(...a.args)))
		// .then((r) => console.log(r))
		// .catch((e) => console.log(e))
		const end = Date.now();
		return new ResultResponse(results, { start, end, totalRequests: this.requests, fails }, this.output)
	}
}

export { RequestTerter };