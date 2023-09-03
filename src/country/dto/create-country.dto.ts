import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCountryDto {
  @ApiProperty({example:"someCountry", description:"Country name"})
  @IsNotEmpty()
  @IsString()
  name: string;
}
