// library.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryRecord } from './library.entity';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { Student } from 'src/student/student.entity';


@Module({
  imports: [TypeOrmModule.forFeature([LibraryRecord,Student])],
  controllers: [LibraryController],
  providers: [LibraryService],
})
export class LibraryModule {}
