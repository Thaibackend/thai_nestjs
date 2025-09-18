import { Body, Post } from "@nestjs/common";
import { Controller } from '@nestjs/common';
import { privateDecrypt } from "crypto";
import { UserService } from "./user.service";
import { RegisterDto } from "./user.dto";

@Controller('users')
export class UserController {
constructor (private readonly userService: UserService){}
@Post('register')
async register(@Body()dto: RegisterDto){
    return this.userService.register(dto)
}
}