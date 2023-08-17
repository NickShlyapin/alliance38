import React from "react";
import Stamps from "@/components/stamps/Stamps";
import Link from "next/link";
import ArrowLeft from "@/public/assets/ArrowLeft";
import styles from "./servicesHeader.module.scss";

function ServicesHeader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.marketBottom}>
        <Link className={styles.arrowCont} href="/">
          <ArrowLeft />
          <p>Главная</p>
        </Link>
      </div>
    </div>
  );
}

export default ServicesHeader;
