export type AdPreviewDTO = {
  name: string;
  description: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  imagesUri: string[];
  payment_methods: string[];
};
