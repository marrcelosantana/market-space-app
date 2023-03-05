import { useState } from "react";
import {
  VStack,
  Image,
  Text,
  ScrollView,
  Heading,
  Center,
  useToast,
  Pressable,
  useTheme,
} from "native-base";

import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Input } from "@components/Input";
import { ButtonLG } from "@components/ButtonLG";
import { UserPhoto } from "@components/UserPhoto";

import logoImg from "@assets/logo.png";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useAuth } from "@hooks/useAuth";
import { Eye, EyeSlash } from "phosphor-react-native";

type UserPhotoProps = {
  photo: {
    uri: string;
    name: string;
    type: string;
  };
};

type FormData = {
  name: string;
  email: string;
  tel: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup
    .string()
    .required("Informe o nome.")
    .max(15, "Limite máximo de 15 caracteres."),
  tel: yup
    .string()
    .required("Informe o telefone")
    .min(9, "O telefone deve possuir no mínimo 9 dígitos.")
    .max(14, "O telefone deve possuir no máximo 14 dígitos."),
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
  const [userPhoto, setUserPhoto] = useState({} as UserPhotoProps);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();
  const { colors } = useTheme();

  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signUpSchema),
  });

  async function handleUserPhotoSelect() {
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    });

    if (photoSelected.canceled) {
      return;
    }

    if (photoSelected.assets[0].uri) {
      const photoInfo = await FileSystem.getInfoAsync(
        photoSelected.assets[0].uri
      );

      if (photoInfo.size && photoInfo.size / 1024 / 1024 > 8) {
        return toast.show({
          title: "Essa imagem é muito grande. Escolha uma de até 8MB.",
          placement: "top",
          bgColor: "red.500",
        });
      }

      const fileExtension = photoSelected.assets[0].uri.split(".").pop();

      const photoFile = {
        name: `${fileExtension}`.toLowerCase(),
        uri: photoSelected.assets[0].uri,
        type: `${photoSelected.assets[0].type}/${fileExtension}`,
      } as any;

      setUserPhoto({
        photo: { ...photoFile },
      });

      toast.show({
        title: "Foto selecionada!",
        placement: "top",
        bgColor: "green.500",
      });
    }
  }

  async function handleSignUp({ name, email, tel, password }: FormData) {
    try {
      const userForm = new FormData();

      const userImage: any = {
        ...userPhoto.photo,
        name: `${name}.${userPhoto.photo.name}`.toLowerCase(),
      };

      userForm.append("avatar", userImage);
      userForm.append("name", name);
      userForm.append("email", email);
      userForm.append("tel", tel);
      userForm.append("password", password);

      setIsLoading(true);

      await api.post("/users", userForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.show({
        title: "Usuário cadastrado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possivel criar a conta.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
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

          <UserPhoto
            userPhoto={userPhoto.photo?.uri}
            choosePhoto={handleUserPhotoSelect}
          />

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
                  rounded={6}
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
                  rounded={6}
                />
              )}
            />

            <Controller
              control={control}
              name="tel"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Telefone"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.tel?.message}
                  rounded={6}
                />
              )}
            />

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
                  rounded={6}
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
                          size={22}
                          color={colors.gray[400]}
                          style={{ marginRight: 10 }}
                        />
                      )}
                    </Pressable>
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="password_confirm"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirmar senha"
                  secureTextEntry={showConfirmPassword}
                  flex={1}
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                  errorMessage={errors.password_confirm?.message}
                  rounded={6}
                  rightElement={
                    <Pressable
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <Eye
                          size={22}
                          color={colors.gray[400]}
                          style={{ marginRight: 10 }}
                        />
                      ) : (
                        <EyeSlash
                          size={22}
                          color={colors.gray[400]}
                          style={{ marginRight: 10 }}
                        />
                      )}
                    </Pressable>
                  }
                />
              )}
            />

            <ButtonLG
              title="Criar"
              bgColor="gray.700"
              textColor="white"
              mt={4}
              onPress={handleSubmit(handleSignUp)}
              isLoading={isLoading}
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
