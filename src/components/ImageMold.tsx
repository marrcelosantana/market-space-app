import { Center, useTheme, IButtonProps, Pressable } from "native-base";
import { Plus } from "phosphor-react-native";

type Props = IButtonProps & {};

export function ImageMold({ ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable {...rest}>
      <Center w={24} h={24} rounded={6} bgColor="gray.300" mt={4}>
        <Plus size={24} color={colors.gray[400]} />
      </Center>
    </Pressable>
  );
}
