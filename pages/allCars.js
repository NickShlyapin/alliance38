import React from "react";
import { fetchAPI } from "./api/api";
import styles from "../styles/allCars.module.scss";

import Header from "@/components/header/Header";
import AllMarket from "@/components/allMarket/AllMarket";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import Head from "next/head";

function AllCars({ cars, categories }) {
  return (
    <>
      <Head>
        <title>
          АльянсАвто — новые автомобили и автомобили с пробегом в наличии
        </title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="АльянсАвто предлагает широкий выбор и удобные условия для покупки или продажи автомобиля."
        />
        <meta
          name="keywords"
          content="Автосалон, купить автомобиль, автомобили с пробегом, новые автомобили, выкуп автомобилей, комиссионная продажа, trade-in, заказать автомобиль, автомобили в наличии"
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
        <meta property="og:url" content="https://alliance38.ru/allCars" />
        <meta property="og:title" content="АльянсАвто" />
        <meta
          property="og:description"
          content="АльянсАвто — новые автомобили и автомобили с пробегом в наличии"
        />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <AllMarket cars={cars} categories={categories} />
      <Contact />
      <Footer />
    </>
  );
}

export default AllCars;

export async function getServerSideProps({ params }) {
  const carsRes = await fetchAPI("/cars", {
    populate: ["slug", "main_image"],
  });

  const categoriesRes = await fetchAPI("/categories", {
    populate: ["name", "logo", "cars", "slug"],
  });

  return {
    props: {
      cars: carsRes.data,
      categories: categoriesRes.data,
    },
  };
}
