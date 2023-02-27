import { Center, Image } from "native-base";

type Props = {
  borderColor?: string;
  uri: string;
};

export function Avatar({ borderColor, uri }: Props) {
  return (
    <Center w={8} borderWidth={2} rounded="full" borderColor={borderColor}>
      <Image
        source={{ uri: uri }}
        alt="imagem do usuário"
        size={8}
        rounded="full"
        resizeMode="cover"
      />
    </Center>
  );
}
