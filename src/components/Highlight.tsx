import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Heading, HStack, VStack, Text, useTheme } from "native-base";
import { ArrowRight, Tag } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

export function Highlight() {
  const { colors } = useTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

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
            4
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
