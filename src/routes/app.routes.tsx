import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { AdDetails } from "@screens/AdDetails";
import { CreateAd } from "@screens/CreateAd";

import { Home } from "@screens/Home";
import { MyAds } from "@screens/MyAds";
import { UpdateAd } from "@screens/UpdateAd";
import { useTheme } from "native-base";

import { House, Tag } from "phosphor-react-native";

type AppRoutes = {
  home: undefined;
  myAds: undefined;
  create: undefined;
  details: undefined;
  update: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { colors, sizes } = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[700],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 80,
          paddingBottom: sizes[10],
          paddingTop: sizes[6],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <House size={24} color={color} />,
        }}
      />

      <Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color }) => <Tag size={24} color={color} />,
        }}
      />

      <Screen
        name="details"
        component={AdDetails}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name="create"
        component={CreateAd}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name="update"
        component={UpdateAd}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}
