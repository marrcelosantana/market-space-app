import { PayMethodDTO } from "./PayMethodDTO";
import { ProductImageDTO } from "./ProductImageDTO";
import { UserDTO } from "./UserDTO";

export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  price: number;
  accept_trade: boolean;
  is_new: boolean;
  is_active: boolean;
  product_images: ProductImageDTO[];
  payment_methods: PayMethodDTO[];
  user: UserDTO;
  user_id: string;
};
