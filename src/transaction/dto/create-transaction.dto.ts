import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreateTransactionDto {
    @ApiProperty({ example: "NameA", description: "name" })
    @IsNotEmpty()
    name: string;
    @ApiProperty({ example: "NameB", description: "borrow from" })
    @IsNotEmpty()
    from: string;
    @ApiProperty({ example: 0.50 })
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseFloat(value))
    amount: number;
    @ApiProperty({ example: false })
    @IsBoolean()
    @IsNotEmpty()
    isRepay: string;
}

