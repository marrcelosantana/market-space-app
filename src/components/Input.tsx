import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
  HStack,
} from "native-base";

import { ShowPassWordButton } from "./ShowPasswordButton";

type Props = IInputProps & {
  errorMessage?: string | null;
  isPasswordInput?: boolean;
  showPassword?: boolean;
  setShowpassword?: (bool: boolean) => void;
};

export function Input({
  errorMessage,
  isInvalid,
  isPasswordInput = false,
  showPassword,
  setShowpassword,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <HStack alignItems="center" justifyContent="center">
        <NativeBaseInput
          flex={1}
          h={45}
          rounded={0}
          bgColor="gray.100"
          borderWidth={0}
          fontSize="md"
          color="gray.600"
          fontFamily="body"
          placeholderTextColor="gray.400"
          _focus={{ borderWidth: "1px", borderColor: "blue.500" }}
          isInvalid={invalid}
          _invalid={{
            borderWidth: 1,
            borderColor: "red.500",
          }}
          {...rest}
        />
        {isPasswordInput && (
          <ShowPassWordButton onPress={() => setShowpassword(!showPassword)} />
        )}
      </HStack>

      <FormControl.ErrorMessage _text={{ color: "red.500" }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
