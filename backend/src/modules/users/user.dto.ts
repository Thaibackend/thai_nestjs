import { IsString, IsNotEmpty, IsOptional, MinLength, IsEnum } from 'class-validator';
import { RoleSystem } from 'src/enum/role';


export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: "Username is required" })  
  username: string;

  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @IsNotEmpty({ message: "Password is required" })
  password: string;

  @IsString()
  @IsOptional({ message: "Phone is optional" })
  phone: string;

  @IsString()
  @IsOptional({ message: "Address is optional" })
  address: string;

  @IsEnum(RoleSystem)
  @IsOptional()
  role?: RoleSystem;
}
