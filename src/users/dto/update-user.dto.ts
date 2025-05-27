import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'User email', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Telegram username', required: false })
  @IsOptional()
  @IsString()
  tg?: string;
}
