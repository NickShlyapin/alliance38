import Header from "@/components/header/Header";
import BuyoutContainer from "@/components/buyoutContainer/buyoutContainer";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import { fetchAPI } from "./api/api";
import Head from "next/head";

export default function Buyout({ buyoutDescriptions }) {
  return (
    <>
      <Head>
        <title>АльянсАвто — Выкупим Ваш автомобиль в течение часа!</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Наша компания готова выкупать абсолютно любые автомобили на выгодных условиях!"
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
        <meta property="og:url" content="https://alliance38.ru/buyout" />
        <meta property="og:title" content="АльянсАвто" />
        <meta
          property="og:description"
          content="АльянсАвто — Выкупим Ваш автомобиль в течение часа!"
        />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <BuyoutContainer buyoutDescriptions={buyoutDescriptions} />
      <Contact title="Оставить заявку" />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const [buyoutDescriptionsRes] = await Promise.all([
    fetchAPI("/buyout-descriptions", { populate: ["description"] }),
  ]);

  return {
    props: {
      buyoutDescriptions: buyoutDescriptionsRes.data,
    },
    revalidate: 1,
  };
}
