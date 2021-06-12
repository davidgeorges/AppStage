
import React from 'react';
import { Image, View, Text, Pressable, Touchable, TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get("screen");
import { Dimensions } from 'react-native';

/* Styles */
import styles from '../Styles/styleInformatique'


import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';



export default function Footer(props) {
  return (
    <View style={{ flex: 1, position: "absolute", bottom: "0%", width: "100%" }}>
        <View style={{ backgroundColor: '#51355A', borderTopLeftRadius: 40, borderTopRightRadius: 40, height: height / 10, }}>

          <View style={{ justifyContent: "center", position: 'absolute', left: "5%", bottom: "20%" }}>
            <TouchableOpacity onPress={props.arrowLast}>
              <AntDesign name="arrowleft" size={24} color="black" />
              <Text style={{ alignSelf: 'center', }}>Before</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignSelf: "center", position: 'absolute', bottom: "20%" }}>
            <TouchableOpacity onPress={props.func}>
              <AntDesign style={{ alignSelf: 'center' }} name="home" size={24} color="black" />
              <Text style={{ alignSelf: 'center', }}>Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={{ justifyContent: "center", position: 'absolute', right: "5%", bottom: "20%" }}>
            <TouchableOpacity onPress={props.arrowNext}>
              <AntDesign name="arrowright" size={24} color="black" />
              <Text style={{ alignSelf: 'center', }}>After</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
  );
}


