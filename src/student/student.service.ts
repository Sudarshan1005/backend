import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async addStudent(data: { name: string;  registrationNumber: string; branch: string }): Promise<Student> {
    const newStudent = this.studentRepository.create(data);
    return this.studentRepository.save(newStudent);
  }

  
  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }
}
