import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import * as drawer from '../Components/Drawer'


import Test from '../Pages/Profile';
import Home from '../Pages/Home';
import Option from '../Pages/Option';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <drawer.CustomDrawerContent {...props} />} >
      <Drawer.Screen name="TabNavigator"  component={TabNavigator} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
  
};
export default DrawerNavigator;