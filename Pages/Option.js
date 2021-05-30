import React, { useState, useEffect } from 'react';
import { TextInput, ImageBackground, StyleSheet, Text, View, Button, TouchableHighlight, Alert, BackHandler, } from 'react-native';
import styles from 'C:/Users/S/Desktop/React_App_Stage/App_Stage/Styles/styleHome';
import { FontAwesome } from '@expo/vector-icons';



export default function App({ navigation }) {



  //BackHandler.removeEventListener("hardwareBackPress", backAction);

  return (

    <View style={styles.image}>



    <View style={styles.header}>
      <Text style={styles.title}>Options</Text>
      {/*<Image style={styles.logo} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/protesta-vector-png-.png')} />*/}
      <FontAwesome style={styles.headerBars} name="bars" size={24} color="black" onPress={() => navigation.toggleDrawer()} />
    </View>


    <View style={styles.mid}>


    <Text>K</Text>


    </View>

    <View style={styles.footer}>
      {/*() => db.toLogin(login, password, navigation, myTextInput, myTextInput2, () => { setLogin(" "), setPassword(" ") })*/}
      {/*<TouchableHighlight style={styles.testBtn} ><Button title="Register" onPress={goToRegister} color="#9C27B0"></Button></TouchableHighlight>*/}
      <TouchableHighlight style={styles.retourBtn} ><Button title="RETOUR" color="#51355A" onPress={() => console.log("rien")}></Button></TouchableHighlight>
    </View>

  </View>



  );
}
