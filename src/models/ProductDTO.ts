import { PayMethodDTO } from "./PayMethodDTO";
import { ProductImageDTO } from "./ProductImageDTO";
import { UserDTO } from "./UserDTO";

export type ProductDTO = {
  id: string;
  name: string;
  user_id: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  is_active: boolean;
  product_images: ProductImageDTO[];
  payment_methods: PayMethodDTO[];
  user: UserDTO;
};
