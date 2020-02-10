import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import {
  MapScreen,
  NewPlaceScreen,
  PlaceDetailScreen,
  PlaceListScreen
} from "screens";
import Colors from "colors";

const MainNavigator = createStackNavigator(
  {
    PlaceList: PlaceListScreen,
    PlaceDetail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "ios" ? "" : Colors.primary
      },
      headerTintColor: Platform.OS === "ios" ? Colors.primary : "white"
    }
  }
);

export default createAppContainer(MainNavigator);
