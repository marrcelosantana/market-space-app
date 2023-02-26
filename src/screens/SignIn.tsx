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

import { useForm, Controller } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({});

  function handleSignIn({ email, password }: FormData) {
    console.log({ email, password });
  }

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

          <Controller
            control={control}
            name="email"
            rules={{ required: "Informe o email." }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <HStack width="full">
            <Controller
              control={control}
              name="password"
              rules={{ required: "Informe a senha." }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  flex={1}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                  isPasswordInput
                />
              )}
            />
          </HStack>

          <ButtonLG
            title="Acessar"
            bgColor="blue.500"
            textColor="gray.100"
            mt={4}
            onPress={handleSubmit(handleSignIn)}
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
