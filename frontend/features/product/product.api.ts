import { api } from "@/services/api/api";
import { ProductFormData } from "./product.schema";

export async function createProduct(data: ProductFormData) {
  const response = await api.post("/products", data);

  return response.data;
}
