
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text,TouchableOpacity, ScrollView } from 'react-native';
const { width, height } = Dimensions.get("screen");
import { Dimensions } from 'react-native';

/* Styles */
import styles from '../Styles/styleProduct'

/* Component */
import Footer from "../Components/Footer"

/* Fonctions */
import * as db from '../Fonctions/firebaseJS';


/* Description 

-Page de la catégorie sport, regroupant toute les annonce de port.
-Header : annoncant le nom de la catégories.
-Footer : contenant 3 options pour se rediriger vers la catégories précédentes, vers la page principale et vers la catégories suivante.

------------ */


export default function Sport({ navigation }) {

  /* Fonction qui va itérer sur le tableau tabArticle en utilisant la méthode .map et inserer dans le deuxième tableau un élément <TouchableHighligt> avec d'aute element a l'intérieur */
  const designArticle = () => {

    /* tableau qui va contenir tout les  articles de la catégorie ( <TouchableOpacity> ) */
    let listDesignArticle = [];

    data.map((dataReady, i) => {

      /* on insert dans le tableau notre article ( composant )*/
      listDesignArticle.push(

        /*Lorsque on clique sur notre article nous allons nous rediriger vers la page de ProductDetails en lui passant deux paramètres */
        <TouchableOpacity key={i} style={{ borderRadius: 5, width: "90%", height: height / 14, backgroundColor: '#001242', alignSelf: "center", justifyContent: "center", marginBottom: height / 34 }} onPress={() => {
          navigation.navigate('ProductDetails', { id: dataReady.id, data: dataReady })
        }}>
          <View >
            <Text style={{ color: "#F5F8DE", alignSelf: "center", }}>Title : {dataReady.titleToShow} </Text>
            <Text style={{ color: "#F5F8DE", alignSelf: "center", }}>By : {dataReady.usernameToShow} </Text>

          </View>
        </TouchableOpacity>
      )
    })

    /*Tableau qui regroupe tout les articles de la catégorie ( <TouchableOpacity> ) */
    return listDesignArticle
  }

  /* Variable qui va contenir les différent données d'article pour le .map*/
  var tabArticle = [];

  /* useState */
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  /* -------- */




  /* USE EFFECT */
  useEffect(() => {

    /* Donne la navigation au client */
    db.getArticle(tabArticle, "sport_Article", () => {
      setData(tabArticle)
      setLoading(false);
    });
    /*----------------------------- */



  }, []) /*Tableau vide =  va être executer qu'une seule fois au lancement*/
  /* --------------------------------------------------------------------------- */



  return (



    <View style={styles.image}>

      <View style={{ flex: 1, backgroundColor: 'white', height: height / 10, borderBottomWidth: 1, width: "90%", alignSelf: 'center',justifyContent:"center" }}>
        <Text style={{ alignSelf: "center"}}>SPORT CATEGORY</Text>
      </View>

      <View style={{ flex: 6, marginTop: height / 30, marginBottom: height / 8 }}>
        <ScrollView >

          {loading ? <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
            <ActivityIndicator style={{ width: 100, height: 65, alignSelf: "center", justifyContent: 'center', marginRight: "2.5%" }} size="large" color="orange" />
            <Text style={{ marginTop: "5%", alignSelf: "center", justifyContent: 'center', marginLeft: "2.5%" }}>Loading...</Text>
          </View> : designArticle()}




        </ScrollView>
      </View>


      <Footer arrowLast={() => { navigation.navigate("VideoGame") }} arrowNext={() => { console.log("RIEN A VENIR") }} func={() => { navigation.navigate("TabNavigator") }}></Footer>
    </View>


  )

}