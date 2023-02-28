import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import {
  Heading,
  HStack,
  Pressable,
  Text,
  useTheme,
  VStack,
  Select,
  CheckIcon,
  FlatList,
  Center,
} from "native-base";

import { Plus, SmileyXEyes } from "phosphor-react-native";

import { MyAdCard } from "@components/MyAdCard";
import { Loading } from "@components/Loading";

import { useProducts } from "@hooks/useProducts";

export function MyAds() {
  const { colors } = useTheme();
  const { userProducts, loadUserProducts, isLoadingProducts } = useProducts();

  const [adStatusType, setAdStatusType] = useState<string>("default");

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenMyAdDetails(productId: string) {
    navigation.navigate("my_ad_details", { productId });
  }

  const filteredList = userProducts.filter((item) => {
    switch (adStatusType) {
      case "active":
        return item.is_active === true;
      case "inactive":
        return item.is_active === false;
      default:
        return userProducts;
    }
  });

  useFocusEffect(
    useCallback(() => {
      loadUserProducts();
    }, [])
  );

  return (
    <>
      {isLoadingProducts ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8} mt={8}>
          <HStack mt={12} alignItems="center" justifyContent="space-between">
            <Text />
            <Heading fontFamily="heading" fontSize="lg" ml={3}>
              Meus anúncios
            </Heading>
            <Pressable onPress={() => navigation.navigate("create")}>
              <Plus size={24} color={colors.gray[700]} />
            </Pressable>
          </HStack>

          <HStack
            mt={8}
            alignItems="center"
            justifyContent="space-between"
            mb={4}
          >
            <Text fontSize="md" color="gray.600">
              {filteredList.length} anúncio(s)
            </Text>

            <Select
              selectedValue={adStatusType}
              minWidth="111"
              fontSize="sm"
              accessibilityLabel="Filtrar..."
              placeholder="Filtrar..."
              _selectedItem={{
                bg: "gray.200",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(value) => setAdStatusType(value)}
              isDisabled={userProducts.length === 0}
            >
              <Select.Item label="Todos" value="default" />
              <Select.Item label="Ativos" value="active" />
              <Select.Item label="Inativos" value="inactive" />
            </Select>
          </HStack>

          <FlatList
            data={filteredList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MyAdCard
                product={item}
                onPress={() => handleOpenMyAdDetails(item.id)}
              />
            )}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[filteredList.length === 0 && { flex: 1 }]}
            ListEmptyComponent={() => (
              <Center flex={1}>
                <SmileyXEyes size={62} color={colors.gray[500]} />
                <Text fontSize="md" color="gray.500">
                  Sem anúncios para mostrar.
                </Text>
              </Center>
            )}
          />
        </VStack>
      )}
    </>
  );
}
