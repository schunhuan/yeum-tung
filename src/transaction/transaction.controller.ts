import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseFilters, ParseUUIDPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags } from '@nestjs/swagger';
import { InternalExceptionFilter } from 'src/error/base.error.filter';

@ApiTags('Transaction')
@Controller('/api/transaction')
// @UseFilters(InternalExceptionFilter)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post()
  @HttpCode(200)
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get('/repay/:id')
  @HttpCode(200)
  repay(@Param('id', ParseUUIDPipe) id: string) {
    return this.transactionService.repay(id);
  }
}
