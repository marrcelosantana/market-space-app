import { Button as ButtonNativeBase, IButtonProps } from "native-base";
import { Eye } from "phosphor-react-native";

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
      <Eye size={24} color="#9F9BA1" />
    </ButtonNativeBase>
  );
}
