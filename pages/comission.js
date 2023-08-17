import Header from "@/components/header/Header";
import ComissionContainer from "@/components/comissionContainer/comissionContainer";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import { fetchAPI } from "./api/api";
import Head from "next/head";

export default function Comission({ comissionDescriptions }) {
  return (
    <>
      <Head>
        <title>АльянсАвто — Продадим Ваш автомобиль по желаемой цене!</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Мы готовы оценить Ваш автомобиль и предложить конкурентную цену в соответствии с текущим рыночным спросом."
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
        <meta property="og:url" content="https://alliance38.ru/comission" />
        <meta property="og:title" content="АльянсАвто" />
        <meta
          property="og:description"
          content="АльянсАвто — Продадим Ваш автомобиль по желаемой цене!"
        />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <ComissionContainer comissionDescriptions={comissionDescriptions} />
      <Contact title="Оставить заявку" />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const [comissionDescriptionsRes] = await Promise.all([
    fetchAPI("/comission-descriptions", { populate: ["description"] }),
  ]);

  return {
    props: {
      comissionDescriptions: comissionDescriptionsRes.data,
    },
    revalidate: 1,
  };
}
