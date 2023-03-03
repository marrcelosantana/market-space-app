import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import {
  Box,
  Checkbox,
  Heading,
  HStack,
  Image,
  Radio,
  ScrollView,
  Switch,
  Text,
  useToast,
  VStack,
  Pressable,
  CloseIcon,
} from "native-base";

import { FormAdHeader } from "@components/FormAdHeader";
import { ImageMold } from "@components/ImageMold";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { ButtonMD } from "@components/ButtonMD";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { AdPreviewDTO } from "@models/AdPreviewDTO";

export type ImageProps = {
  name: string;
  uri: string;
  type: string;
};

export function CreateAd() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isNew, setIsNew] = useState(true);
  const [payMethods, setPayMethods] = useState<string[]>([]);
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [images, setImages] = useState<ImageProps[]>([]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();

  async function handleSelectImage() {
    const imageSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    });

    if (imageSelected.canceled) {
      return;
    }

    if (imageSelected.assets[0].uri) {
      const imageInfo = await FileSystem.getInfoAsync(
        imageSelected.assets[0].uri
      );

      if (imageInfo.size && imageInfo.size / 1024 / 1024 > 8) {
        return toast.show({
          title: "Essa imagem é muito grande. Escolha uma de até 8MB.",
          placement: "top",
          bgColor: "red.500",
        });
      }

      const fileExtension = imageSelected.assets[0].uri.split(".").pop();

      const imageFile = {
        name: `${fileExtension}`.toLowerCase(),
        uri: imageSelected.assets[0].uri,
        type: `${imageSelected.assets[0].type}/${fileExtension}`,
      } as ImageProps;

      setImages([...images, imageFile]);
    }
  }

  function removeImage(uri: string) {
    const imagesFiltered = images.filter((image) => image.uri !== uri);
    setImages(imagesFiltered);
  }

  function initValues() {
    setTitle("");
    setDescription("");
    setPrice("");
    setPayMethods([]);
    setImages([]);
  }

  function handleAdvance() {
    const adPreview: AdPreviewDTO = {
      title,
      description,
      price,
      images,
      isNew,
      acceptTrade,
      payMethods,
    };

    if (
      title.length === 0 ||
      description.length === 0 ||
      price.length === 0 ||
      images.length === 0 ||
      payMethods.length === 0
    ) {
      return toast.show({
        title:
          "Você esqueceu de preencher algum campo ou de escolher uma imagem.",
        placement: "top",
        bgColor: "red.500",
      });
    }

    navigation.navigate("preview", { adPreview });
    // initValues();
  }

  useFocusEffect(
    useCallback(() => {
      // initValues();
    }, [])
  );

  return (
    <VStack flex={1}>
      <FormAdHeader
        title="Criar anúncio"
        handleGoBack={() => navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack flex={1} px={8} pb={8}>
          <VStack mt={8}>
            <Heading fontSize="md" fontFamily="heading" color="gray.600">
              Imagens
            </Heading>

            <Text color="gray.600" fontSize="sm" mt={2}>
              Escolha até 3 imagens para mostrar o quanto o seu produto é
              incrível!!
            </Text>

            <HStack>
              {images.length > 0 &&
                images.map((image) => (
                  <Box key={image.uri}>
                    <Image
                      w={24}
                      h={24}
                      mr={2}
                      mt={4}
                      borderRadius={8}
                      source={{ uri: image.uri }}
                      alt="imagem do produto"
                      resizeMode="cover"
                    />

                    <Pressable
                      onPress={() => removeImage(image.uri)}
                      position="absolute"
                      mt={5}
                      ml={1}
                      w={5}
                      h={5}
                      rounded="full"
                      bgColor="gray.600"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <CloseIcon size={2} color="white" />
                    </Pressable>
                  </Box>
                ))}
              {images.length < 3 && <ImageMold onPress={handleSelectImage} />}
            </HStack>
          </VStack>

          <VStack mt={8}>
            <Heading fontSize="md" fontFamily="heading" color="gray.600" mb={4}>
              Sobre o produto
            </Heading>

            <Input
              placeholder="Título do anúncio"
              rounded={6}
              onChangeText={(value) => setTitle(value)}
              value={title}
            />

            <TextArea
              placeholder="Descrição do produto"
              mb={4}
              onChangeText={(value) => setDescription(value)}
              value={description}
            />

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

            <Heading
              fontSize="md"
              fontFamily="heading"
              color="gray.600"
              mb={4}
              mt={6}
            >
              Venda
            </Heading>

            <HStack>
              <Input
                placeholder="Valor do produto"
                keyboardType="numeric"
                w="full"
                position="relative"
                pl={10}
                rounded={6}
                onChangeText={(value) => setPrice(value)}
                value={price}
              />

              <Text
                fontFamily="heading"
                color="gray.700"
                position="absolute"
                mt={3}
                ml={3}
              >
                R$
              </Text>
            </HStack>

            <Heading fontSize="md" fontFamily="heading" color="gray.600" mb={4}>
              Aceita troca?
            </Heading>

            <Switch
              offTrackColor="indigo.100"
              onTrackColor="indigo.200"
              onThumbColor="indigo.500"
              offThumbColor="indigo.50"
              onToggle={(value) => setAcceptTrade(value)}
              value={acceptTrade}
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
              <Checkbox.Group
                onChange={(method) => setPayMethods(method)}
                value={payMethods}
              >
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
          </VStack>
        </VStack>
      </ScrollView>

      <HStack
        bgColor="white"
        px={8}
        pt={6}
        pb={8}
        alignItems="center"
        justifyContent="space-between"
      >
        <ButtonMD title="Cancelar" onPress={() => navigation.goBack()} />
        <ButtonMD
          title="Avançar"
          bgColor="gray.700"
          textColor="white"
          onPress={handleAdvance}
        />
      </HStack>
    </VStack>
  );
}
