import Header from "@/components/header/Header";
import OrderContainer from "@/components/orderContainer/orderContainer";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import { fetchAPI } from "./api/api";
import Head from "next/head";

export default function Order({ orderDescriptions }) {
  return (
    <>
      <Head>
        <title>АльянсАвто — Заказать автомобиль</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Автоцентр «АльянсАвто» предлагает различные варианты для тех, кто хочет купить автомобиль из КНР, ОАЭ, Южной Кореи, США или Канады – как новые, так и с пробегом."
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
        <meta property="og:url" content="https://alliance38.ru/order" />
        <meta property="og:title" content="АльянсАвто" />
        <meta
          property="og:description"
          content="Автоцентр «АльянсАвто» предлагает различные варианты для тех, кто хочет купить автомобиль из КНР, ОАЭ, Южной Кореи, США или Канады – как новые, так и с пробегом."
        />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <OrderContainer orderDescriptions={orderDescriptions} />
      <Contact title="Оставить заявку" />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const [orderDescriptionsRes] = await Promise.all([
    fetchAPI("/order-descriptions", { populate: ["description"] }),
  ]);

  return {
    props: {
      orderDescriptions: orderDescriptionsRes.data,
    },
    revalidate: 1,
  };
}
