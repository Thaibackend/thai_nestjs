import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository, UpdateDateColumn } from "typeorm";
import { Classes } from "./classes.enity";
import { CreateClassesDto, UpdateClassesDto } from "./classes.dto";
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
    async updateClasses(dto: UpdateClassesDto, classId: number){
        const cls = await this.classesRepo.findOne({
            where: {id: classId},
        });
    if (!cls){
        throw new NotFoundException('Khong tim thay lop hoc');
    }

    if(dto.className){
        const existedClsName = await this.classesRepo.findOne({
            where: {
                className: dto.className,
            },
        });
    if (existedClsName) throw new BadRequestException('Ten lop da ton tai');
    cls.className = dto.className;
    }
    if(dto.numberStudent !== undefined){
        cls.numberStudent = dto.numberStudent;
    }
    const updateCls = await this.classesRepo.save(cls);
    return updateCls;
    }
    async getClassById(classId:number){
        const cls = await this.classesRepo.findOne({
            where: {id: classId},
            relations:['teacherCreated'],
        });
        if(!cls) throw new NotFoundException('Khong tim thay lop hoc');
        return cls;
    }
    async getAllClasses(){
        return await this.classesRepo.find({
            relations: ['teacherCreated'],
        })
    }

    async deleteClass(classId: number){
        const cls = await this.classesRepo.findOne({
            where: {id: classId},
        });
        if(!cls) throw new NotFoundException('Khong tim thay lop hoc');
        return await this.classesRepo.remove(cls);
    }
}
