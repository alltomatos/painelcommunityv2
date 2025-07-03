import { PartialType } from '@nestjs/mapped-types';
import { CreatePluginDto } from './create-plugin.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePluginDto extends PartialType(CreatePluginDto) {
  @ApiPropertyOptional({ example: 'plugin-exemplo', description: 'Slug único do plugin' })
  slug?: string;

  @ApiPropertyOptional({ example: 'Plugin Exemplo', description: 'Nome do plugin' })
  name?: string;

  @ApiPropertyOptional({ example: '1.0.0', description: 'Versão do plugin' })
  version?: string;

  @ApiPropertyOptional({ example: 'Descrição detalhada do plugin', description: 'Descrição do plugin' })
  description?: string;

  @ApiPropertyOptional({ example: 'Autor Exemplo', description: 'Autor do plugin' })
  author?: string;

  @ApiPropertyOptional({ example: 'active', description: 'Status do plugin' })
  status?: string;
} 