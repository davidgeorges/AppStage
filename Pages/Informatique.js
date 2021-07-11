
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, TouchableHighlight, ScrollView } from 'react-native';
const { width, height } = Dimensions.get("screen");
import { Dimensions } from 'react-native';

/* Styles */
import styles from '../Styles/styleProduct'

/* Component */
import Footer from "../Components/Footer"

/* Fonctions */
import * as db from '../Fonctions/firebaseJS';


export default function Informatique({ navigation }) {


  const infoArticle = () => {
    let listInfoArticle = [];

    data.map((data, i) => {

      listInfoArticle.push(

        <TouchableHighlight key={i} style={{ borderRadius: 5, width: "90%", height: height / 14, backgroundColor: '#001242', alignSelf: "center", justifyContent: "center", marginBottom: height / 34 }} onPress={() => {
          navigation.navigate('ProductDetails', { id: data.id, data: data })
        }}>
          <View >
            <Text style={{ color: "#F5F8DE", alignSelf: "center", }}>Title : {data.titleToShow} </Text>
            <Text style={{ color: "#F5F8DE", alignSelf: "center", }}>By : {data.usernameToShow} </Text>

          </View>
        </TouchableHighlight>
      )
    })
    //console.log("'Ar : ",lstArticle)
    return listInfoArticle
  }

  var tabArticle = [];

  /* useState */
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  /* -------- */




  /* USE EFFECT */
  useEffect(() => {

    /* Donne la navigation au client */
    db.getArticle(tabArticle, "info_Article", () => {
      setData(tabArticle)
      setLoading(false);
    });
    /*----------------------------- */

  }, []) /*Tableau vide =  va être executer qu'une seule fois au lancement*/
  /* --------------------------------------------------------------------------- */



  return (

    <View style={styles.image}>

      <View style={{ flex: 1, backgroundColor: 'white', height: height / 10, borderBottomWidth: 1, width: "90%", alignSelf: 'center',justifyContent:"center" }}>

        <Text style={{ alignSelf: "center",}}>COMPUTING CATEGORY</Text>

      </View>

      <View style={{ flex: 6, marginTop: height / 30, marginBottom: height / 8 }}>


        <ScrollView >

          {loading ? <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
            <ActivityIndicator style={{ width: 100, height: 65, alignSelf: "center", justifyContent: 'center', marginRight: "2.5%" }} size="large" color="orange" />
            <Text style={{ marginTop: "5%", alignSelf: "center", justifyContent: 'center', marginLeft: "2.5%" }}>Loading...</Text>
          </View> : infoArticle()}


         


        </ScrollView>
      </View>

      <Footer arrowLast={() => { console.log(" rien a gauche") }} arrowNext={() => { navigation.navigate("Design") }} func={() => { navigation.navigate("TabNavigator") }}></Footer>
    </View>


  )

}