import { Center, Heading, HStack, Image, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ButtonMD } from "@components/ButtonMD";
import avatarImg from "@assets/avatar.png";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";

export function HomeHeader() {
  const { user } = useAuth();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  return (
    <HStack w="full" alignItems="center" justifyContent="space-between">
      <HStack>
        <Center
          w={12}
          h={12}
          rounded="full"
          borderWidth={2}
          borderColor="blue.500"
        >
          <Image
            source={
              user.avatar
                ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` }
                : avatarImg
            }
            alt="avatar"
            size="44px"
            resizeMode="cover"
            rounded="full"
          />
        </Center>

        <VStack ml={2}>
          <Text fontSize="md">Boas vindas,</Text>
          <Heading fontFamily="heading" fontSize="md" numberOfLines={1}>
            {user.name}!
          </Heading>
        </VStack>
      </HStack>

      <ButtonMD
        bgColor="gray.700"
        title="Criar anúncio"
        textColor="white"
        iconName="plus"
        iconColor="white"
        onPress={() => {
          navigation.navigate("create");
        }}
      />
    </HStack>
  );
}
