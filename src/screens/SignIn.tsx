import { VStack, Image, Text, ScrollView, Heading, Center } from "native-base";

import logoImg from "@assets/logo.png";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        width="100%"
        height="75%"
        px={10}
        py={32}
        bgColor="gray.200"
        rounded={24}
      >
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
          <Input placeholder="Senha" secureTextEntry />

          <Button
            title="Acessar"
            bgColor="blue.500"
            textColor="gray.100"
            mt={4}
          />
        </Center>
      </VStack>

      <VStack flex={1} px={10}>
        <Center pt={12}>
          <Text mb={4}>Ainda não tem acesso?</Text>
          <Button title="Criar uma conta" />
        </Center>
      </VStack>
    </ScrollView>
  );
}
