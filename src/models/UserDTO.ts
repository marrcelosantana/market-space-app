import { ProductDTO } from "./ProductDTO";

export type UserDTO = {
  id: string;
  name: string;
  email: string;
  tel: string;
  avatar: string;
  products: ProductDTO[];
};
