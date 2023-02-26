import { useTheme } from "native-base";
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
import { AdPreview } from "@screens/AdPreview";

import { House, SignOut, Tag } from "phosphor-react-native";
import { MyAdDetails } from "@screens/MyAdDetails";
import { Loading } from "@components/Loading";
import { useAuth } from "@hooks/useAuth";
import { useEffect } from "react";

type AppRoutes = {
  home: undefined;
  myAds: undefined;
  signOut: undefined;

  create: undefined;
  details: undefined;
  update: undefined;
  preview: undefined;
  my_ad_details: undefined;
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

      <Screen
        name="details"
        component={AdDetails}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />

      <Screen
        name="create"
        component={CreateAd}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />

      <Screen
        name="update"
        component={UpdateAd}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />

      <Screen
        name="preview"
        component={AdPreview}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />

      <Screen
        name="my_ad_details"
        component={MyAdDetails}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />
    </Navigator>
  );
}
