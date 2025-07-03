import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const sale = this.saleRepository.create(createSaleDto);
    return this.saleRepository.save(sale);
  }

  async findAll(): Promise<Sale[]> {
    return this.saleRepository.find();
  }

  async findOne(id: number): Promise<Sale> {
    const sale = await this.saleRepository.findOneBy({ id });
    if (!sale) throw new NotFoundException('Venda não encontrada');
    return sale;
  }

  async update(id: number, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    const sale = await this.findOne(id);
    Object.assign(sale, updateSaleDto);
    return this.saleRepository.save(sale);
  }

  async remove(id: number): Promise<void> {
    const sale = await this.findOne(id);
    await this.saleRepository.remove(sale);
  }
}
