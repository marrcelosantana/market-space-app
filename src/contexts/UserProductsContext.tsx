import { createContext, ReactNode, useState } from "react";
import { useToast } from "native-base";

import { api } from "@services/api";
import { ProductDTO } from "@models/ProductDTO";
import { AppError } from "@utils/AppError";

export type UserProductsDataProps = {
  userProducts: ProductDTO[];
  loadUserProducts: () => Promise<void>;
  isLoadingProducts: boolean;
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
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const toast = useToast();

  async function loadUserProducts() {
    try {
      setIsLoadingProducts(true);
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
    } finally {
      setIsLoadingProducts(false);
    }
  }

  return (
    <UserProductsContext.Provider
      value={{ userProducts, loadUserProducts, isLoadingProducts }}
    >
      {children}
    </UserProductsContext.Provider>
  );
}
