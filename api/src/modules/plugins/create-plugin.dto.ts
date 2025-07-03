import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePluginDto {
  @ApiProperty({ example: 'plugin-exemplo', description: 'Slug único do plugin' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: 'Plugin Exemplo', description: 'Nome do plugin' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '1.0.0', description: 'Versão do plugin' })
  @IsString()
  @IsNotEmpty()
  version: string;

  @ApiProperty({ example: 'Descrição detalhada do plugin', description: 'Descrição do plugin' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Autor Exemplo', description: 'Autor do plugin' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiPropertyOptional({ example: 'active', description: 'Status do plugin' })
  @IsString()
  @IsOptional()
  status?: string;
} 