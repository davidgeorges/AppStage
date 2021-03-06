
import React from 'react';
const { width, height } = Dimensions.get("screen");
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

/* Description 

-Page contenant les infos d'un article.
-Header  : boutton pour revenir en arrière et titre article.
-Mid : contenu de l'article.
-Footer  : contenant 3 options pour se rediriger vers la catégories précédentes, vers la page principale et vers la catégories suivante.

------------ */

/* Styles */
import styles from '../Styles/styleProductDetails';

/* Component */
import Footer from "../Components/Footer2"

/* Icons */
import { Ionicons } from '@expo/vector-icons';

export default function ProductDetails({ route, navigation: { goBack }, navigation }) {


  /*on récupère les données passer en paramètres lors du .map dans la catégorie concerner*/
  const { data } = route.params;
  
  /* On met la barre du téléphone qui contient l'heure en blanc */
  setStatusBarBackgroundColor("white");

  return (


    <View style={styles.image}>

      <View style={{ flex: 0.66, width: "90%", alignSelf: "center", borderBottomWidth: 1,flexDirection:"row"}}>
          <TouchableOpacity style={{ position: "absolute", left: 0,alignSelf:"center" }}
         onPress={() => { goBack() }}>
          <Ionicons style={{  }} name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
       
      </View>

      <View style={{ flex: 2, width: "90%", alignSelf: "center" }}>
        <Text style={{ marginTop: height / 14, alignSelf: "center", borderBottomWidth: 1, paddingBottom: 5  }}>{data.titleToShow}</Text>

        <Text style={{ marginTop: height / 14, letterSpacing: 0.1, lineHeight: 30, }}>{data.description}</Text>
      </View>

      <View style={{ flex: 2, width: "90%", alignSelf: "center" }}>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ alignSelf: "center", position: "absolute", top: height / 7 }}>Published from : {data.usernameToShow}</Text>
          <Text style={{ alignSelf: "center", position: "absolute", top: height / 7, right: 0 }}>Date : {data.date}</Text>
        </View>

         <Text style={{ alignSelf: "center", color: "black", position: "absolute", top: height / 4.5}}>Contact me at :</Text>

        <View style={{
          justifyContent: "center", alignSelf: 'center',
          height: height / 18, width: width / 1.2, position: "absolute", bottom: height / 30
        }}>
          <Text style={{ alignSelf: "center", color: "black" }}>{data.mail}</Text>
        </View>

      </View>
        
      <View style={{ flex: 0.5, width: "100%", alignSelf: "center" }}>
        <Footer func={() => { navigation.navigate('TabNavigator', { screen: 'Home' }) }}></Footer>
      </View>


    </View>





  )

}

