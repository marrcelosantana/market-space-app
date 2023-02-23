import {
  Button as ButtonNativeBase,
  HStack,
  IButtonProps,
  Text,
} from "native-base";

import { Feather } from "@expo/vector-icons";

type Props = IButtonProps & {
  title: string;
  bgColor?: string;
  textColor?: string;
  iconName?: any;
  iconColor?: string;
};

export function ButtonLG({
  title,
  bgColor = "gray.300",
  textColor = "gray.700",
  iconName,
  iconColor,
  ...rest
}: Props) {
  return (
    <ButtonNativeBase w="full" h={12} bgColor={bgColor} rounded={6} {...rest}>
      <HStack alignItems="center" justifyContent="center">
        {iconName && (
          <Feather
            name={iconName}
            color={iconColor}
            size={16}
            style={{ marginRight: 10 }}
          />
        )}
        <Text color={textColor} fontFamily="heading">
          {title}
        </Text>
      </HStack>
    </ButtonNativeBase>
  );
}
