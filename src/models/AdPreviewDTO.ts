import { ImageProps } from "@screens/CreateAd";

export type AdPreviewDTO = {
  title: string;
  description: string;
  price: string;
  isNew: boolean;
  acceptTrade: boolean;
  images: ImageProps[];
  payMethods: string[];
};
