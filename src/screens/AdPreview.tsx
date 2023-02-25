import { Heading, HStack, Image, ScrollView, Text, VStack } from "native-base";

import productImg from "@assets/bike.png";
import { Avatar } from "@components/Avatar";
import { AdStatusTag } from "@components/AdStatusTag";
import { PayMethod } from "@components/PayMethod";
import { ButtonMD } from "@components/ButtonMD";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function AdPreview() {
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

      <Image
        source={productImg}
        alt="produto"
        w="full"
        h="280px"
        resizeMode="cover"
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
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
