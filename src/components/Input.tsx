import { Input as NativeBaseInput, IInputProps } from "native-base";

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      h={45}
      rounded={0}
      bgColor="gray.100"
      borderWidth={0}
      fontSize="md"
      color="gray.600"
      fontFamily="body"
      mb={4}
      placeholderTextColor="gray.400"
      _focus={{ borderWidth: "1px", borderColor: "blue.500" }}
      {...rest}
    />
  );
}
