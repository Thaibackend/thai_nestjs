import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { Classes } from './classes.enity';
import { User } from '../users/user.enity';

@Module({
  imports: [TypeOrmModule.forFeature([Classes, User])],
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [ClassesService],
})
export class ClassesModule {}
