import { Image, IImageProps } from "native-base";

type Props = IImageProps & {
  uri: string;
};

export function ImageFormPreview({ uri, ...rest }: Props) {
  return (
    <Image
      w={24}
      h={24}
      mr={2}
      mt={4}
      borderRadius={8}
      source={{ uri: uri }}
      alt="imagem do produto"
      resizeMode="cover"
      {...rest}
    />
  );
}
