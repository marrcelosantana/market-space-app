import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Heading, HStack, VStack, Text, useTheme } from "native-base";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { ArrowRight, Tag } from "phosphor-react-native";
import { useProducts } from "@hooks/useProducts";
import { TabNavigatorRoutesProps } from "@routes/tab.routes";

export function Highlight() {
  const { userProducts, loadUserProducts } = useProducts();
  const [activeProducts, setActiveProducts] = useState(0);

  const { colors } = useTheme();

  function findActiveProducts() {
    const data = userProducts.filter(
      (product) => product.is_active === true
    ).length;
    setActiveProducts(data);
  }

  useFocusEffect(
    useCallback(() => {
      loadUserProducts();
    }, [])
  );

  useEffect(() => {
    findActiveProducts();
  }, [userProducts]);

  const navigation = useNavigation<TabNavigatorRoutesProps>();

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
