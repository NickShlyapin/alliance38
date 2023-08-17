import React, { useState, useEffect } from "react";
import styles from "./stamps.module.scss";
import Image from "next/image";
import StampItem from "../stampItem/StampItem";
import ArrowDownCircle from "@/public/assets/ArrowDownCircle";

function Stamps({ categories }) {
  const [click, setClick] = useState(false);

  let sliceNum = 6;

  if (click === true) {
    sliceNum = 200;
  }
  return (
    <div className={styles.stampsWrapper}>
      {categories.slice(0, sliceNum).map((category) => {
        if (category.attributes.cars.data.length > 0) {
          return <StampItem category={category} />;
        }
      })}
      <div
        onClick={() => {
          setClick(true);
        }}
      >
        <ArrowDownCircle />
        <p className={styles.stampsItemName}>Все марки</p>
      </div>
    </div>
  );
}

export default Stamps;
