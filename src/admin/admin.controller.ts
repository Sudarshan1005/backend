import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, BadRequestException } from '@nestjs/common';
import { StudentService } from '../student/student.service';
import { Student } from '../student/student.entity';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcrypt';
import { AdminGuard } from './admin.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('admin')
@UseGuards(AdminGuard) // Protect all routes in this controller with AdminGuard
export class AdminController {
  constructor(
    private readonly studentService: StudentService,
    private readonly adminService: AdminService,
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async register(@Body() adminData: { username: string; password: string }): Promise<{ message: string }> {
    // Check if username is already taken
    const existingAdmin = await this.adminService.findByUsername(adminData.username);
    if (existingAdmin) {
      throw new BadRequestException('Username already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Create the admin
    await this.adminService.createAdmin({ ...adminData, password: hashedPassword });

    return { message: 'Admin registered successfully' };
  }

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }): Promise<{ token: string }> {
    const admin = await this.adminService.findByUsername(credentials.username);
    if (!admin) {
      throw new BadRequestException('Invalid username or password');
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(credentials.password, admin.password);
    if (!passwordMatch) {
      throw new BadRequestException('Invalid username or password');
    }

    // Generate token (You may use JWT or any other token-based authentication mechanism)
    const token = await this.authService.generateToken(admin);

    return { token };
  }

  @Post('students')
  async createStudent(@Body() studentData: { name: string; registrationNumber: string; branch: string }): Promise<Student> {
    return this.studentService.addStudent(studentData);
  }

  @Get('students')
  async getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Put('students/:id')
  async updateStudent(@Param('id') id: string, @Body() studentData: { name: string; registrationNumber: string; branch: string }): Promise<Student> {
    return this.studentService.updateStudent(+id, studentData);
  }

  @Delete('students/:id')
  async deleteStudent(@Param('id') id: string): Promise<void> {
    return this.studentService.deleteStudent(+id);
  }
}
