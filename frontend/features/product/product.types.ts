export type ProductStatus = "DRAFT" | "ACTIVE";

export interface CreateProductDto {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  price: number;
  stock: number;
  sku: string;
  status: ProductStatus;
}
