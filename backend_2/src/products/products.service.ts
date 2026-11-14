import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db.js';
import { CreateProductDto } from './dto/create-product.dto.js';

@Injectable()
export class ProductsService {
  async createProduct(dto: CreateProductDto) {
    return db.orm.public.Product.create({
      name: dto.name,
      slug: dto.slug,
      description: dto.description,
      imageUrl: dto.imageUrl,
      sku: dto.sku,
      price: dto.price,
      stock: dto.stock,
      status: dto.status ?? 'DRAFT',
    });
  }
}
