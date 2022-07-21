import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Checks API health' })
  getHealth(): string {
    return 'Pokemon api is up and running';
  }
}
