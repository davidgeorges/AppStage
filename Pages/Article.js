/* Import de tout ce qu'on a besoin */
import React, { useState, } from 'react';
import { TextInput, Text, View, Keyboard, TouchableOpacity,  } from 'react-native';
import * as db from '../Fonctions/firebaseJS';
const { width, height } = Dimensions.get("screen");
import { Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Picker } from '@react-native-picker/picker';


/* Styles */
import styles from '../Styles/styleAnnounce';

/* Icon */
import { Ionicons } from '@expo/vector-icons';

/* Fonctions */
import * as er from '../Fonctions/printError';

/* Component */
import Footer from "../Components/Footer2"

/* Description  

-Page Article
-Header : annoncant le nom de la catégories.
-Mid : 2 TextInput pour le titre et la description de l'annonce et un picker pour sélectionner la catégorie, boutton pour ajouter l'article.
-Footer : contenant 1 option pour se rediriger vers la page home 

------------ */


export default function Article({ navigation }) {

  /* Decla var */
  var completeDate;

  /* Hooks */
  const [title, setTitle] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [error, setError] = useState(" ");
  const [selectedValue, setSelectedValue] = useState("info_Article");


  /* Recupère la date actuelle */
  const getCurrentDate = () => {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    completeDate = date + "-" + month + "-" + year
  }



  return (
    <View style={styles.image}>

      <View style={{ flex: 1, backgroundColor: 'white', borderBottomWidth: 1, width: "90%", alignSelf: 'center', justifyContent: "center", flexDirection: "row",paddingTop:"2%" }}>


    
        <Text style={{ alignSelf: "center", borderBottomWidth: 1 }}>ADD ARTICLE</Text>

      </View>


     
        <View style={{ flex: 6, marginTop: "0%", }}>
          <View style={{ position: "absolute", top: 0, alignSelf: "center" }}>
            <View style={styles.sectionStyle}>
              <TextInput onFocus={() => { setError("") }} placeholder="Title" placeholderTextColor="gray" style={styles.input} onChangeText={(title) => setTitle(title)} />
            </View>

            <View style={styles.sectionStyle}>
              <TextInput multiline={true} numberOfLines={4} onFocus={() => { setError("") }} placeholder="Description" placeholderTextColor="gray" style={styles.input} onChangeText={(description) => setDescription(description)} />
            </View>


            <Picker onFocus={() => { setError("") }} style={{ marginTop: height / 16, }}
              selectedValue={selectedValue}
              onValueChange={(itemValue) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item label="Computing" value="info_Article" />
              <Picker.Item label="Design" value="design_Article" />
              <Picker.Item label="Video games" value="game_Article" />
              <Picker.Item label="Sport" value="sport_Article" />
            </Picker>


            {error.length < 1 ? null :
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{ color: "red", marginTop: height / 60 }}>{error}</Text>
              </Animatable.View>}

          </View>
        </View>

      <View style={{ flex: 1,bottom: height / 14, width: "100%" }}>
              
        <TouchableOpacity style={{
          justifyContent: "center", alignSelf: 'center', backgroundColor: '#001242',
          borderRadius: 40, height: height / 20, width: width / 1.6, position: "absolute", bottom: height / 100
        }} onPress={() => { getCurrentDate(); db.addArticle(title, description, selectedValue, completeDate, (error) => { if (error) { setError(er.err2); console.log("error : ", er.err2), Keyboard.dismiss() } else { navigation.navigate("TabNavigator") } }) }}>
          <Ionicons style={{ alignSelf: 'center', position: "absolute", left: "5%" }} name="add-circle-outline" size={24} color="white" />
          <Text style={{ alignSelf: "center", color: "white" }}>CONFIRM ARTICLE</Text></TouchableOpacity>
      </View>

      <View style={{ flex: 0.5, width: "100%", alignSelf: "center" }}>
        <Footer func={() => { navigation.navigate('TabNavigator', { screen: 'Home' }) }}></Footer>
      </View>


    </View>
  );
}
