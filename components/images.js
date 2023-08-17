import { getStrapiMedias } from "@/pages/api/media";
import Image from "next/image";

const StrapiImages = ({ image, className }) => {
  const { alternativeText, width, height } = image.attributes;

  return (
    <Image
      //width={width}
      //height={height}
      src={getStrapiMedias(image)}
      alt={alternativeText || ""}
      className={className}
      fill
    />
  );
};

export default StrapiImages;
