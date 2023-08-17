import React from "react";
import styles from "./market.module.scss";
import Card from "../card/Card";

function Market({ cars }) {
  return (
    <section className={styles.market}>
      <div className={styles.wrapper}>
        <div className={styles.offersList}>
          {cars.slice(0, 9).map((car) => {
            return <Card car={car} key={`${car.attributes.slug}`} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Market;
