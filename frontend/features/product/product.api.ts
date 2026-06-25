import { api } from "@/services/api/api";
// import { ProductFormData } from "./product.schema";
import { CreateProductDto } from "./product.types";

export async function createProduct(data: CreateProductDto) {
  const response = await api.post("/products", data);

  return response.data;
}
