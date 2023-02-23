import {
  Button as ButtonNativeBase,
  HStack,
  IButtonProps,
  Text,
} from "native-base";

import { AntDesign } from "@expo/vector-icons";

type Props = IButtonProps & {
  title: string;
  bgColor?: string;
  textColor?: string;
  iconName?: any;
  iconColor?: string;
};

export function ButtonMD({
  title,
  bgColor = "gray.300",
  textColor = "gray.700",
  iconName,
  iconColor,
  ...rest
}: Props) {
  return (
    <ButtonNativeBase w="140px" h={10} bgColor={bgColor} rounded={6} {...rest}>
      <HStack alignItems="center" justifyContent="center">
        {iconName && <AntDesign name={iconName} size={14} color={iconColor} />}
        <Text
          color={textColor}
          fontFamily="heading"
          fontSize="sm"
          marginLeft={1}
        >
          {title}
        </Text>
      </HStack>
    </ButtonNativeBase>
  );
}
