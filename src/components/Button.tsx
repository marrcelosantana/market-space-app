import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
  bgColor?: string;
  textColor?: string;
};

export function Button({
  title,
  bgColor = "gray.300",
  textColor = "gray.700",
  ...rest
}: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h="48px"
      alignItems="center"
      justifyContent="center"
      bgColor={bgColor}
      rounded={6}
      {...rest}
    >
      <Text color={textColor} fontFamily="heading">
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
