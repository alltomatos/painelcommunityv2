import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: 'João Silva', description: 'Nome do usuário' })
  name?: string;

  @ApiPropertyOptional({ example: 'joao@email.com', description: 'Email do usuário' })
  email?: string;

  @ApiPropertyOptional({ example: 'senha123', description: 'Senha do usuário' })
  password?: string;
} 