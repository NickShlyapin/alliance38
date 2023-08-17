import React from "react";
import styles from "./contactInfoContainer.module.scss";
import ServicesHeader from "../servicesHeader/ServicesHeader";
import MyMap from "../mymap/mymap";

function ContactInfoContainer() {
  return (
    <section className={styles.contactInfoContainer}>
      <div className={styles.wrapper}>
        <ServicesHeader />
        <div className={styles.cartWrapper}>
          <div className={styles.cartGallery}>
            <div className={styles.cartGalleryMain}>
              <MyMap />
            </div>
          </div>
          <div className={styles.cartInfo}>
            <div className={styles.blockInfo}>
              <div className={styles.row}>
                <span className={styles.infoTitle}>Адрес</span>
                <span className={styles.info}>г. Иркутск, Ширямова 13/5</span>
              </div>
              <div className={styles.row}>
                <span className={styles.infoTitle}>Телефон</span>
                <span className={styles.info}>+7 3952 659-988</span>
              </div>
              <div className={styles.row}>
                <span className={styles.infoTitle}>Время работы</span>
                <span className={styles.info}>с 9:00 до 19:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactInfoContainer;
