import { IsNumber, IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddRoleClientDto {
  @ApiProperty({example:1, description:"Client Id"})
  @IsNumber()
  readonly clientId:number;

  @ApiProperty({example:'ADMIN', description:"Added role"})
  @IsString()
  @IsNotEmpty()
  readonly value:string;
}