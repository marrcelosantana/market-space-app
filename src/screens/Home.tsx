import { HomeHeader } from "@components/HomeHeader";
import { Box, Text, VStack } from "native-base";

export function Home() {
  return (
    <VStack flex={1} px={6}>
      <Box pt={20}>
        <HomeHeader />
      </Box>

      <Text mt={10} mb={2} color="gray.500">
        Seus produtos anunciados para venda
      </Text>
    </VStack>
  );
}
