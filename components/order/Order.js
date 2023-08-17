import React from "react";
import styles from "./order.module.scss";

import MainBG from "../../public/images/black-porsche-wallpaper-1284x2778_228.jpg";
import Image from "next/image";
import ArrowRight from "@/public/assets/ArrowRight";
import Link from "next/link";

function Order() {
  return (
    <section className={styles.order}>
      <div className={styles.wrapper}>
        <div className={styles.orderDesc}>
          <h2>Автомобили под заказ</h2>
          <p className={styles.desk}>
            Не можете найти автомобиль, о котором мечтаете? Мы вам поможем!
            <br />
            <br />
            Автоцентр «АльянсАвто» предлагает различные варианты для тех, кто
            хочет купить автомобиль из КНР, ОАЭ, Южной Кореи, США или Канады –
            как новые, так и с пробегом.
          </p>

          <Link className={styles.arrowCont} href="order">
            <p>Подробнее</p>
            <ArrowRight />
          </Link>
        </div>
        <div className={styles.cardImgCont}>
          <Image className={styles.cardImg} src={MainBG} fill alt="bg" />
        </div>
      </div>
    </section>
  );
}

export default Order;
