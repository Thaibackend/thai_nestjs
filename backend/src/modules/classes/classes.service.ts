import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Classes } from './classes.enity';
import { CreateClassesDto, UpdateClassesDto } from './classes.dto';
import { User } from '../users/user.enity';

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
      where: { id: dto.teacherCreatedId },
    });
    if (!teacher) {
      throw new NotFoundException('Giáo viên không tồn tại');
    }
    const teacherHasClass = await this.classesRepo.findOne({
      where: { teacherCreated: { id: teacher.id } },
    });
    if (teacherHasClass) {
      throw new BadRequestException('Giáo viên đã có lớp');
    }
    const existingClass = await this.classesRepo.findOne({
      where: { className: dto.className },
    });

    if (existingClass) {
      throw new BadRequestException('Lớp đã tồn tại');
    }
    const newClass = this.classesRepo.create({
      className: dto.className,
      numberStudent: dto.numberStudent,
      teacherCreated: teacher,
    });

    return this.classesRepo.save(newClass);
  }

  async updateClasses(dto: UpdateClassesDto, classId: number) {
    //Class có tồn tại không
    const cls = await this.classesRepo.findOne({
      where: { id: classId },
    });
    if (!cls) {
      throw new NotFoundException('Không tìm thấy lớp học');
    }
    //Tên lớp đã tồn tại

    if (dto.className) {
      const existedClsName = await this.classesRepo.findOne({
        where: {
          className: dto.className,
        },
      });
      if (existedClsName) throw new BadRequestException('Tên lớp đã tồn tại');
      cls.className = dto.className;
    }

    if (dto.numberStudent !== undefined) {
      cls.numberStudent = dto.numberStudent;
    }
    const updateCls = await this.classesRepo.save(cls);
    return updateCls;
  }

  async getAllClasses() {
    return await this.classesRepo.find({
      relations: ['teacherCreated'],
    });
  }

  async getClassById(classId: number) {
    const cls = await this.classesRepo.findOne({
      where: { id: classId },
      relations: ['teacherCreated'],
    });
    if (!cls) throw new NotFoundException('Không tìm thấy lớp học');
    return cls;
  }

  async deleteClass(classId: number) {
    const cls = await this.classesRepo.findOne({
      where: { id: classId },
    });
    if (!cls) throw new NotFoundException('Không tìm thấy lớp học');
    await this.classesRepo.remove(cls);
    return { message: 'Đã xóa lớp học thành công' };
  }
}
