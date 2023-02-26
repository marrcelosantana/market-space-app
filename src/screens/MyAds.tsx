import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
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
} from "native-base";

import { Plus } from "phosphor-react-native";
import { AdCard } from "@components/AdCard";

import { useUserProducts } from "@hooks/useUserProducts";

export function MyAds() {
  const [adType, setAdType] = useState<string>();

  const { colors } = useTheme();
  const { userProducts, loadUserProducts } = useUserProducts();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  useEffect(() => {
    loadUserProducts();
  }, [userProducts]);

  return (
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

      <HStack mt={8} alignItems="center" justifyContent="space-between" mb={4}>
        <Text fontSize="md" color="gray.600">
          9 anúncios
        </Text>

        <Select
          selectedValue={adType}
          minWidth="111"
          fontSize="sm"
          accessibilityLabel="Filtrar..."
          placeholder="Filtrar..."
          _selectedItem={{
            bg: "gray.200",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(value) => setAdType(value)}
        >
          <Select.Item label="Todos" value="all" />
          <Select.Item label="Ativos" value="active" />
          <Select.Item label="Inativos" value="inactive" />
        </Select>
      </HStack>

      <FlatList
        data={userProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // <AdCard
          //   product={item}
          //   onPress={() => navigation.navigate("my_ad_details")}
          // />
          <Text>{item.name}</Text>
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
