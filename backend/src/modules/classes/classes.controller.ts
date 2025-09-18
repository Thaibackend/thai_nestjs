import { Controller, Post, Body } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassesDto } from './classes.dto';

@Controller('classes')
export class ClassesController {
    constructor(private readonly classesService: ClassesService){}

    @Post('createClass')
    async createClass(@Body() createClassesDto: CreateClassesDto) {
        return this.classesService.createClasses(createClassesDto);
    }
}
