import {
  Box,
  Heading,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
  IPressableProps,
} from "native-base";

import { AdStatusTag } from "@components/AdStatusTag";
import { Avatar } from "@components/Avatar";

import productImg from "@assets/shoes.png";

type Props = IPressableProps & {
  title: string;
  price: string;
  type: string;
  isActive?: boolean;
  isMine?: boolean;
};

export function AdCard({
  title,
  price,
  type,
  isActive = true,
  isMine = false,
  ...rest
}: Props) {
  return (
    <Pressable {...rest} w="50%">
      <VStack bgColor={"gray.200"} paddingBottom={2} rounded={6} m={2}>
        <Box>
          <Image
            source={productImg}
            alt="imagem do produto"
            width="full"
            rounded={6}
            position="relative"
            resizeMode="cover"
            style={isActive === false && { opacity: 0.4 }}
          />

          <HStack
            position="absolute"
            mt={1}
            w="full"
            alignItems="center"
            justifyContent="space-between"
            px={1}
          >
            {isMine === false && <Avatar borderColor="white" />}

            <Box
              mt={isMine === false && -2}
              style={isActive === false && { opacity: 0.4 }}
            >
              <AdStatusTag title={type} />
            </Box>
          </HStack>

          {isActive === false && (
            <Text
              position="absolute"
              mt={20}
              color="gray.600"
              fontSize={12}
              fontFamily="heading"
              style={{ marginLeft: 12 }}
            >
              ANÚNCIO DESATIVADO
            </Text>
          )}
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
