import { Center, HStack, Image, Pressable } from "native-base";
import avatarImg from "@assets/avatar.png";
import { PencilSimpleLine } from "phosphor-react-native";

type Props = {
  userPhoto: string;
  choosePhoto: () => void;
};

export function UserPhoto({ userPhoto, choosePhoto }: Props) {
  return (
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
        {userPhoto ? (
          <Image
            source={{ uri: userPhoto }}
            alt="foto do usuário"
            size={24}
            rounded="full"
          />
        ) : (
          <Image source={avatarImg} alt="avatar" size={24} rounded="full" />
        )}

        <Pressable
          w={10}
          h={10}
          rounded="full"
          alignItems="center"
          justifyContent="center"
          bgColor="blue.500"
          ml={-8}
          mt={12}
          onPress={choosePhoto}
        >
          <PencilSimpleLine size={22} color="#fff" />
        </Pressable>
      </HStack>
    </Center>
  );
}
