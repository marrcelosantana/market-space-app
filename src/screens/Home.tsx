import { Highlight } from "@components/Highlight";
import { HomeHeader } from "@components/HomeHeader";
import { Input } from "@components/Input";
import { Box, Text, VStack } from "native-base";

export function Home() {
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

      <Input placeholder="Buscar cenário" />
    </VStack>
  );
}
