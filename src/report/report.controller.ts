import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReportService } from './report.service';

@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }

  @Get('/unPaid/:name')
  unPaid(@Param('name') name: string) {
    return this.reportService.unPaid(name);
  }

}
