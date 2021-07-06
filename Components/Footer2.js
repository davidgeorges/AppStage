
import React from 'react';
import { Image, View, Text, Pressable, Touchable, TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get("screen");
import { Dimensions } from 'react-native';

/* Styles */
import styles from '../Styles/styleProduct'

/* Icons */
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


export default function Footer(props) {
  return (
    <View style={{ flex: 1, position: "absolute", bottom: "0%", width: "100%" }}>
      <View style={{ backgroundColor: '#white', height: height / 10, borderTopWidth: 1,borderColor:"black" }}>

        <View style={{ alignSelf: "center", position: 'absolute', bottom: "30%",}}>
          <TouchableOpacity onPress={props.func}>
          <AntDesign style={{alignSelf:'center'}} name="home" size={34} color="black" />
          </TouchableOpacity>
        </View>



      </View>
    </View>
  );
}


