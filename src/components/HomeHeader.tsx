import { Center, Heading, HStack, Image, Text, VStack } from "native-base";
import { ButtonMD } from "@components/ButtonMD";
import avatarImg from "@assets/man.png";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function HomeHeader() {
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
            source={avatarImg}
            alt="avatar"
            size="44px"
            resizeMode="cover"
            rounded="full"
          />
        </Center>

        <VStack ml={2}>
          <Text fontSize="md">Boas vindas,</Text>
          <Heading fontFamily="heading" fontSize="md">
            Marcelo!
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
