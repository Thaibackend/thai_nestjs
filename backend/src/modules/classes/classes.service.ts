import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Classes } from "./classes.enity";
import { CreateClassesDto } from "./classes.dto";
import { User } from "../users/user.enity";

@Injectable()
export class ClassesService {
    constructor(
        @InjectRepository(Classes)
        private readonly classesRepo: Repository<Classes>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    async createClasses(dto: CreateClassesDto) {
        const teacher = await this.userRepo.findOne({
            where: { id: dto.teacherCreatedId }
        });
        if (!teacher) {
            throw new NotFoundException();
        }
        const existingClass = await this.classesRepo.findOne({
            where: { className: dto.className }
        });

        if (existingClass) {
            throw new BadRequestException();
        }
        if (dto.numberStudents <= 0) {
            throw new BadRequestException();
        }
        const newClass = this.classesRepo.create({
            className: dto.className,
            numberStudent: dto.numberStudents,
            teacherCreated: teacher
        });

        return this.classesRepo.save(newClass);
    }
}
