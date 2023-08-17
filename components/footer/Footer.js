"use client";
import React, { useState, useEffect } from "react";
import styles from "./footer.module.scss";

import Elementum_logo from "./elementum_logo";
import Link from "next/link";
import Politic from "../politic/Politic";
import politicStyles from "../politic/politic.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FooterLogo from "@/public/assets/FooterLogo";

function Footer() {
  const [openPolitic, setOpenPolitic] = useState(false);
  const handleOpenPolitic = () => setOpenPolitic(true);
  const handleClosePolitic = () => setOpenPolitic(false);

  const stylePolitic = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -20%)",
    overflowY: "scroll",
    height: "70%",
    display: "block",
    width: "30%",
    bgcolor: "background.paper",
    border: "0px",
    boxShadow: 24,
    p: 3,
    textAlign: "left",
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div>
          <p>г. Иркутск, Ширямова 13/5</p>
          <a href="tel:+7(395)265-99-88">+7 3952 659-988</a>
          <p>&#xa9; АльянсАвто 2023</p>
          <div>
            <p>
              Разработка сайта –{" "}
              <Link target="_blank" href="https://elementum.digital/">
                <Elementum_logo />
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.nav}>
          <div className={styles.siteInfo}>
            <p>
              <Link href="/">Главная</Link>
            </p>
            <p>
              <Link href="/allCars">Купить</Link>
            </p>
            <p>
              <Link href="/buyout">Выкуп</Link>
            </p>
            <p>
              <Link href="/comission">Комиссия</Link>
            </p>
          </div>
          <div className={styles.siteInfo}>
            <p>
              <Link href="/trade">Трейд-ин</Link>
            </p>
            <p>
              <Link href="/order">Заказать</Link>
            </p>
            <p>
              <Link href="/contactInfo">Контакты</Link>
            </p>
            <p onClick={handleOpenPolitic}>Политика конфиденциальности</p>

            <Modal
              open={openPolitic}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              onClose={handleClosePolitic}
              className={politicStyles.politic}
            >
              <Box sx={stylePolitic} className={politicStyles.box}>
                <Politic />
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
