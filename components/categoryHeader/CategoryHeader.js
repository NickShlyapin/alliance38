import React from "react";
import Stamps from "@/components/stamps/Stamps";
import Link from "next/link";
import ArrowLeft from "@/public/assets/ArrowLeft";
import styles from "./categoryHeader.module.scss";

function CategoryHeader({ categoriesu, category }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.marketBottom}>
        <Link className={styles.arrowCont} href="/">
          <ArrowLeft />
          <p>Главная</p>
        </Link>
      </div>
      <h2 className={styles.marketTitle}>
        Автомобили {category.attributes.name} в наличии
      </h2>

      <Stamps categories={categoriesu} />
    </div>
  );
}

export default CategoryHeader;
