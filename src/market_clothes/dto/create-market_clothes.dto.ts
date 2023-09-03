import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber, IsUrl, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMarketClothesDto {
  @ApiProperty({example:1, description:"Market Id"})
  @IsNumber()
  marketId: number;

  @ApiProperty({example:1, description:"Clothes Id"})
  @IsNumber()
  clothesId: number;

  @ApiProperty({example:1234.56, description:"Clothes price"})
  @IsNumber()
  clothes_price: number;

  @ApiProperty({example:'sometext', description:"Clothes description"})
  @IsString()
  description: string;
}
