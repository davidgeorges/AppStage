import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './Pages/SplashScreen';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Design from './Pages/Design'
import VideoGame from './Pages/VideoGame'
import Sport from './Pages/Sport'
import Informatique from './Pages/Informatique'
import Article from './Pages/Article'
import ProductDetails from './Pages/ProductDetails';
import ProductDetailsModify from './Pages/ProductDetailsModify';
import { YellowBox} from "react-native";

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

/* Firebase */
import firebase from 'firebase'


/* Navigation */
import TabNavigator from "../App_Stage/Navigation/TabNavigator";

/* Var pour la navigation */
const Stack = createStackNavigator();

/* Confirugration database (OK 19/05/21) */
export const firebaseConfig = {
  apiKey: "AIzaSyBejP_R_VYJ02J-crnIgin0USNaHqjkyjY",
  authDomain: "appstage-2a382.firebaseapp.com",
  databaseURL: "https://appstage-2a382-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "appstage-2a382",
  storageBucket: "appstage-2a382.appspot.com",
  messagingSenderId: "309212592729",
  appId: "1:309212592729:web:666b0eff7f97d9095e0f48",
  measurementId: "G-B3BHPVRKRX"
};
/* --------------------------------------------------- */

function App({ navigation }) {

  /*Init db */
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);

    console.log("Init database success");

  } else {
    firebase.app(); // if already initialized, use that one
  }

  YellowBox.ignoreWarnings([""]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" >
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
          <Stack.Screen name="ProductDetailsModify" component={ProductDetailsModify} options={{ headerShown: false }} />
          <Stack.Screen name="Design" component={Design} options={{ headerShown: false }} />
          <Stack.Screen name="Informatique" component={Informatique} options={{ headerShown: false }} />
          <Stack.Screen name="VideoGame" component={VideoGame} options={{ headerShown: false }} />
          <Stack.Screen name="Sport" component={Sport} options={{ headerShown: false }} />
          <Stack.Screen name="Article" component={Article} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer >
    </SafeAreaProvider>

  );
}

export default App;