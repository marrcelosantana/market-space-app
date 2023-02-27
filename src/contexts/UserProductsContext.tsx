import { ProductDTO } from "@models/ProductDTO";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useToast } from "native-base";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

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
  const [loadingProducts, setIsLoadingProducts] = useState(false);

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
    <UserProductsContext.Provider value={{ userProducts, loadUserProducts }}>
      {children}
    </UserProductsContext.Provider>
  );
}
