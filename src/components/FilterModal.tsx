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
  isNew: boolean;
  acceptTrade: boolean;
  payMethods: string[];

  setModalVisible: (bool: boolean) => void;
  setIsNew: (bool: boolean) => void;
  setAcceptTrade: (bool: boolean) => void;
  setPayMethods: (str: string[]) => void;

  applyFilters: () => Promise<void>;
  resetFilters: () => Promise<void>;
};

export function FilterModal({
  modalVisible,
  isNew,
  acceptTrade,
  payMethods,
  setModalVisible,
  setIsNew,
  setAcceptTrade,
  setPayMethods,
  applyFilters,
  resetFilters,
}: Props) {
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

              <Radio.Group
                name="radio"
                accessibilityLabel="tipo de produto"
                value={isNew ? "new" : "used"}
                onChange={(nextValue) => {
                  setIsNew(nextValue === "new" ? true : false);
                }}
              >
                <HStack>
                  <Radio value="new" colorScheme="gray">
                    <Text fontSize="md" color="gray.600" mr={2}>
                      Produto novo
                    </Text>
                  </Radio>
                  <Radio value="used" colorScheme="gray">
                    <Text fontSize="md" color="gray.600">
                      Produto usado
                    </Text>
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
                onToggle={(value) => setAcceptTrade(value)}
                value={acceptTrade}
              />
            </VStack>

            <VStack mt={4} mb={8}>
              <Text color="gray.600" fontFamily="heading" mb={2}>
                Métodos de pagamento aceitos
              </Text>

              <Checkbox.Group onChange={setPayMethods} value={payMethods}>
                <Checkbox value="boleto" my={1} colorScheme="gray">
                  <Text>Boleto</Text>
                </Checkbox>
                <Checkbox value="pix" my={1} colorScheme="gray">
                  <Text>Pix</Text>
                </Checkbox>
                <Checkbox value="cash" my={1} colorScheme="gray">
                  <Text>Dinheiro</Text>
                </Checkbox>
                <Checkbox value="card" my={1} colorScheme="gray">
                  <Text>Cartão de Crédito</Text>
                </Checkbox>
                <Checkbox value="deposit" my={1} colorScheme="gray">
                  <Text>Depósito Bancário</Text>
                </Checkbox>
              </Checkbox.Group>
            </VStack>

            <HStack mb={6} alignItems="center" justifyContent="space-around">
              <ButtonMD title="Resetar Filtros" onPress={resetFilters} />
              <ButtonMD
                title="Aplicar Filtros"
                bgColor="gray.700"
                textColor="gray.100"
                onPress={applyFilters}
              />
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
