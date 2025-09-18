import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.enity';
import { Classes } from '../classes/classes.enity';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';


@Module({
    imports: [
        TypeOrmModule.forFeature([User, Classes]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
           useFactory: (ConfigService: ConfigService) => ({}), 
        }),

    ],
    controllers: [UserController],
    providers: [UserService],
    exports: []

})
export class UserModule{

}