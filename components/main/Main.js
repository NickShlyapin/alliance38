import React from "react";
import styles from "./main.module.scss";
import MainBG from "../../public/images/7218a1302960c48611e068302450c2a6.gif";
import Arrow from "@/public/images/Arrow";
import Image from "next/image";
import { Link } from "react-scroll";

function Main() {
  return (
    <main className={styles.main} id="main">
      <div className={styles.wrapper}>
        <h1>
          Альянс
          <mark>Авто</mark>
        </h1>
        <p>Мультибрендвый автомобильный диллер</p>
        <div className={styles.arrowCont}>
          <div className={styles.arrowContInner}>
            <Link
              to="market"
              spy={true}
              smooth={true}
              isDynamic={true}
              offset={-90}
            >
              <Arrow />
            </Link>
          </div>
        </div>
      </div>

      <Image
        src={MainBG}
        fill
        quality={100}
        className={styles.bg}
        alt="mainImg"
        priority={true}
      />
    </main>
  );
}

export default Main;
