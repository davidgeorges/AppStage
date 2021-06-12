import React, { useState } from 'react';
import {StyleSheet,View,Text,Dimensions} from 'react-native';
import Test from '../Pages/Profile';
import Option from '../Pages/Setting';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get("screen");

export  default  function Tabs() {

    return (
       
        <View style={{ position:'absolute',
        left:0,
        right:0,
        elevation:0,
        backgroundColor:'#51355A',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        height:height/8,
        ...styles.shadow}}></View>
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