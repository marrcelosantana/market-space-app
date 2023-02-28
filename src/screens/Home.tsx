import { useEffect, useState } from "react";
import {
  Box,
  Center,
  FlatList,
  HStack,
  Input,
  Pressable,
  Text,
  useTheme,
  useToast,
  VStack,
} from "native-base";

import { AdCard } from "@components/AdCard";
import { Highlight } from "@components/Highlight";
import { HomeHeader } from "@components/HomeHeader";

import { MagnifyingGlass, Sliders, SmileyXEyes } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { FilterModal } from "@components/FilterModal";

import { Loading } from "@components/Loading";
import { useProducts } from "@hooks/useProducts";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppError } from "@utils/AppError";

type FormData = {
  query: string;
};

const searchSchema = yup.object({
  query: yup.string().required("Informe a busca."),
});

export function Home() {
  const [modalVisible, setModalVisible] = useState(false);

  const { colors } = useTheme();
  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { products, loadProducts, isLoadingProducts } = useProducts();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(searchSchema),
  });

  function handleOpenCard(productId: string) {
    navigation.navigate("details", { productId });
  }

  async function handleSearch({ query }: FormData) {
    try {
      await loadProducts(query);
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

  useEffect(() => {
    loadProducts();
  }, []);

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
        <Controller
          name="query"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              onChangeText={onChange}
              value={value}
              placeholder="Buscar um anúncio"
              flex={1}
              h={45}
              mb={2}
              fontSize="md"
              rounded={0}
              bgColor="gray.100"
              borderWidth={0}
              color="gray.600"
              fontFamily="body"
              placeholderTextColor="gray.400"
              _focus={{ borderWidth: "1px", borderColor: "blue.500" }}
            />
          )}
        />

        <Pressable
          alignItems="center"
          justifyContent="center"
          bgColor="gray.100"
          h={45}
          px={2}
          onPress={handleSubmit(handleSearch)}
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

      {isLoadingProducts ? (
        <Loading />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AdCard product={item} onPress={() => handleOpenCard(item.id)} />
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
