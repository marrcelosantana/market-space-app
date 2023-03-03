import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
  HStack,
} from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
};

export function Input({ errorMessage, isInvalid, ...rest }: Props) {
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
      </HStack>

      <FormControl.ErrorMessage _text={{ color: "red.500" }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
