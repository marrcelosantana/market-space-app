import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";

export function ShowPassWordButton({ ...rest }: IButtonProps) {
  return (
    <ButtonNativeBase
      width={45}
      h={45}
      alignItems="center"
      justifyContent="center"
      bgColor="gray.100"
      rounded={0}
      {...rest}
    >
      <AntDesign name="eyeo" size={24} color="#9F9BA1" />
    </ButtonNativeBase>
  );
}
