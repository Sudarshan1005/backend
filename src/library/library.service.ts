// import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { LibraryRecord } from './library.entity';
// import { Student } from '../student/student.entity';

// @Injectable()
// export class LibraryService {
//   constructor(
//     @InjectRepository(LibraryRecord)
//     private libraryRecordRepository: Repository<LibraryRecord>,
//     @InjectRepository(Student)
//     private studentRepository: Repository<Student>,
//   ) {}
  
//   async recordEntryExit(registrationNumber: string): Promise<string> {
//     const student = await this.studentRepository.findOne({
//       where: { registrationNumber },
//     });

//     if (!student) {
//       throw new NotFoundException('Student not found with the given registration number');
//     }

//     const activeCheckInRecord = await this.libraryRecordRepository.findOne({
//       where: { student: { id: student.id }, checkOutTime: null },
//     });

//     if (!activeCheckInRecord) {
//       // If there's no active check-in record, create a new check-in record
//       const libraryRecord = new LibraryRecord();
//       libraryRecord.student = student;
//       libraryRecord.studentBranch = student.branch; // Assuming Student entity has a 'branch' property
//       libraryRecord.studentName = student.name;
//       libraryRecord.registrationNumber = student.registrationNumber;
//       await this.libraryRecordRepository.save(libraryRecord);
//       return `Successfully checked in for registration number: ${student.registrationNumber}`;
//     } else {
//       // If there's an active check-in record, update it to record the check-out time
//       activeCheckInRecord.checkOutTime = new Date();
//       await this.libraryRecordRepository.save(activeCheckInRecord);
//       return `Thank you for checking out, ${student.name}! Please come again.`;
//     }
//   }
// }


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LibraryRecord } from './library.entity';
import { Student } from '../student/student.entity';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(LibraryRecord)
    private libraryRecordRepository: Repository<LibraryRecord>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async recordEntryExit(registrationNumber: string): Promise<string> {
    const student = await this.studentRepository.findOne({
      where: { registrationNumber },
    });

    if (!student) {
      throw new NotFoundException('Student not found with the given registration number');
    }

    let activeCheckInRecord = await this.libraryRecordRepository.findOne({
      where: { student: { id: student.id }, checkOutTime: null },
    });

    if (!activeCheckInRecord) {
      // If there's no active check-in record, create a new check-in record
      const libraryRecord = new LibraryRecord();
      libraryRecord.student = student;
      libraryRecord.studentBranch = student.branch; // Assuming Student entity has a 'branch' property
      libraryRecord.studentName = student.name;
      libraryRecord.registrationNumber = student.registrationNumber;
      await this.libraryRecordRepository.save(libraryRecord);
      return `Successfully checked in for registration number: ${student.registrationNumber}`;
    } else {
      // If there's an active check-in record, update it to record the check-out time
      activeCheckInRecord.checkOutTime = new Date();
      await this.libraryRecordRepository.save(activeCheckInRecord);

      // Create a new check-in record after checking out
      const newCheckInRecord = new LibraryRecord();
      newCheckInRecord.student = student;
      newCheckInRecord.studentBranch = student.branch;
      newCheckInRecord.studentName = student.name;
      newCheckInRecord.registrationNumber = student.registrationNumber;
      await this.libraryRecordRepository.save(newCheckInRecord);

      return `Thank you for checking out, ${student.name}! Please come again.`;
    }
  }
}
