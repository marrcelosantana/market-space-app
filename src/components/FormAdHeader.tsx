import { Heading, useTheme, HStack } from "native-base";
import { ArrowLeft } from "phosphor-react-native";
import { Pressable } from "react-native";

type Props = {
  title: string;
  handleGoBack: () => void;
};

export function FormAdHeader({ title, handleGoBack }: Props) {
  const { colors } = useTheme();

  return (
    <HStack alignItems="center" justifyContent="space-between" mt={20}>
      <Pressable onPress={handleGoBack}>
        <ArrowLeft size={24} color={colors[700]} />
      </Pressable>
      <Heading fontSize="lg" fontFamily="heading" mr={4}>
        {title}
      </Heading>
      <Heading />
    </HStack>
  );
}
