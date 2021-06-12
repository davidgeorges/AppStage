import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet,View,Text,Dimensions} from 'react-native';
import Home from '../Pages/Home';
import Test from '../Pages/Profile';
import Option from '../Pages/Setting';
import Informatique from '../Pages/Informatique';

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';



const { width, height } = Dimensions.get("screen");
const Tab = createBottomTabNavigator();

export  default  function Tabs() {

    return (
        <Tab.Navigator initialRouteName="Home"   tabBarOptions={{showLabel:false,style:{
          backgroundColor:'#51355A',
          borderTopLeftRadius:40,
          borderTopRightRadius:40,
          height:height/10,
          ...styles.shadow
        }}}>

       <Tab.Screen name="Test" component={Test} options={{ tabBarVisible:true, tabBarIcon:({focused}) =>(
            <View>
             {focused ? <AntDesign style={{alignSelf:'center'}} name="user" size={34} color="#9E2B25" />: <AntDesign style={{alignSelf:'center'}} name="user" size={24} color="black" />}
              <Text >Profile</Text>
            </View>
           )}} />
           <Tab.Screen name="Home"  component={Home} options={{ tabBarIcon:({focused}) =>(
            <View>
             {focused ?  <AntDesign style={{alignSelf:'center'}} name="home" size={34} color="#9E2B25" />: <AntDesign style={{alignSelf:'center'}} name="home" size={24} color="black" />}
              <Text >Home</Text>
            </View>
           )}} />
          <Tab.Screen name="Option" component={Option} options={{ tabBarIcon:({focused}) =>(
            <View>
             {focused ? <Feather style={{alignSelf:'center'}} name="settings" size={34} color="#9E2B25" />: <Feather style={{alignSelf:'center'}} name="settings" size={24} color="black" />}
              <Text >Setting</Text>
            </View>
           )}} /> 
          
        </Tab.Navigator>
      )

}

const styles =StyleSheet.create({
    shadow: {
      shadowColor:"#7F5DF0",
      shadowOffset:{
        width:0,
        height:10,
      },
      shadowOpacity:0.25,
      shadowRadius:3.5,
      elevation:5
  
    }
  });