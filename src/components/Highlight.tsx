import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Heading, HStack, VStack, Text, useTheme, useToast } from "native-base";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ArrowRight, Tag } from "phosphor-react-native";

import { ProductDTO } from "@models/ProductDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

export function Highlight() {
  const { colors } = useTheme();
  const toast = useToast();

  const [userProducts, setUserProducts] = useState<ProductDTO[]>([]);
  const [activeProducts, setActiveProducts] = useState(0);

  async function loadUserProducts() {
    try {
      const response = await api.get("users/products");
      setUserProducts(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível logar.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  function findActiveProducts() {
    const data = userProducts.filter(
      (product) => product.is_active === true
    ).length;
    setActiveProducts(data);
  }

  useEffect(() => {
    loadUserProducts();
    findActiveProducts();
  }, [userProducts, activeProducts]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  return (
    <HStack
      w="full"
      bgColor="blue.100"
      py={3}
      px={4}
      alignItems="center"
      justifyContent="space-between"
      rounded={6}
    >
      <HStack alignItems="center" justifyContent="space-between">
        <Tag size={22} color={colors.blue[700]} />
        <VStack ml={3}>
          <Heading fontFamily="heading" fontSize="lg" color="gray.600">
            {activeProducts}
          </Heading>
          <Text fontSize="xs" color="gray.600">
            anúncios ativos
          </Text>
        </VStack>
      </HStack>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("myAds");
        }}
      >
        <HStack alignItems="center" justifyContent="center">
          <Text marginRight={1} color="blue.700" fontFamily="heading">
            Meus anúncios
          </Text>
          <ArrowRight size={16} color={colors.blue[700]} />
        </HStack>
      </TouchableOpacity>
    </HStack>
  );
}
