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
  async updateStudent(id: number, data: { name?: string; registrationNumber?: string; branch?: string }): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { id } }); // Specify the id as part of the options object
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    if (data.name) student.name = data.name;
    if (data.registrationNumber) student.registrationNumber = data.registrationNumber;
    if (data.branch) student.branch = data.branch;
    return this.studentRepository.save(student);
  }
  

  async deleteStudent(id: number): Promise<void> {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    await this.studentRepository.remove(student);
  }
}
