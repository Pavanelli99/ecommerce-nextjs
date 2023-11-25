import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/database/prisma-service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    const products = await this.prisma.product.findMany({
      include: {
        category: true,
      },
    });
    // include images in product
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        const images = await this.prisma.image.findMany({
          where: { productId: product.id },
        });
        return { ...product, images };
      }),
    );

    return productsWithImages;
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  loadImages(id: number) {
    return this.prisma.image.findMany({
      where: { productId: id },
    });
  }
}
