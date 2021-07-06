import React, { useState, } from 'react';
import { TextInput, Text, View, Keyboard, TouchableOpacity } from 'react-native';
import * as db from '../Fonctions/firebaseJS';
const { width, height } = Dimensions.get("screen");
import { Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Picker } from '@react-native-picker/picker';


/* Description */

/* ------------ */


/* Styles */
import styles from '../Styles/styleAnnounce';

/* Icon */

import { Ionicons } from '@expo/vector-icons';

/* Fonctions */
import * as er from '../Fonctions/printError';

/* Component */
import Footer from "../Components/Footer2"


export default function App({ navigation }) {

  const [selectedValue, setSelectedValue] = useState("info_Article");
  var completeDate;

  const [title, setTitle] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [val, setVal] = useState(" ");


  const getCurrentDate = () => {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    completeDate = date + "-" + month + "-" + year
  }



  return (

    <View style={styles.image}>



      <View style={{ flex: 1, backgroundColor: 'white', height: height / 10, borderBottomWidth: 1, width: "90%", alignSelf: 'center' }}>
        <Text style={{ alignSelf: "center", marginTop: height / 20, }}>ADD Article</Text>
      </View>



      <View style={{ flex: 6, marginTop: "8%", }}>
        <View style={{ position: "absolute", top: 0, alignSelf: "center" }}>
          <View style={styles.sectionStyle}>
            <TextInput onFocus={() => { setVal("") }} placeholder="Title" placeholderTextColor="gray" style={styles.input} onChangeText={(title) => setTitle(title)} />
          </View>

          <View style={styles.sectionStyle}>
            <TextInput multiline = {true}  numberOfLines = {4} onFocus={() => { setVal("") }} placeholder="Description" placeholderTextColor="gray" style={styles.input} onChangeText={(description) => setDescription(description)} />
          </View>

          
            <Picker onFocus={() => { setVal("") }} style={{ marginTop: height / 16, }}
              selectedValue={selectedValue}
              onValueChange={(itemValue) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item label="Info" value="info_Article" />
              <Picker.Item label="Design" value="design_Article" />
              <Picker.Item label="Video games" value="game_Article" />
              <Picker.Item label="Sport" value="sport_Article" />
            </Picker>
          

          {val.length < 1 ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{ color: "red", marginTop: height / 60 }}>{val}</Text>
            </Animatable.View>}

        </View>
      </View>

      <View style={{ flex: 1, position: "absolute", bottom: height / 6, width: "100%" }}>

        <TouchableOpacity style={{
          justifyContent: "center", alignSelf: 'center', backgroundColor: '#001242',
          borderRadius: 40, height: height / 18, width: width / 1.6, position: "absolute", bottom: "10%"
        }} onPress={() => { getCurrentDate(); db.addArticle(title, description, selectedValue, completeDate, (val) => { if (val) { setVal(er.err2); console.log("val : ", er.err2), Keyboard.dismiss() } else { navigation.navigate("TabNavigator") } }) }}>
          <Ionicons style={{ alignSelf: 'center', position: "absolute", left: "5%" }} name="add-circle-outline" size={24} color="white" />
          <Text style={{ alignSelf: "center", color: "white" }}>ADD</Text></TouchableOpacity>
      </View>

      <View style={{ flex: 0.5, width: "90%", alignSelf: "center" }}>
        <Footer func={() => { navigation.navigate('TabNavigator', { screen: 'Home' }) }}></Footer>
      </View>

    </View>



  );
}
