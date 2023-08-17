import React from "react";
import styles from "./marketBottom.module.scss";
import Link from "next/link";
import ArrowRight from "@/public/assets/ArrowRight";

function MarketBottom() {
  return (
    <div className={styles.marketBottom}>
      <Link className={styles.arrowCont} href="/allCars">
        <p>Весь каталог</p>
        <ArrowRight />
      </Link>
    </div>
  );
}

export default MarketBottom;
