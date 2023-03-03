import { useCallback, useState } from "react";
import { Keyboard } from "react-native";

import {
  Box,
  Center,
  FlatList,
  HStack,
  Pressable,
  Text,
  useTheme,
  useToast,
  VStack,
} from "native-base";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { AdCard } from "@components/AdCard";
import { Highlight } from "@components/Highlight";
import { HomeHeader } from "@components/HomeHeader";
import { FilterModal } from "@components/FilterModal";
import { Loading } from "@components/Loading";
import { Input } from "@components/Input";

import {
  ArrowClockwise,
  MagnifyingGlass,
  Sliders,
  SmileyXEyes,
} from "phosphor-react-native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import { useProducts } from "@hooks/useProducts";

export function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  const { products, loadProducts, isLoadingProducts } = useProducts();

  const { colors } = useTheme();
  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenCard(productId: string) {
    navigation.navigate("details", { productId });
  }

  async function handleSearch(query: string) {
    try {
      await loadProducts(query);
      Keyboard.dismiss();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os dados.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  async function handleRefresh() {
    try {
      await loadProducts();
      setSearch("");
      Keyboard.dismiss();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os dados.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

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
        <Input
          onChangeText={(search) => setSearch(search)}
          px={0}
          value={search}
          placeholder="Buscar um anúncio"
          leftElement={
            <Pressable
              alignItems="center"
              justifyContent="center"
              bgColor="gray.100"
              h={45}
              px={2}
              onPress={handleRefresh}
            >
              <ArrowClockwise size={20} color={colors.gray[600]} />
            </Pressable>
          }
          rightElement={
            <HStack>
              <Pressable
                alignItems="center"
                justifyContent="center"
                bgColor="gray.100"
                h={45}
                px={2}
                onPress={() => handleSearch(search)}
                disabled={search.length === 0}
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
          }
        />
      </HStack>

      {isLoadingProducts ? (
        <Loading />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AdCard
              product={item}
              onPress={() => handleOpenCard(item.id)}
              key={item.id}
            />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[products.length === 0 && { flex: 1 }]}
          ListEmptyComponent={() => (
            <Center flex={1}>
              <SmileyXEyes size={62} color={colors.gray[500]} />
              <Text fontSize="md" color="gray.500">
                Sem anúncios para mostrar.
              </Text>
            </Center>
          )}
        />
      )}

      <FilterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </VStack>
  );
}
