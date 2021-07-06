import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet,View,Text,Dimensions} from 'react-native';
import Home from '../Pages/Home';
import Profile from '../Pages/Profile';

/* Icons */
import { AntDesign } from '@expo/vector-icons';



const { width, height } = Dimensions.get("screen");
const Tab = createBottomTabNavigator();

export  default  function Tabs() {

    return (
        <Tab.Navigator initialRouteName="Home"   tabBarOptions={{showLabel:false,style:{
          backgroundColor: 'white', height: height / 10,borderTopWidth:1 ,borderTopColor:"black"
        }}}>

       <Tab.Screen name="Profile" component={Profile} options={{ tabBarVisible:true, tabBarIcon:({focused}) =>(
            <View>
             {focused ? <AntDesign style={{alignSelf:'center',borderBottomWidth:2,borderBottomColor:"orange"}} name="user" size={34} color="black" />: <AntDesign style={{alignSelf:'center'}} name="user" size={24} color="black" />}
            </View>
           )}} />
           <Tab.Screen name="Home"  component={Home} options={{ tabBarIcon:({focused}) =>(
            <View>
             {focused ?  <AntDesign style={{borderBottomWidth:2,borderBottomColor:"orange",marginBottom:"2%",alignSelf:"center"}}name="home" size={34} color="black" />: <AntDesign style={{alignSelf:'center'}} name="home" size={24} color="black" />}
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