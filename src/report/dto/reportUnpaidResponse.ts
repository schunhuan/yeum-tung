import { Injectable } from "@nestjs/common";
import { BaseResponse } from "src/response/response";

@Injectable()
export class ReportUnpaidResponse extends BaseResponse {
    result: UnpaidResponse
}

export class UnpaidResponse {
    name: string
    unpaidlist: Unpaid[]
}

export class Unpaid {
    creditor: string
    amount: number
}




