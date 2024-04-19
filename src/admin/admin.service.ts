import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { Student } from 'src/student/student.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    
  ) {}

  async findByUsername(username: string): Promise<Admin | undefined> {
    return this.adminRepository.findOne({ where: { username } });
  }

  async createAdmin(adminData: { username: string; password: string }): Promise<void> {
    const existingAdmin = await this.findByUsername(adminData.username);
    if (existingAdmin) {
      throw new BadRequestException('Username already exists');
    }
    const admin = this.adminRepository.create(adminData);
    await this.adminRepository.save(admin);
  }
  
  async updateStudent(id: number, data: { name: string; registrationNumber: string; branch: string }): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    // Update student properties
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
