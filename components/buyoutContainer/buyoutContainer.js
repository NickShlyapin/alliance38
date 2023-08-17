import React from "react";
import styles from "./buyoutContainer.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ServicesHeader from "../servicesHeader/ServicesHeader";

function BuyoutContainer({ buyoutDescriptions }) {
  return (
    <section className={styles.buyoutContainer}>
      <div className={styles.wrapper}>
        <ServicesHeader />
        {buyoutDescriptions.map((buyoutDescription) => (
          <ReactMarkdown children={buyoutDescription.attributes.description} />
        ))}
      </div>
    </section>
  );
}

export default BuyoutContainer;
