import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";

import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

import { THEME } from "@theme/index";
import { Loading } from "@components/Loading";
import { Routes } from "@routes/index";

import { AuthContextProvider } from "@contexts/AuthContext";
import { UserProductsContextProvider } from "@contexts/UserProductsContext";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {/* <UserProductsContextProvider> */}
        {fontsLoaded ? <Routes /> : <Loading />}
        {/* </UserProductsContextProvider> */}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
