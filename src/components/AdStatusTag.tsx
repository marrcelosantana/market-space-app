import { Center, Text } from "native-base";

type Props = {
  title?: string;
};

export function AdStatusTag({ title = "usado" }: Props) {
  return (
    <Center
      bgColor={title === "usado" ? "gray.600" : "blue.700"}
      rounded="full"
      px={1}
      w={12}
    >
      <Text
        color="white"
        textTransform="uppercase"
        fontSize="10px"
        fontFamily="heading"
      >
        {title}
      </Text>
    </Center>
  );
}
