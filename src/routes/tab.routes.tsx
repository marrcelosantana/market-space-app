import { useEffect } from "react";
import { useTheme } from "native-base";
import { Platform } from "react-native";

import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { Home } from "@screens/Home";
import { MyAds } from "@screens/MyAds";

import { House, SignOut, Tag } from "phosphor-react-native";
import { Loading } from "@components/Loading";
import { useAuth } from "@hooks/useAuth";

type TabRoutes = {
  home: undefined;
  myAds: undefined;
  signOut: undefined;
};

export type TabNavigatorRoutesProps = BottomTabNavigationProp<TabRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<TabRoutes>();

export function TabRoutes() {
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
        name="signOut"
        component={() => {
          const { signOut } = useAuth();

          async function handleSignOut() {
            await signOut();
          }

          useEffect(() => {
            handleSignOut();
          }, []);
          return <Loading />;
        }}
        options={{
          tabBarIcon: () => <SignOut size={24} color="#E07878" />,
        }}
      />
    </Navigator>
  );
}
