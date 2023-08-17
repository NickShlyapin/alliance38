import React from "react";
import styles from "./orderContainer.module.scss";
import Group from "./Group";
import Group1 from "./Group1";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Link from "next/link";
import ArrowLeft from "@/public/assets/ArrowLeft";
import ServicesHeader from "../servicesHeader/ServicesHeader";

function OrderContainer({ orderDescriptions }) {
  return (
    <section className={styles.orderContainer}>
      <div className={styles.wrapper}>
        <ServicesHeader />
        {orderDescriptions.map((orderDescription) => (
          <ReactMarkdown children={orderDescription.attributes.description} />
        ))}
      </div>
    </section>
  );
}

export default OrderContainer;
