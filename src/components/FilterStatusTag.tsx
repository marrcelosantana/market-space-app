import { HStack, Text, Pressable, IPressableProps } from "native-base";
import { AntDesign } from "@expo/vector-icons/";

type Props = IPressableProps & {
  title: string;
  isSelected?: boolean;
};

export function FilterStatusTag({ title, isSelected = false, ...rest }: Props) {
  return (
    <Pressable {...rest}>
      <HStack
        alignItems="center"
        justifyContent="center"
        bgColor={isSelected ? "blue.500" : "gray.300"}
        rounded="full"
        px={4}
        py={2}
      >
        <Text
          textTransform="uppercase"
          color={isSelected ? "gray.100" : "gray.600"}
          fontSize="xs"
          fontFamily="heading"
        >
          {title}
        </Text>

        {isSelected && (
          <Pressable>
            <AntDesign
              name="closecircle"
              size={14}
              color="white"
              style={{ marginLeft: 5 }}
            />
          </Pressable>
        )}
      </HStack>
    </Pressable>
  );
}
