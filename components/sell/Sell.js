"use client";
import React, { useEffect, useRef } from "react";
import styles from "./sell.module.scss";
import Link from "next/link";
import Image from "next/image";
import ArrowRight from "@/public/assets/ArrowRight";

function Sell({ buyoutDescriptions }) {
  const videoRef = useRef(undefined);
  useEffect(() => {
    videoRef.current.defaultMuted = true;
  });
  return (
    <section className={styles.sell}>
      <div className={styles.wrapper}>
        <Link href="/buyout" className={styles.sellCont}>
          <div className={styles.info}>
            <h2>Выкуп</h2>
            <div className={styles.arrowCont}>
              <p>Подробнее</p>
              <ArrowRight />
            </div>
          </div>
        </Link>
        <Link href="comission" className={styles.sellCont}>
          <div className={styles.info}>
            <h2>Комиссионная продажа</h2>
            <div className={styles.arrowCont}>
              <p>Подробнее</p>
              <ArrowRight />
            </div>
          </div>
        </Link>
        <Link href="trade" className={styles.sellCont}>
          <div className={styles.info}>
            <h2>Трейд-ин</h2>
            <div className={styles.arrowCont}>
              <p>Подробнее</p>
              <ArrowRight />
            </div>
          </div>
        </Link>
      </div>

      <video
        ref={videoRef}
        loop
        autoPlay
        muted
        playsInline
        className={styles.video}
      >
        <source src="/videos/STG_flash2.mp4" type="video/mp4" />
      </video>
    </section>
  );
}

export default Sell;
