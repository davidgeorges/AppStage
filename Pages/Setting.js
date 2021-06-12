import React, { useState, useEffect } from 'react';
import { TextInput, ImageBackground, StyleSheet, Text, View, Button, TouchableHighlight, Alert, BackHandler, TouchableOpacity, } from 'react-native';
import * as db from '../Fonctions/firebaseJS';


/* Styles */
import styles from 'C:/Users/S/Desktop/React_App_Stage/App_Stage/Styles/styleSetting';

/* Icon */
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App({ navigation }) {



  //BackHandler.removeEventListener("hardwareBackPress", backAction);

  return (

    <View style={styles.image}>



      <View style={{ flex: 1, backgroundColor: '#51355A', borderBottomLeftRadius: 40, borderBottomRightRadius: 40, }}>
      <Text style={{ alignSelf: "center", marginTop: "10%", borderBottomWidth: 1 }}>SETTING</Text>
      </View>



      <View style={{ flex: 6, marginTop: "8%" }}>


        <TouchableOpacity onPress={() => { db.toLogOut() }}><MaterialCommunityIcons name="logout" size={50} color="black" /></TouchableOpacity>


      </View>

     
      
    </View>



  );
}
