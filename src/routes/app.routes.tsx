import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

import { AdDetails } from "@screens/AdDetails";
import { CreateAd } from "@screens/CreateAd";
import { UpdateAd } from "@screens/UpdateAd";
import { AdPreview } from "@screens/AdPreview";
import { MyAdDetails } from "@screens/MyAdDetails";

import { AdPreviewDTO } from "@models/AdPreviewDTO";
import { TabRoutes } from "./tab.routes";

type AppRoutes = {
  tabs: undefined;
  create: undefined;
  details: { productId: string };
  update: { productId: string };
  preview: { adPreview: AdPreviewDTO };
  my_ad_details: { productId: string };
};

export type AppNavigatorRoutesProps = StackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="tabs" component={TabRoutes} />
      <Screen name="details" component={AdDetails} />
      <Screen name="create" component={CreateAd} />
      <Screen name="update" component={UpdateAd} />
      <Screen name="preview" component={AdPreview} />
      <Screen name="my_ad_details" component={MyAdDetails} />
    </Navigator>
  );
}
