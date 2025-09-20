import { IsInt, IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";

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

export class UpdateClassesDto{
    @IsString()
    @IsOptional()
    className?: string;

    @IsNumber()
    @IsOptional()
    numberStudent?: number;

    @IsInt()
    @IsNotEmpty()
    classId: number;
}