"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestTerter = void 0;
const node_fetch_1 = require("node-fetch");
const result_1 = require("./result");
class RequestTerter {
    constructor(url, options) {
        if (!url)
            throw new Error('[MISSING_PARAMETER] The url must be provided.');
        this.url = url;
        this.requests = options.requests || 100;
        this.maxRequestTimeout = options.maxRequestTimeout || 2000;
        this.output = options.output || '';
        this.cooldown = options.cooldown || 0;
        this.throwOnError = options.throwOnError || false;
        this.method = options.method || 'GET';
        this.body = options.body || {};
    }
    _request(url, max) {
        const startPing = Date.now();
        const timeout = new Promise(((_, reject) => {
            setTimeout(() => {
                reject(new Error('timeout'));
            }, max);
        }));
        const fetchFunction = new Promise((resolve, reject) => {
            node_fetch_1.default(url)
                .then((res) => {
                resolve({
                    statusCode: res.status,
                    statusText: res.statusText,
                    ping: Date.now() - startPing
                });
            })
                .catch((err) => reject(err));
        });
        return Promise.race([fetchFunction, timeout]);
    }
    async start() {
        const results = [];
        let fails = 0;
        const start = Date.now();
        for (let i = 0; i < this.requests; i++) {
            let error = false;
            const call = await this._request(this.url, this.maxRequestTimeout)
                .catch(() => {
                fails++;
                error = true;
            });
            if (!error)
                results.push(call);
        }
        const end = Date.now();
        return new result_1.ResultResponse(results, { start, end, totalRequests: this.requests, fails }, this.output);
    }
}
exports.RequestTerter = RequestTerter;
