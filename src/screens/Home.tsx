import { useState } from "react";
import {
  Box,
  FlatList,
  HStack,
  Pressable,
  Text,
  useTheme,
  VStack,
} from "native-base";

import { AdCard } from "@components/AdCard";
import { Highlight } from "@components/Highlight";
import { HomeHeader } from "@components/HomeHeader";
import { Input } from "@components/Input";

import { MagnifyingGlass, Sliders } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { FilterModal } from "@components/FilterModal";

export function Home() {
  const [products, setProducts] = useState([
    { id: 1, title: "Tênis vermelho", price: "R$ 59,90", type: "usado" },
    { id: 2, title: "Tênis azul", price: "R$ 29,90", type: "novo" },
    { id: 3, title: "Tênis branco", price: "R$ 49,90", type: "novo" },
    { id: 4, title: "Tênis amarelo", price: "R$ 79,90", type: "usado" },
    { id: 5, title: "Tênis verde", price: "R$ 79,90", type: "novo" },
    { id: 6, title: "Tênis preto", price: "R$ 79,90", type: "usado" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const { colors } = useTheme();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenCard() {
    navigation.navigate("details");
  }

  return (
    <VStack flex={1} px={6}>
      <Box pt={20}>
        <HomeHeader />
      </Box>

      <Text mt={10} mb={3} color="gray.500">
        Seus produtos anunciados para venda
      </Text>

      <Highlight />

      <Text mt={10} mb={3} color="gray.500">
        Compre produtos variados
      </Text>

      <HStack>
        <Input placeholder="Buscar anúncio" flex={1} />
        <Pressable
          alignItems="center"
          justifyContent="center"
          bgColor="gray.100"
          h={45}
          px={2}
        >
          <MagnifyingGlass size={20} color={colors.gray[600]} />
        </Pressable>

        <Pressable
          alignItems="center"
          justifyContent="center"
          bgColor="gray.100"
          h={45}
          px={2}
          onPress={() => setModalVisible(true)}
        >
          <Sliders size={20} color={colors.gray[600]} />
        </Pressable>
      </HStack>

      <FlatList
        data={products}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <AdCard
            title={item.title}
            price={item.price}
            type={item.type}
            onPress={handleOpenCard}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />

      <FilterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </VStack>
  );
}
