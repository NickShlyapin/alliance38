"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import styles from "./header.module.scss";
import Logo from "@/public/assets/Logo";
import LogoMobile from "@/public/assets/LogoMobile";

import Link from "next/link";

function Nav() {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
    console.log(isActive);
  };

  return (
    <div>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/">
            <LogoMobile />
          </Link>
          <div>
            <ul>
              <li>
                <Link href="/">Главная</Link>
              </li>
              <li>
                <Link href="/allCars">Купить</Link>
              </li>
              <li>
                <Link href="/buyout">Выкуп</Link>
              </li>
              <li>
                <Link href="/comission">Комиссия</Link>
              </li>
              <li>
                <Link href="/trade">Трейд-ин</Link>
              </li>
              <li>
                <Link href="/order">Заказать</Link>
              </li>
              <li>
                <Link href="/contactInfo">Контакты</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <header className={styles.mobileHeader}>
        <div className={styles.headerContainer}>
          <Link href="/">
            <LogoMobile />
          </Link>
          <div className={styles.menu}>
            <div
              className={`${styles.burgerButton} ${
                isActive ? `${styles.open}` : null
              }`}
              onClick={toggleClass}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div
              className={`${styles.menuWrapper} ${
                isActive ? `${styles.openMenu}` : null
              }`}
            >
              <nav className={styles.nav}>
                <div>
                  <ul>
                    <li>
                      <Link href="/">Главная</Link>
                    </li>
                    <li>
                      <Link href="/allCars">Купить</Link>
                    </li>
                    <li>
                      <Link href="/buyout">Выкуп</Link>
                    </li>
                    <li>
                      <Link href="/comission">Комиссия</Link>
                    </li>
                    <li>
                      <Link href="/trade">Трейд-ин</Link>
                    </li>
                    <li>
                      <Link href="/order">Заказать</Link>
                    </li>
                    <li>
                      <Link href="/contactInfo">Контакты</Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Nav;
