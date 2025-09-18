import { Repository } from 'typeorm';
import { User } from './user.enity';
import { RegisterDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ){}

  async register(dto: RegisterDto){
    const existed = await this.userRepo.findOne({ 
        where: {
            username: dto.username,
        },        
     });
     if (existed) throw new BadRequestException('Tai Khoan da ton tai');
     const hashPassword = await bcrypt.hash(dto.password,10);
     const user = await this.userRepo.create({
        ...dto,
        password: hashPassword,
     });
     const saveUser = await this.userRepo.save(user);
     return user;
    }
}