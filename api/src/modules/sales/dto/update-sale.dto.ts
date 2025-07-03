import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleDto } from './create-sale.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {
  @ApiPropertyOptional({ example: 'Produto X', description: 'Nome do produto vendido' })
  product?: string;

  @ApiPropertyOptional({ example: 100.5, description: 'Valor da venda' })
  value?: number;

  @ApiPropertyOptional({ example: 1, description: 'ID do usuário responsável' })
  userId?: number;
} 