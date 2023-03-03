import { useCallback, useState } from "react";
import { Dimensions } from "react-native";

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
  HStack,
  Pressable,
  useTheme,
  VStack,
  Image,
  Text,
  Heading,
  ScrollView,
  useToast,
} from "native-base";

import { ArrowLeft, WhatsappLogo } from "phosphor-react-native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ProductDTO } from "@models/ProductDTO";
import { api } from "@services/api";

import { Avatar } from "@components/Avatar";
import { AdStatusTag } from "@components/AdStatusTag";
import { PayMethod } from "@components/PayMethod";
import { Loading } from "@components/Loading";

import { priceFormatter } from "@utils/formatter";
import { AppError } from "@utils/AppError";

import Carousel from "react-native-reanimated-carousel";

type RouteParams = {
  productId: string;
};

export function AdDetails() {
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);
  const [isLoading, setIsloading] = useState(false);

  const { colors } = useTheme();
  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const { productId } = route.params as RouteParams;

  const width = Dimensions.get("window").width;

  async function loadProductData() {
    try {
      setIsloading(true);
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
      setIsloading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadProductData();
    }, [productId])
  );

  return (
    <>
      {isLoading || product.user === undefined ? (
        <Loading />
      ) : (
        <VStack flex={1}>
          <HStack mt={10} px={8} py={4}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              <ArrowLeft size={24} color={colors.gray[700]} />
            </Pressable>
          </HStack>

          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack flex={1}>
              <Carousel
                loop
                width={width}
                height={320}
                autoPlay={product.product_images.length > 1}
                data={product.product_images}
                scrollAnimationDuration={3000}
                renderItem={({ item }) => (
                  <Image
                    w="full"
                    h={72}
                    mb={8}
                    source={{
                      uri: `${api.defaults.baseURL}/images/${item.path}`,
                    }}
                    alt="Imagem do produto"
                    resizeMode="cover"
                  />
                )}
              />

              <HStack px={8} alignItems="center" mb={4}>
                <Avatar
                  borderColor="blue.500"
                  uri={`${api.defaults.baseURL}/images/${product.user.avatar}`}
                />
                <Text ml={2}>{product.user.name}</Text>
              </HStack>

              <VStack px={8} pb={8}>
                <AdStatusTag title="novo" />

                <HStack
                  mt={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Heading fontFamily="heading" fontSize="lg">
                    {product.name}
                  </Heading>
                  <Heading fontFamily="heading" fontSize="lg" color="blue.500">
                    {priceFormatter.format(product.price)}
                  </Heading>
                </HStack>

                <Text numberOfLines={5} mt={2} color="gray.600">
                  {product.description}
                </Text>

                <HStack mt={4} alignItems="center">
                  <Heading
                    fontFamily="heading"
                    fontSize="sm"
                    mr={2}
                    color="gray.600"
                  >
                    Aceita troca?
                  </Heading>

                  {product.accept_trade ? (
                    <Text fontSize="sm" color="gray.600">
                      Sim
                    </Text>
                  ) : (
                    <Text fontSize="sm" color="gray.600">
                      Não
                    </Text>
                  )}
                </HStack>

                <VStack mt={4}>
                  <Heading
                    fontFamily="heading"
                    fontSize="sm"
                    color="gray.600"
                    mb={2}
                  >
                    Meios de pagamento:
                  </Heading>

                  {product.payment_methods?.map((item) => (
                    <PayMethod type={item.key} key={item.key} />
                  ))}
                </VStack>
              </VStack>
            </VStack>
          </ScrollView>

          <HStack
            bgColor="white"
            px={8}
            pt={4}
            pb={8}
            alignItems="center"
            justifyContent="space-between"
          >
            <Heading
              fontSize="xl"
              fontFamily="heading"
              color="blue.700"
              numberOfLines={1}
              overflow="hidden"
            >
              {priceFormatter.format(product.price)}
            </Heading>

            <Pressable bgColor="blue.500" rounded={6}>
              <HStack alignItems="center" justifyContent="center" p={3}>
                <WhatsappLogo size={16} color={colors.gray[100]} />
                <Text
                  color="gray.100"
                  ml={1}
                  fontSize="xs"
                  fontFamily="heading"
                >
                  Entrar em contato
                </Text>
              </HStack>
            </Pressable>
          </HStack>
        </VStack>
      )}
    </>
  );
}
