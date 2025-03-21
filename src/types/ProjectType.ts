import { StaticImageData } from "next/image";

export type ProjectType = {
  title: string;
  company: string;
  year: string;
  results: { title: string }[];
  link: string;
  image: StaticImageData;
};
