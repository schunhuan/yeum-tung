export class BaseResponse {
    constructor(
        partial?: Partial<BaseResponse>
    ) {
        Object.assign(this, partial)
    }
    message: string;
    status: number;
}