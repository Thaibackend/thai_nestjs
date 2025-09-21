import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateClassesDto {
  @IsString()
  @IsNotEmpty()
  className: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  numberStudent: number;

  @IsInt()
  @IsNotEmpty()
  teacherCreatedId: number;
}

export class UpdateClassesDto {
  @IsString()
  @IsOptional()
  className?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  numberStudent?: number;
}
