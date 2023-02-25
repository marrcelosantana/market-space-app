import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  Heading,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";

import { ArrowLeft, PencilSimpleLine } from "phosphor-react-native";
import productImg from "@assets/bike.png";

import { PayMethod } from "@components/PayMethod";
import { AdStatusTag } from "@components/AdStatusTag";
import { Avatar } from "@components/Avatar";
import { ButtonLG } from "@components/ButtonLG";

export function MyAdDetails() {
  const { colors } = useTheme();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  return (
    <VStack flex={1}>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        mt={20}
        pb={4}
        px={8}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.gray[700]} />
        </Pressable>

        <Pressable onPress={() => navigation.navigate("update")}>
          <PencilSimpleLine size={24} color={colors.gray[700]} />
        </Pressable>
      </HStack>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={productImg}
          alt="imagem do produto"
          w="full"
          h={72}
          resizeMode="cover"
        />

        <VStack px={8} mt={4}>
          <HStack alignItems="center">
            <Avatar borderColor="blue.500" />
            <Text ml={2} color="gray.600" fontSize="sm">
              Marcelo Santana
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
                Bicicleta Vermelha
              </Heading>
              <Heading fontSize="lg" fontFamily="heading" color="blue.500">
                R$ 135,00
              </Heading>
            </HStack>

            <Text numberOfLines={5} mt={2} color="gray.600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa
              neque excepturi dicta accusamus, hic cupiditate impedit quam nam
              aut possimus exercitationem, mollitia, reprehenderit explicabo
              expedita voluptatem iste eligendi ad! Tempore!
            </Text>

            <HStack alignItems="center" mt={6}>
              <Text fontFamily="heading" mr={2}>
                Aceita troca?
              </Text>
              <Text>Não</Text>
            </HStack>

            <VStack mt={4}>
              <Text fontFamily="heading" mr={2} mb={2}>
                Método de pagamento
              </Text>

              <PayMethod type="ticket" />
              <PayMethod type="pix" />
              <PayMethod type="money" />
              <PayMethod type="credit-card" />
              <PayMethod type="deposit" />
            </VStack>
          </VStack>

          <VStack mt={6}>
            <ButtonLG
              title="Desativar anúncio"
              bgColor="gray.700"
              textColor="gray.100"
              iconName="power"
              iconColor="white"
              mb={3}
            />
            <ButtonLG title="Excluir anúncio" iconName="trash" mb={10} />
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
