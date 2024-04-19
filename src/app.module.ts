import { Module } from "@nestjs/common";
import ormconfig from './configuration';
import { TypeOrmModule } from "@nestjs/typeorm";
import { LibraryModule } from "./library/library.module";
import { StudentModule } from "./student/student.module";
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from "./auth/auth.module";


@Module({
  imports: [ LibraryModule,StudentModule, AdminModule,AuthModule,
    TypeOrmModule.forRoot(ormconfig),
   
   
  ],
    
  controllers: [AdminController],
  providers: [AdminService],
})
export class AppModule {}
