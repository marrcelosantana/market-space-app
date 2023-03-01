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
import { priceFormatter } from "@utils/formatter";
import { api } from "@services/api";

type RouteParams = {
  adPreview: AdPreviewDTO;
};

export function AdPreview() {
  const { user } = useAuth();

  const route = useRoute();
  const { adPreview } = route.params as RouteParams;

  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

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
        <Image
          source={{ uri: adPreview.images[0].uri }}
          alt="produto"
          w="full"
          h="280px"
          resizeMode="cover"
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
                {adPreview.title}
              </Heading>
              <Heading fontSize="lg" fontFamily="heading" color="blue.500">
                {priceFormatter.format(Number(adPreview.price))}
              </Heading>
            </HStack>

            <Text numberOfLines={5} mt={2} color="gray.600">
              {adPreview.description}
            </Text>

            <HStack alignItems="center" mt={6}>
              <Text fontFamily="heading" mr={2}>
                Aceita troca?
              </Text>
              {adPreview.acceptTrade === true ? (
                <Text>Sim</Text>
              ) : (
                <Text>Não</Text>
              )}
            </HStack>

            <VStack mt={4}>
              <Text fontFamily="heading" mr={2} mb={2}>
                Método de pagamento
              </Text>

              {adPreview.payMethods.map((item) => (
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
          onPress={() => navigation.navigate("create")}
        />
        <ButtonMD
          title="Publicar"
          bgColor="blue.500"
          textColor="white"
          iconName="tag"
          iconColor="white"
          onPress={() => navigation.navigate("my_ad_details")}
        />
      </HStack>
    </VStack>
  );
}
