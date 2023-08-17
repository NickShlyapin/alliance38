import React from "react";
import styles from "./allMarket.module.scss";
import Card from "../card/Card";
import ArrowLeft from "@/public/assets/ArrowLeft";
import Link from "next/link";
import Image from "next/image";
import Stamps from "../stamps/Stamps";

function AllMarket({ cars, categories }) {
  return (
    <section className={styles.market}>
      <div className={styles.wrapper}>
        <div className={styles.marketBottom}>
          <Link className={styles.arrowCont} href="/">
            <ArrowLeft />
            <p>Главная</p>
          </Link>
        </div>
        <div className={styles.marketTitle}>
          <h2>Автомобили в наличии</h2>
        </div>
        <Stamps categories={categories} />
        <div className={styles.offersList}>
          {cars.map((car) => {
            return <Card car={car} key={`${car.attributes.slug}`} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default AllMarket;
