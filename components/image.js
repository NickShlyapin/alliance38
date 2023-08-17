import { getStrapiMedia } from "@/pages/api/media";
import Image from "next/image";

const StrapiImage = ({ image, className }) => {
  const { alternativeText, width, height } = image.data.attributes;

  return (
    <Image
      width={width}
      height={height}
      src={getStrapiMedia(image)}
      alt={alternativeText || ""}
      className={className}
    />
  );
};

export default StrapiImage;
