import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Text, View, Button, TouchableHighlight, Alert, BackHandler, Image, ScrollView } from 'react-native';
import * as db from '../Fonctions/firebaseJS';
import * as cl from "../Fonctions/clientFonction"
import * as st from "../Fonctions/setItemInfo"
import { useFocusEffect } from '@react-navigation/native';
import styles from 'C:/Users/S/Desktop/React_App_Stage/App_Stage/Styles/styleHome';
import { FontAwesome } from '@expo/vector-icons';
import Item from "../Components/Item"
import axios from "axios";
import tailwind from 'tailwind-rn';
import firebase from 'firebase'





/* xComp = x component */

export default function App({ navigation }) {

  const test = () =>{
    
    let lstArticle =[]

    data[0].map((dt,i) =>{
      lstArticle.push(
      <Item k={i} nom={dt.nom} url={dt.url} description={dt.description}></Item>) 
    })
    return lstArticle;
  }

  let tab = [];
  const [loading, setLoading] = useState(false);
  const [text, setText] = React.useState('');
  const [data, setData] = useState([]);
  cl.setNavigation(navigation);


  /* USE EFFECT */
  useEffect(() => {
    const dbRef = firebase.database().ref();

    dbRef.child("Aticle_Ensemble").get().then((snapshot) => {
      if (snapshot.exists()) {
        tab.push(snapshot.val());
        setData(tab)
        console.log("FINI");
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    /*
    setData(val);
    setLoading(false);*/
  }, []) /*Tableauv vide =  va être executer qu'une seule fois au lancement*/
  /* --------------------------------------------------------------------------- */

  /*Pour empecher le fait de revenir en arrière sur la page HOME "*/
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }),
  );
  /* ---------------------------------------------------------------------- */

    /* Si on a pas fini de charger les données ... */
  if (loading) {
    return (<View style={{ height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>)
  }
  /* ------------------------------------------------------------------------ */  
  console.log("Data : ",data)

  return (

    <View >
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        {/*<Image style={styles.logo} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/protesta-vector-png-.png')} />*/}
        <FontAwesome style={styles.headerBars} name="bars" size={24} color="black" onPress={() => navigation.toggleDrawer()} />
      </View>

      <ScrollView>
        <View style={styles.image}>




          <View style={styles.mid}>

          
            {test()}

          </View>



        </View>


      </ScrollView>
      <View style={styles.footer} >
        {/*() => db.toLogin(login, password, navigation, myTextInput, myTextInput2, () => { setLogin(" "), setPassword(" ") })*/}
        {/*<TouchableHighlight style={styles.testBtn} ><Button title="Register" onPress={goToRegister} color="#9C27B0"></Button></TouchableHighlight>*/}
        <TouchableHighlight style={styles.retourBtn} ><Button title="RETOUR" color="#51355A" onPress={() => { setLoading(true) }}></Button></TouchableHighlight>
      </View>
    </View>
  );

}
