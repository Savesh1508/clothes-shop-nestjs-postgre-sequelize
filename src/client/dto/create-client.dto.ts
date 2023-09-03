import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateClientDto {
  @ApiProperty({example:"someClient", description:"Client name"})
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({example:"someemail@gmail.com", description:"Client email"})
  @IsEmail()
  email:string;

  @ApiProperty({ example: "Pa$sword12", description: "Client password" })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: "confirm password", description: "Client password" })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  @ApiProperty({example:"+998900000000", description:"Client phone"})
  @IsString()
  phone:string;

  @ApiProperty({example:1, description:"Client location"})
  @IsNumber()
  locationId:number;

  @ApiProperty({example: false, description:"Client activity"})
  @IsBoolean()
  is_active:boolean;
}
