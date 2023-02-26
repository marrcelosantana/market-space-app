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

import { PencilSimpleLine } from "phosphor-react-native";

import logoImg from "@assets/logo.png";
import avatarImg from "@assets/avatar.png";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  phone: yup
    .string()
    .required("Informe o telefone")
    .min(9, "O telefone deve possuir no mínimo 9 dígitos.")
    .max(11, "O telefone deve possuir no máximo 11 dígitos."),
  email: yup.string().required("Informe o email.").email("Email inválido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve conter pelo menos 6 dígitos."),
  password_confirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password")], "As senhas estão diferentes."),
});

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signUpSchema),
  });

  function handleSignUp({
    name,
    email,
    phone,
    password,
    password_confirm,
  }: FormData) {
    console.log({ name, email, phone, password, password_confirm });
  }

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
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
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

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Telefone"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.phone?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
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

            <Controller
              control={control}
              name="password_confirm"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirmar senha"
                  secureTextEntry
                  flex={1}
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                  errorMessage={errors.password_confirm?.message}
                  isPasswordInput
                />
              )}
            />

            <ButtonLG
              title="Criar"
              bgColor="gray.700"
              textColor="white"
              mt={4}
              onPress={handleSubmit(handleSignUp)}
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
