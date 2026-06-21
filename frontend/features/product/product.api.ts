import { api } from "@/services/api/api";
import { CreateProductDto } from "./product.types";

export async function createProduct(data: CreateProductDto) {
  const response = await api.post("/products", data);

  return response.data;
}
