import {
  VStack,
  Image,
  Text,
  ScrollView,
  Heading,
  Center,
  HStack,
} from "native-base";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import logoImg from "@assets/logo.png";

import { Input } from "@components/Input";
import { ButtonLG } from "@components/ButtonLG";
import { ShowPassWordButton } from "@components/ShowPasswordButton";

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack width="100%" height="75%" px={10} py={32} rounded={24}>
        <Center>
          <Image source={logoImg} alt="logo" />
          <Heading color="gray.700" fontSize={32} fontFamily="heading">
            marketspace
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Seu espaço de compra e venda
          </Text>
        </Center>

        <Center mt={16}>
          <Text mb={4}>Acesse sua conta</Text>

          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <HStack width="full">
            <Input placeholder="Senha" secureTextEntry flex={1} />
            <ShowPassWordButton />
          </HStack>

          <ButtonLG
            title="Acessar"
            bgColor="blue.500"
            textColor="gray.100"
            mt={4}
          />
        </Center>
      </VStack>

      <VStack flex={1} px={10}>
        <Center pt={12}>
          <Text mb={4} color="gray.600">
            Ainda não tem acesso?
          </Text>
          <ButtonLG
            title="Criar uma conta"
            onPress={() => {
              navigation.navigate("signUp");
            }}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
