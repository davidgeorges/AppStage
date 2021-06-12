// ./navigation/StackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Home from '../Pages/Home';
import DrawerNavigator from "../Navigation/DrawerNavigator";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};



