import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./car.module.scss";
import { fetchAPI } from "../api/api";
import Fancybox from "@/components/fancybox";
import StrapiImages from "@/components/images";
import { getStrapiMedias } from "../api/media";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import Credit from "@/components/credit/Credit";
import creditStyles from "@/components/credit/credit.module.scss";

import Header from "@/components/header/Header";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import ServicesHeader from "@/components/servicesHeader/ServicesHeader";

import Group from "./Group";
import Group1 from "./Group1";

import ArrowLeft from "@/public/assets/ArrowLeft";
import Link from "next/link";

import OrderContact from "@/components/orderContact/OrderContact";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/thumbs";
export { Navigation, Thumbs, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Controller } from "swiper/modules";

import Head from "next/head";

const Car = ({ car }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [openCredit, setOpenCredit] = useState(false);
  const handleOpenCredit = () => setOpenCredit(true);
  const handleCloseCredit = () => setOpenCredit(false);

  const [openOrder, setOpenOrder] = useState(false);
  const handleOpenOrder = () => setOpenOrder(true);
  const handleCloseOrder = () => setOpenOrder(false);

  const styleCredit = {
    position: "absolute",
    top: "26%",
    left: "50%",
    transform: "translate(-50%, -20%)",
    overflowY: "scroll",
    overflowX: "hidden",
    height: "80%",
    display: "block",
    width: "70%",
    maxWidth: "900px",
    bgcolor: "#000",
    border: "1px solid #fff",
    boxShadow: 24,
    p: 3,
    textAlign: "left",
  };

  let price = car.attributes.price;
  price = price.toLocaleString();

  const handleClose = () => setOpenCredit(false);

  return (
    <>
      <Head>
        <title>
          Купить {car.attributes.title}, {car.attributes.year} года в Иркутске
        </title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="АльянсАвто предлагает широкий выбор и удобные условия для покупки или продажи автомобиля."
        />
        <meta
          name="keywords"
          content="Автосалон, купить автомобиль, автомобили с пробегом, новые автомобили, выкуп автомобилей, комиссионная продажа, trade-in, заказать автомобиль"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta property="og:url" content="https://alliance38.ru/" />
        <meta property="og:title" content="АльянсАвто" />
        <meta
          property="og:description"
          content="АльянсАвто — новые автомобили и автомобили с пробегом в Иркутске"
        />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <section className={styles.car}>
        <div className={styles.wrapper}>
          <ServicesHeader />
          <h2 className={styles.title}>
            Купить {car.attributes.title}, {car.attributes.year} года в Иркутске
          </h2>
          <div className={styles.cartWrapper}>
            <div className={styles.cartGallery}>
              <div className={styles.cartGalleryMain}>
                <Fancybox
                  options={{
                    Carousel: {
                      infinite: true,
                    },
                    Thumbs: {
                      type: "modern",
                    },
                  }}
                >
                  <Swiper
                    style={{
                      "--swiper-navigation-color": "#fff",
                      "--swiper-pagination-color": "#fff",
                    }}
                    loop={true}
                    spaceBetween={10}
                    navigation={false}
                    thumbs={{
                      swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                          ? thumbsSwiper
                          : null,
                    }}
                    modules={[Navigation, Thumbs]}
                    className={styles.mySwiperMain}
                    watchSlidesProgress={true}
                  >
                    {car.attributes.gallery.data.map((image) => (
                      <SwiperSlide>
                        <div
                          data-fancybox="gallery"
                          href={getStrapiMedias(image)}
                          className={styles.imgCont}
                        >
                          <StrapiImages
                            image={image}
                            className={styles.galleryImage}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Fancybox>
              </div>
              <Swiper
                style={{
                  "--swiper-navigation-color": "red",
                  "--swiper-navigation-size": "30px",
                  "--swiper-pagination-color": "red",
                }}
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                slideToClickedSlide={true}
                onSliderMove={setThumbsSwiper}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
                className={"mySwiperSmall"}
                navigation={true}
              >
                {car.attributes.gallery.data.map((image) => (
                  <SwiperSlide>
                    <StrapiImages
                      image={image}
                      className={styles.galleryImage}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={styles.cartInfo}>
              <div className={styles.blockInfo}>
                <div className={styles.row}>
                  <span className={styles.infoTitle}>Год выпуска</span>
                  <span className={styles.info}>{car.attributes.year} г</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.infoTitle}>Пробег</span>
                  <span className={styles.info}>
                    {car.attributes.mileage} км
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.infoTitle}>Двигатель</span>
                  <span className={styles.info}>
                    {car.attributes.fuel_type}, {car.attributes.engine_capacity}
                    л.
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.infoTitle}>Мощность</span>
                  <span className={styles.info}>
                    {car.attributes.horsepower} л.с.
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.infoTitle}>Коробка передач</span>
                  <span className={styles.info}>
                    {car.attributes.transmission}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.infoTitle}>Привод</span>
                  <span className={styles.info}>
                    {car.attributes.wheel_drive}
                  </span>
                </div>
                <div className={styles.row}>
                  <div className={styles.cardPrice}>{price} ₽</div>
                  <div className={styles.cardCredits}>
                    от {car.attributes.credit_price.toLocaleString()} ₽/мес
                  </div>
                </div>
              </div>
              <div className={styles.blockBtn}>
                <div className={styles.row}>
                  <button onClick={handleOpenCredit}>Рассичтать кредит</button>
                  <Modal
                    open={openCredit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    onClose={handleCloseCredit}
                    className={creditStyles.credit}
                  >
                    <Box sx={styleCredit} className={creditStyles.box}>
                      <button onClick={handleClose} className={styles.closeBtn}>
                        &times;
                      </button>
                      <Credit car={car} />
                    </Box>
                  </Modal>
                </div>
                <div className={styles.row}>
                  <a
                    target="_blank"
                    href="https://b24-hrrpch.bitrix24site.ru/crm_form_kqbq7/"
                  >
                    Рассчитать лизинг
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Contact title="Оставить заявку" />
      <Footer />
    </>
  );
};

export default Car;

export async function getStaticPaths() {
  const carsRes = await fetchAPI("/cars", { fields: ["slug"] });

  return {
    paths: carsRes.data.map((car) => ({
      params: {
        slug: car.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const carsRes = await fetchAPI("/cars", {
    filters: {
      slug: params.slug,
    },
    populate: ["slug", "gallery", "main_image"],
  });

  return {
    props: {
      car: carsRes.data[0],
    },
    revalidate: 1,
  };
}
