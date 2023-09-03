import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateClientDto {
  @ApiProperty({example:"someClient", description:"Client name"})
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({example:"someemail@gmail.com", description:"Client email"})
  @IsEmail()
  email?:string;

  @ApiProperty({ example: "Pa$sword12", description: "Client password" })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password?: string;

  @ApiProperty({ example: "confirm password", description: "Client password" })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  confirm_password?: string;

  @ApiProperty({example:"+998900000000", description:"Client phone"})
  @IsString()
  phone?:string;

  @ApiProperty({example:1, description:"Client location"})
  @IsNumber()
  locationId?:number;

  @ApiProperty({example:false, description:"Client activation"})
  @IsBoolean()
  is_active?:boolean;
}