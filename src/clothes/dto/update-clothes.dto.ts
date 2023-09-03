import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber, IsUrl, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ClothesForWho, ClothesType } from "./create-clothes.dto";

export class UpdateClothesDto {
  @ApiProperty({example:"someclothes", description:"Clothes name"})
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({example:'skirt', description:"Clothes type"})
  @IsEnum(ClothesType, { message: 'Invalid clothes type'})
  @IsNotEmpty()
  clothes_type?: ClothesType;

  @ApiProperty({example:1, description:"Clothes made in ..."})
  @IsNumber()
  madeInId?: number;

  @ApiProperty({example:41, description:"Clothes size"})
  @IsNumber()
  size?: number;

  @ApiProperty({example:1, description:"Clothes designer Id"})
  @IsNumber()
  designerId?: number;

  @ApiProperty({example:1, description:"Clothes brand Id"})
  @IsNumber()
  brandId?: number;

  @ApiProperty({example:'man', description:"Clothes for who"})
  @IsEnum(ClothesForWho, { message: 'Invalid clothes gender type'})
  @IsNotEmpty()
  for_who?: ClothesForWho;

  @ApiProperty({example:'somephotolink', description:"Clothes photo link"})
  @IsUrl()
  photo?: string;
}
