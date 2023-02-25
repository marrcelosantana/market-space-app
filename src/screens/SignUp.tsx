import {
  VStack,
  Image,
  Text,
  ScrollView,
  Heading,
  Center,
  HStack,
  Pressable,
} from "native-base";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Input } from "@components/Input";
import { ButtonLG } from "@components/ButtonLG";
import { ShowPassWordButton } from "@components/ShowPasswordButton";

import { PencilSimpleLine } from "phosphor-react-native";

import logoImg from "@assets/logo.png";
import avatarImg from "@assets/avatar.png";

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack flex={1} px={10} pt={8}>
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
            <HStack
              w={24}
              h={24}
              mt={4}
              rounded="full"
              flex={1}
              alignItems="center"
              justifyContent="center"
            >
              <Image source={avatarImg} alt="avatar" />
              <Pressable
                w={10}
                h={10}
                rounded="full"
                alignItems="center"
                justifyContent="center"
                bgColor="blue.500"
                ml={-8}
                mt={12}
              >
                <PencilSimpleLine size={22} color="#fff" />
              </Pressable>
            </HStack>
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

            <ButtonLG
              title="Criar"
              bgColor="gray.700"
              textColor="white"
              mt={4}
            />
          </Center>

          <Center mt={10}>
            <Text mb={4} color="gray.600">
              Já tem uma conta?
            </Text>
            <ButtonLG
              title="Ir para o login"
              onPress={() => navigation.navigate("signIn")}
            />
          </Center>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
