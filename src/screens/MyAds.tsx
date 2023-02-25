import { useState } from "react";
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

export function MyAds() {
  const [adType, setAdType] = useState<string>();
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Tênis vermelho",
      price: "R$ 59,90",
      type: "usado",
      isActive: true,
    },
    {
      id: 2,
      title: "Tênis azul",
      price: "R$ 29,90",
      type: "novo",
      isActive: true,
    },
    {
      id: 3,
      title: "Tênis branco",
      price: "R$ 49,90",
      type: "novo",
      isActive: true,
    },
    {
      id: 4,
      title: "Tênis amarelo",
      price: "R$ 79,90",
      type: "usado",
      isActive: true,
    },
    {
      id: 5,
      title: "Tênis verde",
      price: "R$ 79,90",
      type: "novo",
      isActive: true,
    },
    {
      id: 6,
      title: "Tênis preto",
      price: "R$ 109,90",
      type: "usado",
      isActive: false,
    },
    {
      id: 7,
      title: "Tênis cinza",
      price: "R$ 119,90",
      type: "usado",
      isActive: false,
    },
  ]);

  const { colors } = useTheme();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

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
        data={products}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <AdCard
            title={item.title}
            price={item.price}
            type={item.type}
            isMine={true}
            isActive={item.isActive}
            onPress={() => navigation.navigate("my_ad_details")}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
