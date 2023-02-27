import { useCallback, useState } from "react";
import { Alert } from "react-native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
  Center,
  Heading,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  useTheme,
  useToast,
  VStack,
} from "native-base";

import { ArrowLeft, PencilSimpleLine } from "phosphor-react-native";
import productImg from "@assets/no-photo.jpg";

import { PayMethod } from "@components/PayMethod";
import { AdStatusTag } from "@components/AdStatusTag";
import { Avatar } from "@components/Avatar";
import { ButtonLG } from "@components/ButtonLG";
import { Loading } from "@components/Loading";

import { ProductDTO } from "@models/ProductDTO";
import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";

import { AppError } from "@utils/AppError";
import { priceFormatter } from "@utils/formatter";

type RouteParams = {
  productId: string;
};

export function MyAdDetails() {
  const [product, setProduct] = useState({} as ProductDTO);
  const [isLoading, setIsLoading] = useState(false);
  const [changeStatusLoading, setChangeStatusLoading] = useState(false);

  const { user } = useAuth();
  const { colors } = useTheme();

  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const { productId } = route.params as RouteParams;

  async function handleChangeStatus() {
    try {
      setChangeStatusLoading(true);

      await api.patch(`/products/${productId}`, {
        is_active: !product.is_active,
      });

      setProduct((state) => {
        return {
          ...state,
          is_active: !state.is_active,
        };
      });

      toast.show({
        title: "Status do anúncio atualizado!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar o status.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setChangeStatusLoading(false);
    }
  }

  async function removeAd() {
    try {
      setIsLoading(true);
      await api.delete(`/products/${productId}`);

      toast.show({
        title: "Anúncio removido!",
        placement: "top",
        bgColor: "green.500",
      });

      navigation.navigate("myAds");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível remover o anúncio.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemoveAd() {
    Alert.alert("Remover", "Deseja remover o anúncio?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => removeAd() },
    ]);
  }

  async function loadProductData() {
    try {
      setIsLoading(true);
      const response = await api.get(`/products/${productId}`);
      setProduct(response.data);
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
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadProductData();
    }, [productId])
  );

  return (
    <VStack flex={1}>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        mt={20}
        pb={4}
        px={8}
      >
        <Pressable onPress={() => navigation.navigate("myAds")}>
          <ArrowLeft size={24} color={colors.gray[700]} />
        </Pressable>

        <Pressable onPress={() => navigation.navigate("update")}>
          <PencilSimpleLine size={24} color={colors.gray[700]} />
        </Pressable>
      </HStack>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={
              product.product_images !== undefined
                ? {
                    uri: `${api.defaults.baseURL}/images/${product.product_images[0].path}`,
                  }
                : productImg
            }
            alt="imagem do produto"
            w="full"
            h={72}
            resizeMode="cover"
            style={product.is_active === false && { opacity: 0.5 }}
          />

          <VStack px={8} mt={4}>
            <HStack alignItems="center" justifyContent="space-between">
              <HStack alignItems="center">
                <Avatar
                  borderColor="blue.500"
                  uri={`${api.defaults.baseURL}/images/${user.avatar}`}
                />
                <Text ml={2} color="gray.600" fontSize="sm">
                  {user.name}
                </Text>
              </HStack>

              {product.is_active === false && (
                <Center bgColor="red.500" px={2} py={1} rounded="full">
                  <Text color="gray.100" fontFamily="heading">
                    DESATIVADO
                  </Text>
                </Center>
              )}
            </HStack>

            <VStack mt={4}>
              <AdStatusTag />

              <HStack alignItems="center" justifyContent="space-between" mt={1}>
                <Heading
                  fontSize="lg"
                  fontFamily="heading"
                  numberOfLines={1}
                  overflow="hidden"
                >
                  {product.name}
                </Heading>
                <Heading fontSize="lg" fontFamily="heading" color="blue.500">
                  {priceFormatter.format(product.price / 100)}
                </Heading>
              </HStack>

              <Text numberOfLines={5} mt={2} color="gray.600">
                {product.description}
              </Text>

              <HStack alignItems="center" mt={6}>
                <Text fontFamily="heading" mr={2}>
                  Aceita troca?
                </Text>
                {product.accept_trade ? <Text>Sim</Text> : <Text>Não</Text>}
              </HStack>

              <VStack mt={4}>
                <Text fontFamily="heading" mr={2} mb={2}>
                  Método de pagamento
                </Text>

                {product.payment_methods?.map((item) => (
                  <PayMethod type={item.key} key={item.key} />
                ))}
              </VStack>
            </VStack>

            <VStack mt={6}>
              <ButtonLG
                title={
                  product.is_active ? "Desativar anúncio" : "Reativar anúncio"
                }
                bgColor={product.is_active ? "gray.700" : "blue.500"}
                textColor="gray.100"
                iconName="power"
                iconColor="white"
                mb={3}
                onPress={handleChangeStatus}
                isLoading={changeStatusLoading}
              />
              <ButtonLG
                title="Excluir anúncio"
                iconName="trash"
                mb={10}
                isLoading={isLoading}
                onPress={handleRemoveAd}
              />
            </VStack>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
}
