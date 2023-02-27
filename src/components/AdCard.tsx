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
import { ProductDTO } from "@models/ProductDTO";
import { priceFormatter } from "@utils/formatter";
import { api } from "@services/api";

type Props = IPressableProps & {
  product: ProductDTO;
  isActive?: boolean;
};

export function AdCard({ product, ...rest }: Props) {
  return (
    <Pressable {...rest} w="50%">
      <VStack bgColor={"gray.200"} paddingBottom={2} rounded={6} m={2}>
        <Box>
          <Image
            source={{
              uri: `${api.defaults.baseURL}/images/${product.product_images[0].path}`,
            }}
            alt="imagem do produto"
            width="full"
            h={24}
            rounded={6}
            position="relative"
            resizeMode="cover"
            style={product.is_active === false && { opacity: 0.4 }}
          />

          <HStack
            position="absolute"
            mt={1}
            w="full"
            alignItems="center"
            justifyContent="space-between"
            px={1}
          >
            <Avatar
              borderColor="white"
              uri={`${api.defaults.baseURL}/images/${product.user.avatar}`}
            />

            <Box
              mt={-2}
              style={product.is_active === false && { opacity: 0.4 }}
            >
              <AdStatusTag title={product.is_new ? "novo" : "usado"} />
            </Box>
          </HStack>

          {product.is_active === false && (
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
            {product.name}
          </Text>
          <Heading fontFamily="heading" color="gray.700" fontSize="xs">
            {priceFormatter.format(product.price / 100)}
          </Heading>
        </VStack>
      </VStack>
    </Pressable>
  );
}
