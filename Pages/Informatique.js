
import React, { useState, useEffect} from 'react';
import { ActivityIndicator,Image, View, Text, Pressable, Touchable, TouchableOpacity,TouchableHighlight,ScrollView } from 'react-native';
const { width, height } = Dimensions.get("screen");
import { Dimensions } from 'react-native';

/* Styles */
import styles from '../Styles/styleInformatique'

/* Component */
import Footer from "../Components/Footer"

/* Fonctions */
import * as db from '../Fonctions/firebaseJS';
import * as cl from "../Fonctions/clientFonction"

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


export default function App({ route, navigation }) {

  
  const infoArticle = () => {
    let listInfoArticle = [];

    data.map((data, i) => {

      listInfoArticle.push(
        
        
        <TouchableHighlight key={i} style={{ borderRadius: 5 ,width:"90%",height:"25%", backgroundColor: '#51355A',alignSelf: "center",marginBottom:height/34 }}  onPress={() => {
          navigation.navigate('ProductDetails', { id: data.id, data: data })}}>
        <View   >
        <Text style={{color:"#F5F8DE",alignSelf:"center",marginTop:"1%"}}>Title : {data.title} </Text>
        <Text style={{color:"#FFF8F0"}}>By : {data.name}</Text>
        <Text style={{color:"#FFF8F0"}}>Description : {data.description}</Text>
        </View>
       </TouchableHighlight>
      )
    })
    //console.log("'Ar : ",lstArticle)
    return listInfoArticle
  }

  var tabArticle = [];

  /* useState */
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  /* -------- */




  /* USE EFFECT */
  useEffect(() => {

    /* Donne la navigation au client */ 
    db.getArticle(tabArticle,"info_Article",()=>{
      setData(tabArticle)
      setLoading(false);
    });
    /*----------------------------- */
    


  },[]) /*Tableau vide =  va être executer qu'une seule fois au lancement*/
  /* --------------------------------------------------------------------------- */

   /* Si on a pas fini de charger les données ... */
   if (loading) {
    return (<View style={{ height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>)
  }
  /* ------------------------------------------------------------------------ */
  
  return (

    <View style={styles.image}>

      <View style={{ flex: 1, backgroundColor: '#51355A', borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}>
        <Text style={{ alignSelf: "center", marginTop: "10%", borderBottomWidth: 1 }}>CATEGORIES INFORMATIQUE</Text>
      </View>

      <View style={{ flex:6, marginTop: "7%" }}>
      <ScrollView >

      {infoArticle()}

      </ScrollView>
    </View>
    
      <Footer arrowLast={() =>{console.log(" rien a gauche")}} arrowNext={() =>{navigation.navigate("Design")}} func={() =>{navigation.navigate("TabNavigator")}}></Footer>
    </View>


  )

}