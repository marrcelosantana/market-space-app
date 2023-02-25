import { TextArea as NativeBaseTextArea, ITextAreaProps } from "native-base";

export function TextArea({ ...rest }: ITextAreaProps) {
  return (
    <NativeBaseTextArea
      h={40}
      rounded={6}
      bgColor="gray.100"
      borderWidth={0}
      fontSize="md"
      color="gray.600"
      fontFamily="body"
      mb={4}
      placeholderTextColor="gray.400"
      _focus={{ borderWidth: "1px", borderColor: "blue.500" }}
      autoCompleteType
      numberOfLines={5}
      {...rest}
    />
  );
}
