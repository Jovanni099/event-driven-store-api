'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './ProductForm.module.scss';

import {
  productSchema,
  ProductFormData,
} from './product.schema';

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),

    defaultValues: {
      status: 'DRAFT',
      stock: 0,
    },
  });

  const onSubmit = async (
    data: ProductFormData,
  ) => {
    console.log(data);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={styles.title}>
        Создание товара
      </h2>

      <input
        className={styles.input}
        placeholder="Название товара"
        {...register('name')}
      />

      {errors.name && (
        <p className={styles.error}>
          {errors.name.message}
        </p>
      )}

      <button
        type="submit"
        className={styles.button}
      >
        Создать товар
      </button>
    </form>
  );
}