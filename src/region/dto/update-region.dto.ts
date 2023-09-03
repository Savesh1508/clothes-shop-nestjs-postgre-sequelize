import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class UpdateRegionDto {
  @ApiProperty({example:"someregion", description:"Region name"})
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({example:1, description:"Country Id"})
  @IsNumber()
  countryId?: number;
}
