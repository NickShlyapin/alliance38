import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Contact from "@/components/contact/Contact";
import Stamps from "@/components/stamps/Stamps";
import Market from "@/components/market/Market";
import { fetchAPI } from "../api/api";
import Link from "next/link";
import ArrowLeft from "@/public/assets/ArrowLeft";
import CategoryHeader from "@/components/categoryHeader/CategoryHeader";
import Head from "next/head";

const Category = ({ category, categories, categoriesu }) => {
  return (
    <>
      <Head>
        <title>Автомобили {category.attributes.name} в наличии</title>
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
      <CategoryHeader categoriesu={categoriesu} category={category} />
      <Market
        cars={category.attributes.cars.data}
        categories={categories.data}
      />
      <Contact />
      <Footer />
    </>
  );
};

export async function getStaticPaths() {
  const categoriesRes = await fetchAPI("/categories", { fields: ["slug"] });

  return {
    paths: categoriesRes.data.map((category) => ({
      params: {
        slug: category.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const matchingCategories = await fetchAPI("/categories", {
    filters: { slug: params.slug },
    populate: {
      cars: {
        populate: "*",
      },
    },
  });
  const allCategories = await fetchAPI("/categories", {
    populate: ["name", "logo", "cars", "slug"],
  });

  const categoriesResu = await fetchAPI("/categories", {
    populate: ["name", "logo", "cars", "slug"],
  });

  return {
    props: {
      category: matchingCategories.data[0],
      categories: allCategories,
      categoriesu: categoriesResu.data,
    },
    revalidate: 1,
  };
}

export default Category;
