import { ProductDTO } from "@models/ProductDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useToast } from "native-base";
import { createContext, ReactNode, useState } from "react";

export type UserProductsDataProps = {
  userProducts: ProductDTO[];
  loadUserProducts: () => Promise<void>;
};

type UserProductsProvider = {
  children: ReactNode;
};

export const UserProductsContext = createContext<UserProductsDataProps>(
  {} as UserProductsDataProps
);

export function UserProductsContextProvider({
  children,
}: UserProductsProvider) {
  const [userProducts, setUserProducts] = useState<ProductDTO[]>([]);

  const toast = useToast();

  async function loadUserProducts() {
    try {
      const response = await api.get("users/products");
      setUserProducts(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível logar.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }
  return (
    <UserProductsContext.Provider value={{ userProducts, loadUserProducts }}>
      {children}
    </UserProductsContext.Provider>
  );
}
