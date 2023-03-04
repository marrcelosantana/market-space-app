import { useState } from "react";
import {
  Heading,
  HStack,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";

import { Avatar } from "@components/Avatar";
import { AdStatusTag } from "@components/AdStatusTag";
import { PayMethod } from "@components/PayMethod";
import { ButtonMD } from "@components/ButtonMD";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { AdPreviewDTO } from "@models/AdPreviewDTO";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";

import { AppError } from "@utils/AppError";
import { priceFormatter } from "@utils/formatter";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useProducts } from "@hooks/useProducts";
import { TabNavigatorRoutesProps } from "@routes/tab.routes";

type RouteParams = {
  adPreview: AdPreviewDTO;
};

export function AdPreview() {
  const { user } = useAuth();
  const { createAd } = useProducts();

  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const { adPreview } = route.params as RouteParams;

  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const navigation2 = useNavigation<TabNavigatorRoutesProps>();

  const width = Dimensions.get("window").width;

  async function handlePublishAd() {
    try {
      setIsLoading(true);

      await createAd(adPreview);

      toast.show({
        title: "Anúncio criado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

      navigation2.navigate("myAds");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possivel criar o anúncio.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <VStack
        h={40}
        bgColor="blue.500"
        alignItems="center"
        justifyContent="center"
        pt={12}
      >
        <Text fontFamily="heading" color="gray.200" fontSize="md">
          Pré visualização do anúncio
        </Text>
        <Text color="gray.200">É assim que seu produto vai aparecer!</Text>
      </VStack>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Carousel
          loop
          width={width}
          height={320}
          autoPlay={adPreview.imagesUri.length > 1}
          data={adPreview.imagesUri}
          scrollAnimationDuration={3000}
          renderItem={({ item }) => (
            <Image
              w="full"
              h="280px"
              mb={8}
              source={{
                uri: item,
              }}
              alt="Imagem do produto"
              resizeMode="cover"
            />
          )}
        />
        <VStack px={8} mt={4} pb={8}>
          <HStack alignItems="center">
            <Avatar
              borderColor="blue.500"
              uri={`${api.defaults.baseURL}/images/${user.avatar}`}
            />
            <Text ml={2} color="gray.600" fontSize="sm">
              {user.name}
            </Text>
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
                {adPreview.name}
              </Heading>
              <Heading fontSize="lg" fontFamily="heading" color="blue.500">
                {priceFormatter.format(adPreview.price)}
              </Heading>
            </HStack>

            <Text numberOfLines={5} mt={2} color="gray.600">
              {adPreview.description}
            </Text>

            <HStack alignItems="center" mt={6}>
              <Text fontFamily="heading" mr={2}>
                Aceita troca?
              </Text>
              {adPreview.accept_trade === true ? (
                <Text>Sim</Text>
              ) : (
                <Text>Não</Text>
              )}
            </HStack>

            <VStack mt={4}>
              <Text fontFamily="heading" mr={2} mb={2}>
                Método de pagamento
              </Text>

              {adPreview.payment_methods.map((item) => (
                <PayMethod type={item} key={item} />
              ))}
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>

      <HStack
        bgColor="white"
        px={8}
        pt={6}
        pb={8}
        alignItems="center"
        justifyContent="space-between"
      >
        <ButtonMD
          title="Voltar e editar"
          iconName="arrowleft"
          onPress={() => navigation.goBack()}
        />
        <ButtonMD
          title="Publicar"
          bgColor="blue.500"
          textColor="white"
          iconName="tag"
          iconColor="white"
          onPress={handlePublishAd}
          isLoading={isLoading}
        />
      </HStack>
    </VStack>
  );
}
