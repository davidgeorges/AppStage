import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Image, View, Text, Pressable, Touchable, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native';
const { width, height } = Dimensions.get("screen");
import { Dimensions } from 'react-native';

/* Icon */
import { FontAwesome } from '@expo/vector-icons';

/* Styles */
import styles from 'C:/Users/S/Desktop/React_App_Stage/App_Stage/Styles/styleProfile';

/* Fonctions */
import * as db from '../Fonctions/firebaseJS';
import * as cl from "../Fonctions/clientFonction"

export default function App({ navigation, route }) {

  /* useState */
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [val, setVal] = useState(" ");

  /* Creation des view selon le nombre d'annonce */
  const profileArticle = () => {
    let listProfileArticle = [];

    data.map((data, i) => {

      listProfileArticle.push(

        <TouchableHighlight key={i} style={{ borderRadius: 5, width: "90%", height: "10%", backgroundColor: '#51355A', alignSelf: "center", marginBottom: height / 34 }} onPress={() => {
          navigation.navigate('ProductDetails', { data: data })
        }}>
          <View   >
            <Text style={{ color: "#F5F8DE", alignSelf: "center", marginTop: "1%" }}>Title : {data.title} </Text>
          </View>
        </TouchableHighlight>
      )
    })
    //console.log("'Ar : ",lstArticle)
    return listProfileArticle
  }

  /* Decla tab */
  var tabArticle = [];

  /* USE EFFECT */
  useEffect(() => {

    /* Donne la navigation au client */
    db.getUserArticle(tabArticle, "info_Article", cl.usernameLowerCase, () => {
      setData(tabArticle)
      setLoading(false);
    });
    /*----------------------------- */



  }, []) /*Tableau vide =  va être executer qu'une seule fois au lancement*/
  /* --------------------------------------------------------------------------- */



  //BackHandler.removeEventListener("hardwareBackPress", backAction);

  return (

    <View style={styles.image}>
      <View style={{ flex: 1, backgroundColor: '#51355A', borderBottomLeftRadius: 40, borderBottomRightRadius: 40, }}>
        <Text style={{ alignSelf: "center", marginTop: "10%", borderBottomWidth: 1 }}>PROFILE</Text>
      </View>

      <View style={{ flex: 2, marginTop: "8%", }}>

        <View style={styles.action}>
          <FontAwesome style={{ marginLeft: "3%", marginRight: "3%" }} name="user-o" size={24} />
          <Text style={{ alignSelf: "center" }}>Username : {cl.username}</Text>
        </View>

        <View style={styles.action}>
          <FontAwesome style={{ marginLeft: "3%", marginRight: "3%" }} name="user-o" size={24} />
          <Text style={{ alignSelf: "center" }}>Name : {cl.name}</Text>
        </View>

        <View style={styles.action}>
          <FontAwesome style={{ marginLeft: "3%", marginRight: "3%" }} name="user-o" size={24} />
          <Text style={{ alignSelf: "center" }}>Mail : {cl.mail}</Text>
        </View>

      </View>

      <View style={{ flex: 4, }}>

        <View>
          <Text style={{ alignSelf: "center", borderBottomWidth: 1 }}>LIST ANNOUNCE : </Text>

        </View>

        <View>
          <Text style={{ marginLeft: "3%", marginTop: "3%" }}>Nb Announce : {cl.nbAnnounce}</Text>
        </View>

        <View style={{marginTop:"5%"}}></View>
        {profileArticle()}
       

      </View>

    </View>

  );
}
