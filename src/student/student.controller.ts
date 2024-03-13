import { Controller, Post, Body, Delete, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async addStudent(@Body() data: { name: string;  registrationNumber: string; branch: string }): Promise<Student> {
    return this.studentService.addStudent(data);
  }

  @Get()
  async getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }
}
