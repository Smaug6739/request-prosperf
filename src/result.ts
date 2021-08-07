import { writeFile } from 'fs/promises';
import type { IResult, IGlobal } from './typescript/interfaces';
class ResultResponse {

	private result: IResult[];
	private global: IGlobal;

	public time: number | null = null;

	constructor(result: Array<IResult>, global: IGlobal, output: string) {
		this.result = result;
		this.global = global;

		this.time = this.global.end - this.global.start;
		if (output) this.toFileJSON(output)
	}
	get medium() {
		return this.time! / this.global.totalRequests;
	}
	toJSON() {

		const jsonString = JSON.stringify(this.result);
		if (jsonString) return jsonString;
		return null;
	}
	async toFileJSON(output: string) {
		console.log(this.result);

		return await writeFile(output, this.toJSON()!)
	}
}

export { ResultResponse };