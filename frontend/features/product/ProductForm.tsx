'use client';

import styles from './ProductForm.module.scss';

export default function ProductForm() {
  return (
    <div className={styles.form}>
      <h2 className={styles.title}>Создание товара</h2>

      <input
        className={styles.input}
        placeholder="Название товара"
      />

      <input
        className={styles.input}
        placeholder="Slug"
      />

      <input
        className={styles.input}
        placeholder="Цена"
      />

      <button className={styles.button}>
        Создать товар
      </button>
    </div>
  );
}