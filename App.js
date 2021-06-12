import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Test from './Pages/Profile';
import Home from './Pages/Home';
import Setting from './Pages/Setting';
import Design from './Pages/Design'
import Informatique from './Pages/Informatique'
import Announce from './Pages/Announce'


import ProductDetails from './Pages/ProductDetails';
import * as drawer from './Components/Drawer'
import firebase from 'firebase'
import "firebase/auth";
import "firebase/database";
import 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import TabNavigator from "../App_Stage/Navigation/TabNavigator";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


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

const MainPagesDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Home"   drawerContent={(props) => <drawer.CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home"  component={Home} options={{ headerShown: false }} />
      <Drawer.Screen name="Test" component={Test} options={{ headerShown: false }} />
      <Drawer.Screen name="Option" component={Option} options={{ headerShown: false,drawerIcon:({focused,color,size})=>{
      <Ionicons name="home-outline" style={{size:{size}, color:{color}}}/> }}} />
    </Drawer.Navigator>
  )
}



function App() {


  /*Init db */
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.firestore();
    console.log("Init database success");
    
  } else {
    firebase.app(); // if already initialized, use that one
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
        <Stack.Screen name="Design" component={Design} options={{ headerShown: false }} />
        <Stack.Screen name="Informatique" component={Informatique} options={{ headerShown: false }} />
        <Stack.Screen name="Announce" component={Announce} options={{ headerShown: false }} />

        {/*<Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Test" component={Test} options={{ headerShown: false }}/>
        <Stack.Screen name="Option" component={Option} options={{ headerShown: false }}/>*/}
      </Stack.Navigator>
    </NavigationContainer >
  );
}




export default App;