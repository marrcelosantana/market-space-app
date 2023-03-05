import { useCallback, useState } from "react";
import {
  VStack,
  Image,
  Text,
  ScrollView,
  Heading,
  Center,
  HStack,
  useToast,
  useTheme,
  Pressable,
} from "native-base";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import logoImg from "@assets/logo.png";
import { Eye, EyeSlash } from "phosphor-react-native";

import { Input } from "@components/Input";
import { ButtonLG } from "@components/ButtonLG";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, Controller } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";

type FormData = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required("Informe o email.").email("Email inválido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve conter pelo menos 6 dígitos."),
});

export function SignIn() {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const toast = useToast();
  const { colors } = useTheme();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useFocusEffect(
    useCallback(() => {
      reset({});
    }, [])
  );

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível logar.";

      setIsLoading(false);

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
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
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry={showPassword}
                  flex={1}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                  onSubmitEditing={handleSubmit(handleSignIn)}
                  returnKeyType="send"
                  rightElement={
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <Eye
                          size={22}
                          color={colors.gray[400]}
                          style={{ marginRight: 10 }}
                        />
                      ) : (
                        <EyeSlash
                          size={24}
                          color={colors.gray[400]}
                          style={{ marginRight: 10 }}
                        />
                      )}
                    </Pressable>
                  }
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
            isLoading={isLoading}
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
