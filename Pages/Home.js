import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Text, View, Button, TouchableHighlight, Alert, BackHandler, Image } from 'react-native';
import * as db from '../Fonctions/firebaseJS';
import * as cl from "../Fonctions/clientFonction"
import * as st from "../Fonctions/setItemInfo"
import { useFocusEffect } from '@react-navigation/native';
import styles from 'C:/Users/S/Desktop/React_App_Stage/App_Stage/Styles/styleHome';
import { FontAwesome } from '@expo/vector-icons';
import Item from "../Components/Item"
import firebase from 'firebase'
import "firebase/auth";
import "firebase/database";
import 'firebase/firestore';




/* xComp = x component */

export default function App(props, { navigation }) {

  let tab = [];
  const [loading, setLoading] = useState(true);
  const [text, setText] = React.useState('');
  const [data, setData] = useState([]);
  cl.setNavigation(navigation);


  async function test(){


   const snapshot = await firebase.firestore().collection("items").doc("week1").collection("set1").get()

   const view = [];
  
   snapshot.docs.map(doc => { view.push( <View><Text>{doc.data()}</Text></View>)});

   return view;

  }


  useEffect(() => {

  

  }, []) /*Tableauv vide =  va être executer qu'une seule fois au lancement*/

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

  //BackHandler.removeEventListener("hardwareBackPress", backAction);


  {/*if (loading) {
    return (<View style={{ height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>)
  }*/}

  return (

    

    <View style={styles.image}>
        {()=>{test}}
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        {/*<Image style={styles.logo} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/protesta-vector-png-.png')} />*/}
        <FontAwesome style={styles.headerBars} name="bars" size={24} color="black" onPress={() => navigation.toggleDrawer()} />
      </View>


      <View style={styles.mid}>


        <View style={styles.recTop}>

          <Item styleRec={styles.recComp1} styleMiniRec={styles.miniRecComp1} val={[st.setItem.item1.title, st.setItem.item1.price]}></Item>
          <Item styleRec={styles.recComp2} styleMiniRec={styles.miniRecComp2} val={[st.setItem.item2.title, st.setItem.item2.price]}></Item>

        </View>


        <View style={styles.recBot}>

          <Item styleRec={styles.recComp3} styleMiniRec={styles.miniRecComp3} val={[st.setItem.item3.title, st.setItem.item3.price]}></Item>
          <Item styleRec={styles.recComp4} styleMiniRec={styles.miniRecComp4} val={[st.setItem.item4.title, st.setItem.item4.price]}></Item>

        </View>


      </View>

      <View style={styles.footer}>
        {/*() => db.toLogin(login, password, navigation, myTextInput, myTextInput2, () => { setLogin(" "), setPassword(" ") })*/}
        {/*<TouchableHighlight style={styles.testBtn} ><Button title="Register" onPress={goToRegister} color="#9C27B0"></Button></TouchableHighlight>*/}
        <TouchableHighlight style={styles.retourBtn} ><Button title="RETOUR" color="#51355A" onPress={() => { setLoading(true) }}></Button></TouchableHighlight>
      </View>

    </View>

  );

}
