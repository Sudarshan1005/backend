import { Module } from "@nestjs/common";
import ormconfig from './configuration';
import { TypeOrmModule } from "@nestjs/typeorm";
import { LibraryModule } from "./library/library.module";
import { StudentModule } from "./student/student.module";


@Module({
  imports: [ LibraryModule,StudentModule,
    TypeOrmModule.forRoot(ormconfig),
   
  ],
    
  controllers: [],
  providers: [],
})
export class AppModule {}
