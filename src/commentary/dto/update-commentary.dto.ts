import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber, IsUrl, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Score } from "./create-commentary.dto";

export class UpdateCommentaryDto {
  @ApiProperty({example:1, description:"Client Id"})
  @IsNumber()
  clientId?: number;

  @ApiProperty({example:1, description:"Market Id"})
  @IsNumber()
  marketId?: number;

  @ApiProperty({example:'sometext', description:"Commentary to market"})
  @IsString()
  @IsNotEmpty()
  commentary?: string;

  @ApiProperty({example:'good', description:"Score to market"})
  @IsEnum(Score, { message: 'Invalid score'})
  score?: Score
}
