import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";

import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

import { Login } from "@screens/Login";
import { Loading } from "@components/Loading";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Login /> : <Loading />}
    </NativeBaseProvider>
  );
}
