import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class LoginMarketDto {
  @ApiProperty({
    example: 'email1@mail.uz',
    description: 'Market email'
  })
  @IsEmail()
  email:string;

  @ApiProperty({
    example: 'Uzbek1$t0n',
    description: 'Market password'
  })
  @IsNotEmpty()
  @IsString()
  password:string;
}
