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

  return (
    <form className={styles.form}>
      <h2 className={styles.title}>Создание товара</h2>

      <div className={styles.field}>
        <label className={styles.label}>Название товара</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Night Lamp"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Slug</label>
        <input
          className={styles.input}
          type="text"
          placeholder="night-lamp"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Описание</label>
        <textarea
          className={styles.textarea}
          rows={5}
          placeholder="Описание товара..."
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>URL изображения</label>
        <input
          className={styles.input}
          type="url"
          placeholder="https://..."
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Цена</label>
          <input
            className={styles.input}
            type="number"
            placeholder="50000"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Количество</label>
          <input
            className={styles.input}
            type="number"
            placeholder="10"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>SKU</label>
        <input
          className={styles.input}
          type="text"
          placeholder="LAMP-001"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Статус</label>

        <select className={styles.select}>
          <option value="DRAFT">Черновик</option>
          <option value="ACTIVE">Активный</option>
          <option value="OUT_OF_STOCK">Нет в наличии</option>
          <option value="ARCHIVED">Архив</option>
        </select>
      </div>

      <button
        className={styles.button}
        type="submit"
      >
        Создать товар
      </button>
    </form>
  );
}