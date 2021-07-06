
import React from 'react';
const { width, height } = Dimensions.get("screen");
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { setStatusBarBackgroundColor } from 'expo-status-bar';


/* Styles */
import styles from '../Styles/styleProductDetails';

/* Component */
import Footer from "../Components/Footer2"

/* Icons */
import { Ionicons } from '@expo/vector-icons';

export default function App({ route, navigation: { goBack }, navigation }) {


  const { data } = route.params;
  setStatusBarBackgroundColor("white");

  return (


    <View style={styles.image}>

      <View style={{ flex: 0.6, width: "90%", alignSelf: "center", borderBottomWidth: 1 }}>
        <TouchableOpacity onPress={() => { goBack() }}>
          <Ionicons style={{ marginTop: height / 24 }} name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 2, width: "90%", alignSelf: "center" }}>
        <Text style={{ marginTop: height / 14, alignSelf: "center" }}>{data.titleToShow}</Text>

        <Text style={{ marginTop: height / 14, letterSpacing: 0.1, lineHeight: 30, }}>{data.description}</Text>
      </View>

      <View style={{ flex: 2, width: "90%", alignSelf: "center" }}>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ alignSelf: "center", position: "absolute", top: height / 6 }}>Published from : {data.usernameToShow}</Text>
          <Text style={{ alignSelf: "center", position: "absolute", top: height / 6, right: 0 }}>Date : {data.date}</Text>
        </View>

        <View style={{
          justifyContent: "center", alignSelf: 'center', backgroundColor: '#001242',
          borderRadius: 40, height: height / 18, width: width / 1.2, position: "absolute", bottom: height / 20
        }} onPress={() => { console.log("rien contact me") }}>
          <Text style={{ alignSelf: "center", color: "white" }}>Contact me at : {data.mail}</Text>
        </View>

      </View>

      <View style={{ flex: 0.5, width: "100%", alignSelf: "center" }}>
        <Footer func={() => { navigation.navigate('TabNavigator', { screen: 'Home' }) }}></Footer>
      </View>


    </View>





  )

}

