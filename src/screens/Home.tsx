import { HomeHeader } from "@components/HomeHeader";
import { Box, Center, Text, VStack } from "native-base";

export function Home() {
  return (
    <VStack flex={1} px={6}>
      <Box pt={20}>
        <HomeHeader />
      </Box>
    </VStack>
  );
}
