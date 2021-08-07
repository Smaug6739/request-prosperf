export interface IRequestOptions {
	requests: number; // Number of requests to test
	maxRequestTimeout: number; // Maximum time in milliseconds
	output: string; // Json file
	cooldown: number; // Setup cooldown between requests (in ms)
	throwOnError: boolean; // Throw on error
	method: string; // HTTP method to use
	body: any; // The body of the request
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