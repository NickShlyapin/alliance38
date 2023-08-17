import React from "react";
import styles from "./comissionContainer.module.scss";
import Group from "./Group";
import Group1 from "./Group1";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Link from "next/link";
import ArrowLeft from "@/public/assets/ArrowLeft";
import ServicesHeader from "../servicesHeader/ServicesHeader";

function ComissionContainer({ comissionDescriptions }) {
  return (
    <section className={styles.comissionContainer}>
      <div className={styles.wrapper}>
        <ServicesHeader />
        {comissionDescriptions.map((comissionDescription) => (
          <ReactMarkdown
            children={comissionDescription.attributes.description}
          />
        ))}
      </div>
    </section>
  );
}

export default ComissionContainer;
