import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
  IPressableProps,
} from "native-base";
import { AdStatusTag } from "@components/AdStatusTag";

import productImg from "@assets/shoes.png";
import avatarImg from "@assets/man.png";

type Props = IPressableProps & {
  title: string;
  price: string;
  status: string;
};

export function AdCard({ title, price, status, ...rest }: Props) {
  return (
    <Pressable {...rest} w="50%">
      <VStack bgColor="gray.200" paddingBottom={2} rounded={6} m={2}>
        <Box>
          <Image
            source={productImg}
            alt="imagem do produto"
            width="full"
            rounded={6}
            position="relative"
            resizeMode="cover"
          />

          <HStack
            position="absolute"
            mt={1}
            w="full"
            alignItems="center"
            justifyContent="space-between"
            px={1}
          >
            <Center w={6} borderWidth={2} borderColor="white" rounded="full">
              <Image
                source={avatarImg}
                alt="imagem do usuário"
                size={6}
                rounded="full"
                resizeMode="cover"
              />
            </Center>

            <Box mt={-2}>
              <AdStatusTag title={status} />
            </Box>
          </HStack>
        </Box>

        <VStack mt={2}>
          <Text color="gray.600" fontSize="sm" numberOfLines={1}>
            {title}
          </Text>
          <Heading fontFamily="heading" color="gray.700" fontSize="xs">
            {price}
          </Heading>
        </VStack>
      </VStack>
    </Pressable>
  );
}
