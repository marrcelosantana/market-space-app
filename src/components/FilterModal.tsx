import { useState } from "react";
import {
  Checkbox,
  HStack,
  Modal,
  Radio,
  Switch,
  Text,
  VStack,
} from "native-base";

import { ButtonMD } from "@components/ButtonMD";

type Props = {
  modalVisible: boolean;
  setModalVisible: (bool: boolean) => void;
};

export function FilterModal({ modalVisible, setModalVisible }: Props) {
  const [groupValues, setGroupValues] = useState([]);
  const [isNew, setIsNew] = useState(true);
  const [acceptTrade, setAcceptTrade] = useState(true);
  const [payMethods, setPayMethods] = useState<string[]>([
    "cash",
    "pix",
    "card",
    "boleto",
    "deposit",
  ]);

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        justifyContent="flex-end"
        size="full"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            <Text color="gray.700" fontFamily="heading" fontSize="lg">
              Filtrar anúncios
            </Text>
          </Modal.Header>

          <Modal.Body px={6}>
            <VStack>
              <Text color="gray.600" fontFamily="heading" mb={2}>
                Condição
              </Text>

              <Radio.Group name="condition" colorScheme="gray">
                <HStack>
                  <Radio value="new" size="sm">
                    <Text>Novo</Text>
                  </Radio>

                  <Radio value="used" size="sm" ml={4}>
                    <Text>Usado</Text>
                  </Radio>
                </HStack>
              </Radio.Group>
            </VStack>

            <VStack mt={4}>
              <Text color="gray.600" fontFamily="heading" mb={2}>
                Aceita troca?
              </Text>

              <Switch
                offTrackColor="indigo.100"
                onTrackColor="indigo.200"
                onThumbColor="indigo.500"
                offThumbColor="indigo.50"
              />
            </VStack>

            <VStack mt={4} mb={8}>
              <Text color="gray.600" fontFamily="heading" mb={2}>
                Métodos de pagamento aceitos
              </Text>

              <Checkbox.Group onChange={setGroupValues} value={groupValues}>
                <Checkbox value="ticket" my={1} colorScheme="gray">
                  <Text>Boleto</Text>
                </Checkbox>
                <Checkbox value="pix" my={1} colorScheme="gray">
                  <Text>Pix</Text>
                </Checkbox>
                <Checkbox value="money" my={1} colorScheme="gray">
                  <Text>Dinheiro</Text>
                </Checkbox>
                <Checkbox value="credit-card" my={1} colorScheme="gray">
                  <Text>Cartão de Crédito</Text>
                </Checkbox>
                <Checkbox value="deposit" my={1}>
                  <Text>Depósito Bancário</Text>
                </Checkbox>
              </Checkbox.Group>
            </VStack>

            <HStack mb={6} alignItems="center" justifyContent="space-around">
              <ButtonMD title="Resetar Filtros" />
              <ButtonMD
                title="Aplicar Filtros"
                bgColor="gray.700"
                textColor="gray.100"
              />
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
