import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
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

import { ProductDTO } from "@models/ProductDTO";
import { ProductImageDTO } from "@models/ProductImageDTO";

import { api } from "@services/api";
import { useProducts } from "@hooks/useProducts";
import { AdPreviewDTO } from "@models/AdPreviewDTO";
import { AppError } from "@utils/AppError";

type RouteParams = {
  product: ProductDTO;
};

export function UpdateAd() {
  const { updateAd } = useProducts();

  const route = useRoute();
  const { product } = route.params as RouteParams;

  const payMethodsKey = product.payment_methods.map(({ key }) => key);
  const imagesPath = product.product_images.map(({ path }) => path);

  const [title, setTitle] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price.toString());
  const [isNew, setIsNew] = useState(product.is_new);
  const [payMethods, setPayMethods] = useState(payMethodsKey);
  const [acceptTrade, setAcceptTrade] = useState(product.accept_trade);
  const [images, setImages] = useState<ProductImageDTO[]>(
    product.product_images
  );

  const [newImages, setNewImages] = useState<string[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();

  async function handleSelectImage() {
    const ImageSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      allowsEditing: true,
      quality: 1,
    });

    if (ImageSelected.canceled) {
      return;
    }

    if (ImageSelected.assets[0].uri) {
      setNewImages((prevValues) => [
        ...prevValues,
        ImageSelected.assets[0].uri,
      ]);
    }
  }

  function removeImage(path: string) {
    const imagesFiltered = images.filter((image) => image.path !== path);
    setImages(imagesFiltered);
  }

  async function handleUpdateAd() {
    const newAd: AdPreviewDTO = {
      name: title,
      description,
      price: Number(price),
      is_new: isNew,
      accept_trade: acceptTrade,
      payment_methods: payMethods,
      imagesUri: newImages,
    };
    try {
      setIsLoading(true);
      await updateAd(newAd, product.id, deletedImages, images);

      toast.show({
        title: "Anúncio atualizado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

      navigation.goBack();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possivel atualizar o anúncio.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <FormAdHeader
        title="Editar anúncio"
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
                  <Box key={image.id}>
                    <Image
                      w={24}
                      h={24}
                      mr={2}
                      mt={4}
                      borderRadius={8}
                      source={{
                        uri: `${api.defaults.baseURL}/images/${image.path}`,
                      }}
                      alt="imagem do produto"
                      resizeMode="cover"
                    />

                    <Pressable
                      onPress={() => removeImage(image.path)}
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
          onPress={handleUpdateAd}
          isLoading={isLoading}
        />
      </HStack>
    </VStack>
  );
}
