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
import avatarImg from "@assets/avatar.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ShowPassWordButton } from "@components/ShowPasswordButton";

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} py={20}>
        <Center>
          <Image source={logoImg} alt="logo" />
          <Heading fontFamily="heading" fontSize="lg">
            Boas vindas!
          </Heading>
          <Text textAlign="center" color="gray.600" mt={2}>
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>
        </Center>

        <Center>
          <Center w={24} h={24} mt={4} rounded="full" flex={1}>
            <Image source={avatarImg} alt="avatar" />
          </Center>
        </Center>

        <Center mt={8}>
          <Input placeholder="Nome" />
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Telefone" keyboardType="numeric" />

          <HStack width="full">
            <Input placeholder="Senha" secureTextEntry flex={1} />
            <ShowPassWordButton />
          </HStack>

          <HStack w="full">
            <Input placeholder="Confirmar senha" secureTextEntry flex={1} />
            <ShowPassWordButton />
          </HStack>

          <Button title="Criar" bgColor="gray.700" textColor="white" mt={4} />
        </Center>

        <Center mt={10}>
          <Text mb={4} color="gray.600">
            Já tem uma conta?
          </Text>
          <Button
            title="Ir para o login"
            onPress={() => navigation.navigate("signIn")}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
