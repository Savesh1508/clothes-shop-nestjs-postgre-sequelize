import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateBrandDto {
  @ApiProperty({example:"somebrand", description:"Brand name"})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({example:1, description:"Company Id"})
  @IsNumber()
  companyId: number;
}
