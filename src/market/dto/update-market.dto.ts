import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateMarketDto {
  @ApiProperty({example:"someMarket", description:"Market name"})
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({example:"someemail@gmail.com", description:"Market email"})
  @IsEmail()
  email?:string;

  @ApiProperty({ example: "Pa$sword12", description: "Market password" })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password?: string;

  @ApiProperty({ example: "confirm password", description: "Market password" })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  confirm_password?: string;

  @ApiProperty({ example: "somelink", description: "Market photo" })
  @IsUrl()
  photo?: string;

  @ApiProperty({ example: "sometext", description: "Market description" })
  @IsString()
  description?: string;

  @ApiProperty({example:"+998900000000", description:"Market phone"})
  @IsString()
  phone?:string;

  @ApiProperty({example:1, description:"Market location"})
  @IsNumber()
  locationId?:number;

  @ApiProperty({example:false, description:"Market activation"})
  @IsBoolean()
  is_active?:boolean;
}