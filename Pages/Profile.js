import React, { useState, useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";

import { ActivityIndicator, View, Text,TouchableOpacity} from 'react-native';
const { width, height } = Dimensions.get("screen");
import { Dimensions } from 'react-native';


/* Description 

-Page Profile
-Header : Titre de la page  et boutton deconnexion 
-Contenu: 3 text , contenant Username,Mail et Article
-Footer : -Footer : contenant 2 option pour se rediriger vers la page profile et home 

------------ */





/* Icon */
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

/* Styles */
import styles from 'C:/Users/S/Desktop/React_App_Stage/App_Stage/Styles/styleProfile';

/* Fonctions */
import * as db from '../Fonctions/firebaseJS';
import * as cl from "../Fonctions/clientFonction"

export default function Profile({ navigation }) {

  const isFocused = useIsFocused();


  /* useState */
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  /* Fonction qui va itérer sur le tableau tabArticle en utilisant la méthode .map et inserer dans le deuxième tableau un élément <TouchableHighligt> avec d'aute element a l'intérieur */
  const profileArticle = () => {

    /* tableau qui va contenir tout les  articles de la catégorie ( <TouchableOpacity> ) */
    let listProfileArticle = [];

    data.map((dataReady, i) => {

      /* on insert dans le tableau notre article ( composant )*/
      listProfileArticle.push(

                /*Lorsque on clique sur notre article nous allons nous rediriger vers la page de ProductDetailsModify en lui passant un paramètre */
        <TouchableOpacity key={i} style={{ borderRadius: 5, width: "90%", height: height / 22, backgroundColor: '#001242', alignSelf: 'center', justifyContent: "center", marginBottom: height / 34, }} 
        onPress={() => {
          navigation.navigate('ProductDetailsModify', { data: dataReady })
        }}>

          <View>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <Text style={{ color: "#F5F8DE", }}>Title : {dataReady.titleToShow} </Text>
            </View>


          </View>

        </TouchableOpacity>
      )
    })

    /*Tableau qui regroupe tout les articles de l'utilisateur ( <TouchableOpacity> ) */
    return listProfileArticle
  }

  /* Variable qui va contenir les différent données d'article pour le .map*/
  var tabArticle = [];

  /* USE EFFECT */
  useEffect(() => {

    if (isFocused) {

      db.getNbArticle((nbArticle) => {

        /* On récupère touter les annonces de l'utilisateur ( toute catégories ) */
        db.getAllUserArticle(tabArticle, () => {
          cl.setNbArticle(nbArticle)
          setData(tabArticle)
          setLoading(false);
          console.log("PROFILE ICI")
        });
        /*----------------------------- */
      })

    }

  }, [isFocused])
  /* --------------------------------------------------------------------------- */




  return (

    <View style={styles.image}>
      <View style={{ flex: 1, backgroundColor: 'white', height: height / 10, borderBottomWidth: 1, width: "90%", alignSelf: 'center',justifyContent:"center",flexDirection:"row" }}>
        <Text style={{ alignSelf: "center",borderBottomWidth: 1 }}>PROFILE</Text>

        <TouchableOpacity style={{ position: "absolute", right: 0,alignSelf:"center" }}
          onPress={() => {
            db.toLogOut(navigation)
          }}>
          <AntDesign name="login" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 2, marginTop: height/26, }}>

        <View style={styles.action}>
          <View style={{ marginBottom: height / 90, flexDirection: 'row', marginTop: height / 90 }}>

            <FontAwesome style={{ marginLeft: width/24, marginRight: width/28 }} name="user" size={24} color="black" />
            {loading ?
            <ActivityIndicator size="large" color="orange" />: <Text style={{ alignSelf: "center",/*fontFamily:'Ubuntu_300Light'*/ }}>Username : {cl.username}</Text>}
          </View>
        </View>



        <View style={styles.action}>
          <View style={{ marginBottom: height / 90, flexDirection: 'row', marginTop: height / 90 }}>
            <Entypo style={{ marginLeft: width/28,  marginRight: width/28 }} name="mail" size={24} color="black" />
            {loading ?
            <ActivityIndicator size="large" color="orange" />:<Text style={{ alignSelf: "center",/*fontFamily:'Ubuntu_300Light'*/ }}>Mail : {cl.mail}</Text>}
           
          </View>
        </View>

        <View style={styles.action}>
          <View style={{ marginBottom: height / 90, flexDirection: 'row', marginTop: height / 90 }}>

            <MaterialIcons style={{ marginLeft: width/28,  marginRight: width/28 }} name="article" size={24} color="black" />
             
            {loading ?
            <ActivityIndicator size="large" color="orange" />:<Text style={{ alignSelf: "center",/*fontFamily:'Ubuntu_300Light'*/ }}>{cl.nbArticle >1 ? "Articles":"Article"} : {cl.nbArticle}</Text>
}
            
          </View>
        </View>

      </View>

      <View style={{ flex: 4 }}>



        <View>
          <Text style={{ alignSelf: "center", borderBottomWidth: 1, marginTop: height/16, }}>{cl.nbArticle >1 ? "MY ARTICLES":"MY ARTICLE"}</Text>
        </View>



        <View style={{ flex: 6, marginTop: height / 30, marginBottom: height / 8 }}>

        {loading ?  <ActivityIndicator size="large" color="orange" />:profileArticle()}

          

        </View>



      </View>

    </View>

  );
}
