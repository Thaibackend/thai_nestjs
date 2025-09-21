import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassesDto, UpdateClassesDto } from './classes.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post('create')
  async createClass(@Body() createClassesDto: CreateClassesDto) {
    return this.classesService.createClasses(createClassesDto);
  }

  @Patch('update/:id')
  async updateClass(
    @Body() dto: UpdateClassesDto,
    @Param('id') classId: number,
  ) {
    return this.classesService.updateClasses(dto, classId);
  }

  @Get()
  async getAllClasses() {
    return await this.classesService.getAllClasses();
  }

  @Get(':id')
  async getClassById(@Param('id') classId: number) {
    return await this.classesService.getClassById(classId);
  }

  @Delete(':id')
  async deleteClass(@Param('id') classId: number) {
    return await this.classesService.deleteClass(classId);
  }
}
