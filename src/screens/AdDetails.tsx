import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  HStack,
  Pressable,
  useTheme,
  VStack,
  Image,
  Text,
  Heading,
  ScrollView,
} from "native-base";

import { ArrowLeft, WhatsappLogo } from "phosphor-react-native";

import productImg from "@assets/bike.png";

import { Avatar } from "@components/Avatar";
import { AdStatusTag } from "@components/AdStatusTag";
import { PayMethod } from "@components/PayMethod";

export function AdDetails() {
  const { colors } = useTheme();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  return (
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
          <Image
            source={productImg}
            alt="imagem do produto"
            width="full"
            h={72}
            resizeMode="cover"
            mb={8}
          />

          <HStack px={8} alignItems="center" mb={4}>
            <Avatar borderColor="blue.500" />
            <Text ml={2}>Makenna Baptista</Text>
          </HStack>

          <VStack px={8}>
            <AdStatusTag title="novo" />

            <HStack mt={2} alignItems="center" justifyContent="space-between">
              <Heading fontFamily="heading" fontSize="lg">
                Bicicleta
              </Heading>
              <Heading fontFamily="heading" fontSize="lg" color="blue.500">
                R$ 120,00
              </Heading>
            </HStack>

            <Text numberOfLines={5} mt={2} color="gray.600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              sunt accusantium esse repudiandae provident eaque quas aperiam
              beatae culpa ipsam praesentium officiis, assumenda excepturi,
              minima saepe cumque laborum magni alias!
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
              <Text fontSize="sm" color="gray.600">
                Sim
              </Text>
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

              <PayMethod type="ticket" />
              <PayMethod type="pix" />
              <PayMethod type="money" />
              <PayMethod type="credit-card" />
              <PayMethod type="deposit" />
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
        <Heading fontSize="xl" fontFamily="heading" color="blue.700">
          R$ 120,00
        </Heading>

        <Pressable bgColor="blue.500" rounded={6}>
          <HStack alignItems="center" justifyContent="center" p={3}>
            <WhatsappLogo size={16} color={colors.gray[100]} />
            <Text color="gray.100" ml={1} fontSize="xs" fontFamily="heading">
              Entrar em contato
            </Text>
          </HStack>
        </Pressable>
      </HStack>
    </VStack>
  );
}
