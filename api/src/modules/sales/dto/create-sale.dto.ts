import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleDto {
  @ApiProperty({ example: 'Produto X', description: 'Nome do produto vendido' })
  @IsString()
  @IsNotEmpty()
  product: string;

  @ApiProperty({ example: 100.5, description: 'Valor da venda' })
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({ example: 1, description: 'ID do usuário responsável' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 'plugin-teste', description: 'Slug do plugin vendido' })
  @IsString()
  @IsNotEmpty()
  plugin: string;

  @ApiProperty({ example: 'comprador@crm.com', description: 'Email do comprador' })
  @IsString()
  @IsNotEmpty()
  buyer: string;

  @ApiProperty({ example: 'pago', description: 'Status da venda' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: '2025-07-03', description: 'Data da venda' })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: 'token123', description: 'Token da venda' })
  @IsString()
  @IsNotEmpty()
  token: string;
} 