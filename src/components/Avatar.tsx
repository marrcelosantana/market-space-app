import { Center, Image } from "native-base";

import avatarImg from "@assets/man.png";

type Props = {
  borderColor?: string;
};

export function Avatar({ borderColor }: Props) {
  return (
    <Center w={6} borderWidth={2} rounded="full" borderColor={borderColor}>
      <Image
        source={avatarImg}
        alt="imagem do usuário"
        size={6}
        rounded="full"
        resizeMode="cover"
      />
    </Center>
  );
}
