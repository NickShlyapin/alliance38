import React from "react";
import styles from "./card.module.scss";
import Link from "next/link";
import StrapiImage from "../image";

function Card({ car }) {
  let price = car.attributes.price;
  price = price.toLocaleString();
  return (
    <Link
      className={styles.card}
      href={`/car/${car.attributes.slug}`}
      key={car.id}
    >
      <div className={styles.cardImgCont}>
        <StrapiImage
          image={car.attributes.main_image}
          className={styles.cardImg}
          fill
        />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardName}>{car.attributes.title}</div>
        <ul className={styles.cardRow}>
          <li>{car.attributes.year} г</li>
          <li>{car.attributes.mileage} км</li>
        </ul>
        <div className={styles.cardDescription}>
          {car.attributes.engine_capacity} л, {car.attributes.fuel_type},{" "}
          {car.attributes.horsepower} л.с., {car.attributes.transmission},{" "}
          {car.attributes.wheel_drive}, {car.attributes.mileage} км,{" "}
          {car.attributes.rudder_position}
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.cardPrice}>{price} ₽</div>
          <div className={styles.cardCredits}>
            от {car.attributes.credit_price.toLocaleString()} ₽/мес
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
