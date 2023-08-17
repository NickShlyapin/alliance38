import Head from "next/head";
import Header from "../components/header/Header";
import Main from "../components/main/Main";
import MarketHeader from "@/components/marketHeader/MarketHeader";
import Market from "../components/market/Market";
import MarketBottom from "@/components/marketBottom/MarketBottom";
import Sell from "../components/sell/Sell";
import Order from "../components/order/Order";
import Contact from "../components/contact/Contact";
import Footer from "../components/footer/Footer";
import { fetchAPI } from "./api/api";
import Script from "next/script";

export default function Home({ cars, categories }) {
  return (
    <>
      <Head>
        <title>
          АльянсАвто — новые автомобили и автомобили с пробегом в Иркутске
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
      <Main />
      <MarketHeader categories={categories} />
      <Market cars={cars} categories={categories} />
      <MarketBottom />
      <Sell />
      <Order />
      <Contact title="Остались вопросы?" />
      <Footer />
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-TSVVVGMBR7"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TSVVVGMBR7');
        `}
      </Script>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const carsRes = await fetchAPI("/cars", {
    populate: ["slug", "main_image", "title", "fuel_type"],
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
