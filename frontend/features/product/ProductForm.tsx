'use client';

import styles from './ProductForm.module.scss';

export default function ProductForm() {
  return (
    <form className={styles.form}>
      <h2>Создание товара</h2>

      <input placeholder="Название товара" />

      <input placeholder="Slug" />

      <textarea placeholder="Описание" />

      <input placeholder="URL изображения" />

      <input type="number" placeholder="Цена" />

      <input type="number" placeholder="Количество" />

      <input placeholder="SKU" />

      <select>
        <option value="DRAFT">Черновик</option>
        <option value="ACTIVE">Активен</option>
        <option value="OUT_OF_STOCK">Нет в наличии</option>
        <option value="ARCHIVED">Архив</option>
      </select>

      <button type="submit">
        Создать товар
      </button>
    </form>
  );
}