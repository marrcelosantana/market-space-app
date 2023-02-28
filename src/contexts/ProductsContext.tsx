import { createContext, ReactNode, useState } from "react";
import { useToast } from "native-base";

import { api } from "@services/api";
import { ProductDTO } from "@models/ProductDTO";
import { AppError } from "@utils/AppError";

export type ProductsDataProps = {
  userProducts: ProductDTO[];
  products: ProductDTO[];
  isLoadingProducts: boolean;
  loadUserProducts: () => Promise<void>;
  loadProducts: (query?: string) => Promise<void>;
};

type ProductsProvider = {
  children: ReactNode;
};

export const ProductsContext = createContext<ProductsDataProps>(
  {} as ProductsDataProps
);

export function ProductsContextProvider({ children }: ProductsProvider) {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [userProducts, setUserProducts] = useState<ProductDTO[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const toast = useToast();

  async function loadProducts(query?: string) {
    try {
      setIsLoadingProducts(true);
      const response = await api.get(
        query ? `/products/?&query=${query}` : `/products/`
      );
      setProducts(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os dados.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoadingProducts(false);
    }
  }

  async function loadUserProducts() {
    try {
      setIsLoadingProducts(true);
      const response = await api.get("users/products");
      setUserProducts(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os dados.";

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
    <ProductsContext.Provider
      value={{
        userProducts,
        loadUserProducts,
        isLoadingProducts,
        products,
        loadProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
