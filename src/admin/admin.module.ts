// // admin.module.ts
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AdminController } from './admin.controller';
// import { AdminService } from './admin.service';
// import { Admin } from './admin.entity';
// import { StudentModule } from 'src/student/student.module';
// import { StudentService } from 'src/student/student.service';

// @Module({
//   imports: [StudentModule, TypeOrmModule.forFeature([Admin]),],
//   controllers: [AdminController],
//   providers: [AdminService,StudentService],
//   exports: [TypeOrmModule.forFeature([Admin]),StudentService],
// })
// export class AdminModule {}
// admin.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import { StudentModule } from '../student/student.module'; 
import { StudentService } from '../student/student.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), StudentModule], 
  controllers: [AdminController],
  providers: [AdminService, StudentService,AuthService], 
  exports: [TypeOrmModule.forFeature([Admin]), StudentService,AuthService], 
})
export class AdminModule {}