import { IsNumber, IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddRoleMarketDto {
  @ApiProperty({example:1, description:"Market Id"})
  @IsNumber()
  readonly marketId:number;

  @ApiProperty({example:'MARKET', description:"Added role"})
  @IsString()
  @IsNotEmpty()
  readonly value:string;
}