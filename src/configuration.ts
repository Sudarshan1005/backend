import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { Library1710151921449 } from './migration/1710151921449-library';
import { Student1710151950555 } from './migration/1710151950555-student';
import { LibraryRecord } from './library/library.entity';
import { Student } from './student/student.entity';
import { Admin1713333320626 } from './migration/1713333320626-admin';
import { Admin } from './admin/admin.entity';

config();

const configService = new ConfigService();



const configuration: DataSourceOptions = {
  "type": "mysql",
  "host": configService.get('MYSQL_HOST'),
  "port": configService.get('MYSQL_PORT'),
  "username":configService.get('MYSQL_USER'),
  "password": configService.get('MYSQL_PASSWORD'),
  "database":configService.get('MYSQL_DB'),
  "entities": [LibraryRecord,Student,Admin
  ],
  "migrations": [Library1710151921449,Student1710151950555,Admin1713333320626],
  "synchronize": false,
  "migrationsRun": true,
    //  logging: false
};

export default configuration;