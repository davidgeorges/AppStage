import React, { useState, useEffect, useCallback } from 'react';
import { ImageBackground, ActivityIndicator, Text, View, Button, TouchableHighlight, Alert, BackHandler, Image, ScrollView, TextInput, DevSettings, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");

/* Styles */
import styles from '../Styles/styleHome';

/* Fonctions */
import * as db from '../Fonctions/firebaseJS';
import * as cl from "../Fonctions/clientFonction"

/* Icon */
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


/* Component */
import Ann from '../Components/Announce';
import Item from "../Components/Item"
import Header from "../Components/Header"


/* Lien image */
const image = { uri: "http://www.vaishalibookcentre.com/images/no-image-large.png" };




/* xComp = x component */

export default function App({ navigation }) {


  /* Hook */
  const [title, setTitle] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [price, setPrice] = useState(" ");
  const [url, setUrl] = useState(" "); // immge url

  /* Changement de la couleur de la bare qui contient l'heure,wifi... */
  setStatusBarBackgroundColor("#51355A");


  const article = () => {
    let lstArticle = [];

    data.map((data, i) => {

      lstArticle.push(

        <View key={i} style={tailwind(' text-center')}>
          <View style={tailwind('  mb-8')}>
            <TouchableHighlight style={tailwind('mx-7 rounded-2xl ')} onPress={() => {
              navigation.navigate('ProductDetails', { id: data.id, data: data })
            }


            }>
              <Image style={tailwind(' h-32 w-52 rounded-2x1 self-center')} source={{ uri: data.url }} />
            </TouchableHighlight>
            <Text style={tailwind(' text-center font-bold mt-2')}>{data.nom}</Text>
          </View>
        </View>
      )
    })
    //console.log("'Ar : ",lstArticle)
    return lstArticle
  }

  var tabArticle = [];

  /* useState */
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  /* -------- */




  /* USE EFFECT */
  useEffect(() => {

    /* Donne la navigation au client / 
    db.getArticle(tabArticle,()=>{
      setData(tabArticle)
    });
    / ----------------------------- */
    cl.setNavigation(navigation);
    


  }, []) /*Tableau vide =  va être executer qu'une seule fois au lancement*/
  /* --------------------------------------------------------------------------- */

  //console.log("setData : ",data);

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

  { width > 812 ? null : null }

  return (

    <View style={styles.image}>

      <View style={{ flex: 1, backgroundColor: '#51355A', borderBottomLeftRadius: 40, borderBottomRightRadius: 40, }}>

        <TouchableOpacity style={{
          justifyContent: "center", alignSelf: 'center', backgroundColor: '#9E2B25',
          borderRadius: 40, height: height / 18, width: width / 1.6, position: "absolute", bottom: "10%"
        }} onPress={() =>{navigation.navigate("Announce")}}>
          <Ionicons style={{ alignSelf: 'center', position: "absolute", left: "5%" }} name="add-circle-outline" size={24} color="black" />
          <Text style={{ alignSelf: "center" }}>Add an announce</Text></TouchableOpacity>


      </View>

      <View style={{ flex: 6, marginTop: "8%" }}>

        <Text style={{ alignSelf: "center", position: "absolute", color: "black", borderBottomWidth:1,marginBottom:"2%"}}>SHOP CATEGORIES</Text>

        {/*View Regroupant les deux catégories supérieur*/}
        <View style={{ flexDirection: "row", height: "40%", marginTop: height /13, }}>

          {/*Catégories */}
          <TouchableOpacity style={styles.boxLeftSide} onPress={() => { navigation.navigate("Informatique") }}>
            <Image style={{ alignSelf: "center", width: "50%", height: "50%", marginBottom: "5%" }} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/icons8-programming-flag-50.png')} />
            <Text style={{ alignSelf: "center", position: "absolute", bottom: "15%", color: "white" }}>Info</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.boxRightSide}  onPress={() => { navigation.navigate("Design") }}>
            <Image style={{ alignSelf: "center", width: "50%", height: "50%", marginBottom: "5%" }} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/icons8-art-book-96.png')} />
            <Text style={{ alignSelf: "center", position: "absolute", bottom: "15%", color: "white" }}>Design</Text>
          </TouchableOpacity>
        </View>

        {/*View Regroupant les deux catégories inférieur*/}
        <View style={{ flexDirection: "row", height: "40%", marginTop: height / 28 }}>
          
          {/*Catégories */}
          <TouchableOpacity style={styles.boxLeftSide} >
            <Image style={{ alignSelf: "center", width: "50%", height: "50%", marginBottom: "5%" }} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/icons8-programming-flag-50.png')} />
            <Text style={{ alignSelf: "center", position: "absolute", bottom: "15%", color: "white" }}>?</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.boxRightSide}  >
            <Image style={{ alignSelf: "center", width: "50%", height: "50%", marginBottom: "5%" }} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/icons8-art-book-96.png')} />
            <Text style={{ alignSelf: "center", position: "absolute", bottom: "15%", color: "white" }}>?</Text>
          </TouchableOpacity>
        </View>
      </View>


      <View style={{ flex: 1, alignItems: "center" }}>


      </View>
    </View>
  );

}
