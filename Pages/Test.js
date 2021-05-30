import React from 'react';
import { Text, View, } from 'react-native';
import styles from 'C:/Users/S/Desktop/React_App_Stage/App_Stage/Styles/styleHome';
import { FontAwesome } from '@expo/vector-icons';




export default function App({ navigation ,route}) {



  //BackHandler.removeEventListener("hardwareBackPress", backAction);

  return (
 
    <View style={styles.header}>
    <Text style={styles.title}>Test</Text>
    {/*<Image style={styles.logo} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/protesta-vector-png-.png')} />*/}
    <FontAwesome style={styles.headerBars} name="bars" size={24} color="black" onPress={() => navigation.toggleDrawer()} />
  </View>



  );
}
