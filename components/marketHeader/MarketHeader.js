import React from "react";
import Link from "next/link";
import ArrowRight from "@/public/assets/ArrowRight";
import styles from "./marketHeader.module.scss";
import Stamps from "@/components/stamps/Stamps";

function MarketHeader({ categories }) {
  return (
    <div className={styles.wrapper} id="market">
      <div className={styles.marketTitle}>
        <h2>Автомобили в наличии</h2>
      </div>
      <Stamps categories={categories} />
    </div>
  );
}

export default MarketHeader;
