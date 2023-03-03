import { StatusBar, LogBox } from "react-native";
import { NativeBaseProvider } from "native-base";

import "react-native-gesture-handler";

import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

import { THEME } from "@theme/index";
import { Loading } from "@components/Loading";
import { Routes } from "@routes/index";

import { AuthContextProvider } from "@contexts/AuthContext";
import { ProductsContextProvider } from "@contexts/ProductsContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  LogBox.ignoreLogs([
    "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
  ]);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        <ProductsContextProvider>
          {fontsLoaded ? <Routes /> : <Loading />}
        </ProductsContextProvider>
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
