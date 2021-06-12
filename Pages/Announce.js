import React, { useState, useEffect } from 'react';
import { TextInput, ImageBackground, StyleSheet, Text, View, Keyboard, TouchableOpacity, } from 'react-native';
import * as db from '../Fonctions/firebaseJS';
const { width, height } = Dimensions.get("screen");
import { Dimensions } from 'react-native';
import Chance from '../node_modules/chance';
import * as Animatable from 'react-native-animatable';


/* Styles */
import styles from 'C:/Users/S/Desktop/React_App_Stage/App_Stage/Styles/styleAnnounce';

/* Icon */
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

/* Fonctions */
import * as er from '../Fonctions/printError';


export default function App({ navigation }) {

  const chance = new Chance();


  /* Hook db.addAnnounce(title,description,"info_Article")*/
  const [title, setTitle] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [val, setVal] = useState(" ");

  //BackHandler.removeEventListener("hardwareBackPress", backAction);

  return (

    <View style={styles.image}>



      <View style={{ flex: 1, backgroundColor: '#51355A', borderBottomLeftRadius: 40, borderBottomRightRadius: 40, }}>
        <Text style={{ alignSelf: "center", marginTop: "10%", borderBottomWidth: 1 }}>ADD ANNOUNCE</Text>
      </View>



      <View style={{ flex: 6, marginTop: "8%",}}>

        <View style={styles.sectionStyle}>
          <TextInput placeholder="Title" placeholderTextColor="gray" style={styles.input} onChangeText={(title) => setTitle(title)} />
        </View>

        <View style={styles.sectionStyle}>
          <TextInput placeholder="Description" placeholderTextColor="gray" style={styles.input} onChangeText={(description) => setDescription(description)} />
        </View>

        {val.length < 1 ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={{ color: "red" }}>{val}</Text>
          </Animatable.View>}

      </View>

      <View style={{ flex: 1, position: "absolute", bottom: height / 8, width: "100%" }}>

        <TouchableOpacity style={{
          justifyContent: "center", alignSelf: 'center', backgroundColor: '#9E2B25',
          borderRadius: 40, height: height / 18, width: width / 1.6, position: "absolute", bottom: "10%"
        }} onPress={() => { db.addAnnounce(title, description, "info_Article", (val) => { if (val) { setVal(er.err2); console.log("val : ", er.err2), Keyboard.dismiss() } }) }}>
          <Ionicons style={{ alignSelf: 'center', position: "absolute", left: "5%" }} name="add-circle-outline" size={24} color="black" />
          <Text style={{ alignSelf: "center" }}>CONFIRM</Text></TouchableOpacity>
      </View>

      <View style={{ flex: 1, position: "absolute", bottom: "0%", width: "100%" }}>
        <View style={{ backgroundColor: '#51355A', borderTopLeftRadius: 40, borderTopRightRadius: 40, height: height / 10, }}>



          <View style={{ alignSelf: "center", position: 'absolute', bottom: "20%" }}>
            <TouchableOpacity onPress={() => { navigation.navigate("TabNavigator") }}>
              <AntDesign style={{ alignSelf: 'center' }} name="home" size={24} color="black" />
              <Text style={{ alignSelf: 'center', }}>Home</Text>
            </TouchableOpacity>
          </View>



        </View>
      </View>

    </View>



  );
}
