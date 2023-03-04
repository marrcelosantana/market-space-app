import { createContext, ReactNode, useState } from "react";
import { useToast } from "native-base";

import { ProductDTO } from "@models/ProductDTO";
import { AdPreviewDTO } from "@models/AdPreviewDTO";
import { ProductImageDTO } from "@models/ProductImageDTO";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useAuth } from "@hooks/useAuth";

export type ProductsDataProps = {
  userProducts: ProductDTO[];
  products: ProductDTO[];
  productData: ProductDTO;
  isLoadingProducts: boolean;

  loadUserProducts: () => Promise<void>;
  loadProducts: (query?: string) => Promise<void>;
  loadProductData: (productId: string) => Promise<void>;
  createAd: (product: AdPreviewDTO) => Promise<void>;
  uploadImages: (id: string, images: string[]) => Promise<void>;
  updateAd: (
    product: AdPreviewDTO,
    productId: string,
    deletedImages: string[],
    oldImages: ProductImageDTO[]
  ) => Promise<void>;
};

type ProductsProvider = {
  children: ReactNode;
};

export const ProductsContext = createContext<ProductsDataProps>(
  {} as ProductsDataProps
);

export function ProductsContextProvider({ children }: ProductsProvider) {
  const { user } = useAuth();

  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [userProducts, setUserProducts] = useState<ProductDTO[]>([]);
  const [productData, setProductData] = useState<ProductDTO>({} as ProductDTO);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const toast = useToast();

  async function loadProducts(query?: string) {
    try {
      setIsLoadingProducts(true);
      const response = await api.get(
        query ? `products/?&query=${query}` : `products`
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

  async function loadProductData(productId: string) {
    try {
      setIsLoadingProducts(true);
      const response = await api.get(`/products/${productId}`);
      setProductData(response.data);
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

  async function createAd(product: AdPreviewDTO) {
    try {
      setIsLoadingProducts(true);
      const {
        imagesUri,
        name,
        price,
        description,
        is_new,
        accept_trade,
        payment_methods,
      } = product;

      const response = await api.post("/products", {
        name,
        description,
        price,
        is_new,
        accept_trade,
        payment_methods,
        imagesUri,
      });

      const { id } = response.data;

      await uploadImages(id, imagesUri);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingProducts(false);
    }
  }

  async function updateAd(
    product: AdPreviewDTO,
    productId: string,
    deletedImages: string[],
    oldImages: ProductImageDTO[]
  ) {
    try {
      if (
        product.imagesUri.length + oldImages.length === 0 ||
        product.payment_methods.length === 0 ||
        product.name.trim() === "" ||
        product.description.trim() === "" ||
        product.price === null
      ) {
        return toast.show({
          title: "Você esqueceu de preencher algum campo.",
          bg: "red.500",
          placement: "top",
        });
      }

      const data = {
        name: product.name,
        description: product.description,
        price: product.price,
        is_new: product.is_new,
        accept_trade: product.accept_trade,
        payment_methods: product.payment_methods,
      };

      await api.put(`/products/${productId}`, data);

      if (oldImages.length === 3) {
        return;
      }

      await updateImages(deletedImages, product.imagesUri, productId);
    } catch (error) {
      throw error;
    }
  }

  async function uploadImages(productId: string, images: string[]) {
    try {
      const imageData = new FormData();
      imageData.append("product_id", productId);

      images.forEach((item) => {
        const imageExtension = item.split(".").pop();

        const imageFile = {
          name: `${user.name}.${imageExtension}`,
          uri: item,
          type: `image/${imageExtension}`,
        } as any;

        imageData.append("images", imageFile);
      });

      await api.post("/products/images/", imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async function updateImages(
    deletedImages: string[],
    images: string[],
    productId: string
  ) {
    try {
      if (deletedImages.length > 0) {
        await api.delete("/products/images/", {
          data: { productImagesIds: deletedImages },
        });
      }

      if (images.length > 0) {
        await uploadImages(productId, images);
      }
    } catch (error) {
      throw error;
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
        productData,
        loadProductData,
        createAd,
        uploadImages,
        updateAd,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
