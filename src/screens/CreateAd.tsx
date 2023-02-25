import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import {
  Checkbox,
  Heading,
  HStack,
  Radio,
  ScrollView,
  Switch,
  Text,
  VStack,
} from "native-base";

import { FormAdHeader } from "@components/FormAdHeader";
import { ImageMold } from "@components/ImageMold";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { ButtonMD } from "@components/ButtonMD";

export function CreateAd() {
  const [value, setValue] = useState("one");
  const [groupValues, setGroupValues] = useState([]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  return (
    <VStack flex={1}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack flex={1} px={8}>
          <FormAdHeader
            title="Criar anúncio"
            handleGoBack={() => navigation.goBack()}
          />

          <VStack mt={8}>
            <Heading fontSize="md" fontFamily="heading" color="gray.600">
              Imagens
            </Heading>

            <Text color="gray.600" fontSize="sm" mt={2}>
              Escolha até 3 imagens para mostrar o quanto o seu produto é
              incrível!!
            </Text>

            <HStack>
              <ImageMold />
            </HStack>
          </VStack>

          <VStack mt={8}>
            <Heading fontSize="md" fontFamily="heading" color="gray.600" mb={4}>
              Sobre o produto
            </Heading>
            <Input placeholder="Título do anúncio" rounded={6} />
            <TextArea placeholder="Descrição do produto" mb={4} />

            <Radio.Group
              name="radio"
              accessibilityLabel="tipo de produto"
              value={value}
              onChange={(nextValue) => {
                setValue(nextValue);
              }}
            >
              <HStack>
                <Radio value="one" colorScheme="gray">
                  <Text fontSize="md" color="gray.600" mr={2}>
                    Produto novo
                  </Text>
                </Radio>
                <Radio value="two" colorScheme="gray">
                  <Text fontSize="md" color="gray.600">
                    Produto usado
                  </Text>
                </Radio>
              </HStack>
            </Radio.Group>

            <Heading
              fontSize="md"
              fontFamily="heading"
              color="gray.600"
              mb={4}
              mt={6}
            >
              Venda
            </Heading>

            <Input
              placeholder="Valor do produto"
              keyboardType="numeric"
              w="full"
              position="relative"
            />

            <Heading fontSize="md" fontFamily="heading" color="gray.600" mb={4}>
              Aceita troca?
            </Heading>

            <Switch
              offTrackColor="indigo.100"
              onTrackColor="indigo.200"
              onThumbColor="indigo.500"
              offThumbColor="indigo.50"
            />

            <Heading
              fontSize="md"
              fontFamily="heading"
              color="gray.600"
              mb={1}
              mt={4}
            >
              Métodos de pagamentos aceitos
            </Heading>

            <VStack>
              <Checkbox.Group onChange={setGroupValues} value={groupValues}>
                <Checkbox value="ticket" my={2} colorScheme="gray">
                  <Text>Boleto</Text>
                </Checkbox>
                <Checkbox value="pix" my={2} colorScheme="gray">
                  <Text>Pix</Text>
                </Checkbox>
                <Checkbox value="money" my={2} colorScheme="gray">
                  <Text>Dinheiro</Text>
                </Checkbox>
                <Checkbox value="credit-card" my={2} colorScheme="gray">
                  <Text>Cartão de Crédito</Text>
                </Checkbox>
                <Checkbox value="deposit" my={2}>
                  <Text>Depósito Bancário</Text>
                </Checkbox>
              </Checkbox.Group>
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>

      <HStack
        bgColor="white"
        px={8}
        pt={4}
        pb={8}
        alignItems="center"
        justifyContent="space-between"
      >
        <ButtonMD
          title="Cancelar"
          onPress={() => navigation.navigate("home")}
        />
        <ButtonMD
          title="Avançar"
          bgColor="gray.700"
          textColor="white"
          onPress={() => navigation.navigate("preview")}
        />
      </HStack>
    </VStack>
  );
}
