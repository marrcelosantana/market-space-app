import { Center, useTheme } from "native-base";
import { Plus } from "phosphor-react-native";

export function ImageMold() {
  const { colors } = useTheme();

  return (
    <Center w={24} h={24} rounded={6} bgColor="gray.300" mt={4}>
      <Plus size={24} color={colors.gray[400]} />
    </Center>
  );
}
