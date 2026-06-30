"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createProduct } from "./product.api";

import styles from "./ProductForm.module.scss";

import { productSchema, ProductFormData } from "./product.schema";

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),

    defaultValues: {
      status: "DRAFT",
      stock: 0,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      const product = await createProduct(data);

      reset({
        status: "DRAFT",
        stock: 0,
      });

      console.log("Создан товар:", product);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Создание товара</h2>

      <div className={styles.field}>
        <label className={styles.label}>Название товара</label>
        <input
          {...register("name")}
          className={styles.input}
          type="text"
          placeholder="Night Lamp"
        />
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Slug</label>
        <input
          {...register("slug")}
          className={styles.input}
          type="text"
          placeholder="night-lamp"
        />
        {errors.slug && (
          <span className={styles.error}>{errors.slug.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Описание</label>
        <textarea
          {...register("description")}
          className={styles.textarea}
          rows={5}
          placeholder="Описание товара..."
        />
        {errors.description && (
          <span className={styles.error}>{errors.description.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>URL изображения</label>
        <input
          {...register("imageUrl")}
          className={styles.input}
          type="url"
          placeholder="https://..."
        />
        {errors.imageUrl && (
          <span className={styles.error}>{errors.imageUrl.message}</span>
        )}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Цена</label>
          <input
            {...register("price", { valueAsNumber: true })}
            className={styles.input}
            type="number"
            placeholder="50000"
          />
          {errors.price && (
            <span className={styles.error}>{errors.price.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Количество</label>

          <input
            {...register("stock", { valueAsNumber: true })}
            className={styles.input}
            type="number"
            placeholder="100"
          />

          {errors.stock && (
            <span className={styles.error}>{errors.stock.message}</span>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>SKU</label>
        <input
          {...register("sku")}
          className={styles.input}
          type="text"
          placeholder="LAMP-001"
        />
        {errors.sku && (
          <span className={styles.error}>{errors.sku.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Статус</label>

        <select className={styles.select} {...register("status")}>
          <option value="DRAFT">Черновик</option>
          <option value="ACTIVE">Активный</option>
          <option value="OUT_OF_STOCK">Нет в наличии</option>
          <option value="ARCHIVED">Архив</option>
        </select>
        {errors.status && (
          <span className={styles.error}>{errors.status.message}</span>
        )}
      </div>

      <button className={styles.button} type="submit">
        Создать товар
      </button>
    </form>
  );
}
