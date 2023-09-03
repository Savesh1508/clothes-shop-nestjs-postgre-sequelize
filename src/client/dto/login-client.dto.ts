import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class LoginClientDto {
  @ApiProperty({
    example: 'email1@mail.uz',
    description: 'Client email'
  })
  @IsEmail()
  email:string;

  @ApiProperty({
    example: 'Uzbek1$t0n',
    description: 'Client password'
  })
  @IsNotEmpty()
  @IsString()
  password:string;
}
