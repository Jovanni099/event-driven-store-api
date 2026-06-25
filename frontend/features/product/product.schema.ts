import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Минимум 3 символа"),

  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Только маленькие буквы, цифры и дефис"),

  description: z.string().optional(),

  imageUrl: z.string().url("Некорректный URL").optional(),

  price: z.coerce.number().min(1, "Цена должна быть больше 0"),

  stock: z.coerce.number().min(0),

  sku: z.string().optional(),

  status: z.enum(["DRAFT", "ACTIVE", "OUT_OF_STOCK", "ARCH  IVED"]),
});

export type ProductFormData = z.infer<typeof productSchema>;
