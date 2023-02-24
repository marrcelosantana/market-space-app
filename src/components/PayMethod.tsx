import { Box, HStack, Text, useTheme } from "native-base";
import {
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
} from "phosphor-react-native";

type Props = {
  type: string;
};

export function PayMethod({ type }: Props) {
  const { colors } = useTheme();

  return (
    <Box>
      {type === "ticket" && (
        <HStack alignItems="center" mb={1}>
          <Barcode size={18} color={colors.gray[600]} />
          <Text ml={2}>Boleto</Text>
        </HStack>
      )}

      {type === "pix" && (
        <HStack alignItems="center" mb={1}>
          <QrCode size={18} color={colors.gray[600]} />
          <Text ml={2}>Pix</Text>
        </HStack>
      )}

      {type === "money" && (
        <HStack alignItems="center" mb={1}>
          <Money size={18} color={colors.gray[600]} />
          <Text ml={2}>Dinheiro</Text>
        </HStack>
      )}

      {type === "credit-card" && (
        <HStack alignItems="center" mb={1}>
          <CreditCard size={18} color={colors.gray[600]} />
          <Text ml={2}>Cartão de Crédito</Text>
        </HStack>
      )}

      {type === "deposit" && (
        <HStack alignItems="center" mb={1}>
          <Bank size={18} color={colors.gray[600]} />
          <Text ml={2}>Depósito Bancário</Text>
        </HStack>
      )}
    </Box>
  );
}
