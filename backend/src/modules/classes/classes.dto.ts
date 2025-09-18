import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateClassesDto{
    @IsString()
    @IsNotEmpty()
    className: string;

    @IsNumber()
    @IsNotEmpty()
    numberStudents: number;

    @IsInt()
    @IsNotEmpty()
    teacherCreatedId: number;
}