import React from "react";
import styles from "./tradeContainer.module.scss";
import Group from "./Group";
import Group1 from "./Group1";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Link from "next/link";
import ArrowLeft from "@/public/assets/ArrowLeft";
import ServicesHeader from "../servicesHeader/ServicesHeader";

function TradeContainer({ tradeDescriptions }) {
  return (
    <section className={styles.tradeContainer}>
      <div className={styles.wrapper}>
        <ServicesHeader />
        {tradeDescriptions.map((tradeDescription) => (
          <ReactMarkdown children={tradeDescription.attributes.description} />
        ))}
      </div>
    </section>
  );
}

export default TradeContainer;
