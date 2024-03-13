// student.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LibraryRecord } from '../library/library.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

 
  @Column()
  registrationNumber: string;
  @Column()
  branch:string;

  @OneToMany(() => LibraryRecord, (libraryRecord) => libraryRecord.student)
libraryRecords: LibraryRecord[];
}
