"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultResponse = void 0;
const promises_1 = require("fs/promises");
class ResultResponse {
    constructor(result, global, output) {
        this.time = null;
        this.result = result;
        this.global = global;
        this.time = this.global.end - this.global.start;
        if (output)
            this.toFileJSON(output);
    }
    get medium() {
        return this.time / this.global.totalRequests;
    }
    toJSON() {
        const jsonString = JSON.stringify(this.result);
        if (jsonString)
            return jsonString;
        return null;
    }
    async toFileJSON(output) {
        console.log(this.result);
        return await promises_1.writeFile(output, this.toJSON());
    }
}
exports.ResultResponse = ResultResponse;
