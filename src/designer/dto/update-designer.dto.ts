import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class UpdateDesignerDto {
  @ApiProperty({example:"somedesigner", description:"Designer name"})
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({example:1, description:"Country Id"})
  @IsNumber()
  companyId?: number;

  @ApiProperty({example:'someslink', description:"Designer official link"})
  @IsUrl()
  official_link?: string;

  @ApiProperty({example:'somestext', description:"Designer description"})
  @IsString()
  description?: string;
}
