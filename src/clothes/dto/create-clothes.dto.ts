import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber, IsUrl, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export enum ClothesType {
  boots = 'boots',
  coat = 'coat',
  dress = 'dress',
  jacket = 'jacket',
  jeans = 'jeans',
  shirt = 'shirt',
  shoes = 'shoes',
  skirt = 'skirt',
  suit = 'suit',
  sweater = 'sweater',
  trainers = 'trainers',
  trousers = 'trousers',
}

export enum ClothesForWho {
  man = 'man',
  woman = 'woman',
  pet = 'pet',
  unisex = 'unisex'
}

export class CreateClothesDto {
  @ApiProperty({example:"someclothes", description:"Clothes name"})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({example:'skirt', description:"Clothes type"})
  @IsEnum(ClothesType, { message: 'Invalid clothes type'})
  clothes_type: ClothesType;

  @ApiProperty({example:1, description:"Clothes made in ..."})
  @IsNumber()
  madeInId: number;

  @ApiProperty({example:41, description:"Clothes size"})
  @IsNumber()
  size: number;

  @ApiProperty({example:1, description:"Clothes designer Id"})
  @IsNumber()
  designerId: number;

  @ApiProperty({example:1, description:"Clothes brand Id"})
  @IsNumber()
  brandId: number;

  @ApiProperty({example:'man', description:"Clothes for who"})
  @IsEnum(ClothesForWho, { message: 'Invalid clothes gender type'})
  for_who: ClothesForWho;

  @ApiProperty({example:'somephotolink', description:"Clothes photo link"})
  @IsUrl()
  photo: string;
}
