import React, { useState, useEffect, useMemo } from "react";
import styles from "./stampItem.module.scss";
import StrapiImage from "../image";
import Link from "next/link";

function StampItem({ category }) {
  return (
    <>
      <Link
        className={styles.stampsItem}
        href={`/category/${category.attributes.slug}`}
        key={category.id}
      >
        <div className={styles.stampsItemImgCont}>
          <StrapiImage
            image={category.attributes.logo}
            className={styles.cardImg}
            fill
          />
        </div>
        <h6 className={styles.stampsItemName}>{category.attributes.name}</h6>
        <span className={styles.stampsItemAmount}>
          {category.attributes.cars.data.length}
        </span>
      </Link>
    </>
  );
}

export default StampItem;
