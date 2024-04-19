// import { Controller, Post, Body } from '@nestjs/common';
// import { LibraryService } from './library.service';

// @Controller('library')
// export class LibraryController {
//   constructor(private readonly libraryService: LibraryService) {}

//   @Post('check-in')
//   async checkIn(@Body() data: { registrationNumber: string }): Promise<string> {
//     try {
     
//       const result = await this.libraryService.recordEntry(data.registrationNumber);
      
//       return `Successfully checked in for registration number: ${result.student.registrationNumber}`;
//     } catch (error) {
//       return `Error: ${error.message}`;
//     }
//   }
  

//   @Post('check-out')
//   async checkOut(@Body() data: { registrationNumber: string }): Promise<string> {
//     try {
//       const result = await this.libraryService.recordExit(data.registrationNumber);
//       // return `Successfully checked out for registration number: ${result.registrationNumber}`;
//     } catch (error) {
//       return `Error: ${error.message}`;
//     }
//   }
// }
import { Controller, Post, Body, Param, Delete, Put, Get } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryRecord } from './library.entity';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post('check-in-out')
  async checkInOut(@Body() data: { registrationNumber: string }): Promise<string> {
    try {
      const result = await this.libraryService.recordEntryExit(data.registrationNumber);
      return result;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }

  @Get(':id')
  async getLibraryRecord(@Param('id') id: number): Promise<LibraryRecord> {
    return this.libraryService.getLibraryRecordById(id);
  }

  @Put(':id')
  async updateLibraryRecord(@Param('id') id: number, @Body() data: Partial<LibraryRecord>): Promise<LibraryRecord> {
    return this.libraryService.updateLibraryRecord(id, data);
  }

  @Delete(':id')
  async deleteLibraryRecord(@Param('id') id: number): Promise<void> {
    return this.libraryService.deleteLibraryRecord(id);
  }
}