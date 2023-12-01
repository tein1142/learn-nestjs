import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { SubjectsModule } from './subjects/subjects.module';
import { Subject } from './subjects/entities/subject.entity';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/role.entity';
import "reflect-metadata"

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: '1234',
    username: 'postgres',
    entities: [User, Subject, Role],
    database: 'nestDB',
    synchronize: true,
    logging: true,
  }),
    UserModule,
    SubjectsModule,
    AuthModule,
    RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
