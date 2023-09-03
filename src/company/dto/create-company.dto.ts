import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateCompanyDto {
  @ApiProperty({example:"somecompany", description:"Company name"})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({example:1, description:"Country Id"})
  @IsNumber()
  countryId: number;

  @ApiProperty({example:'someslink', description:"Company official link"})
  @IsUrl()
  official_link: string;

  @ApiProperty({example:'somestext', description:"Company description"})
  @IsString()
  description: string;
}
