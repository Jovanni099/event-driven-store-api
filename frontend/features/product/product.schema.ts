import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Минимум 3 символа"),

  slug: z.string().min(3),

  description: z.string().optional(),

  imageUrl: z.string().url("Введите корректный URL").optional(),

  price: z.number().min(1, "Цена должна быть больше 0"),

  stock: z.number().min(0),

  sku: z.string().optional(),

  status: z.enum(["DRAFT", "ACTIVE", "OUT_OF_STOCK", "ARCHIVED"]),
});

export type ProductFormData = z.infer<typeof productSchema>;
