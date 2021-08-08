import type { IResult, IGlobal } from './typescript/interfaces';
declare class ResultResponse {
    private result;
    private global;
    time: number | null;
    constructor(result: Array<IResult>, global: IGlobal, output: string);
    get medium(): number;
    toJSON(): string;
    toFileJSON(output: string): Promise<void>;
}
export { ResultResponse };
