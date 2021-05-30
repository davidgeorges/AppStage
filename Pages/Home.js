import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Text, View, Button, TouchableHighlight, Alert, BackHandler, Image } from 'react-native';
import * as db from '../Fonctions/firebaseJS';
import * as cl from "../Fonctions/clientFonction"
import * as st from "../Fonctions/setItemInfo"
import { useFocusEffect } from '@react-navigation/native';
import styles from 'C:/Users/S/Desktop/React_App_Stage/App_Stage/Styles/styleHome';
import { FontAwesome } from '@expo/vector-icons';
import Item from "../Components/Item"



/* xComp = x component */

export default function App({ navigation }) {


  const [loading, setLoading] = useState(true);
  const [text, setText] = React.useState('');
  const [data,setData]= useState([]);
  cl.setNavigation(navigation);


  useEffect(() => {

    
      db.getSetItem("", (val) => {
        setData(val);
        setLoading(false);
      })


  },[]) /*Tableauv vide =  va être executer qu'une seule fois au lancement*/

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


  if (loading) {
    return (<View style={{ height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>)
  }

  return (


    <View style={styles.image}>

      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        {/*<Image style={styles.logo} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/protesta-vector-png-.png')} />*/}
        <FontAwesome style={styles.headerBars} name="bars" size={24} color="black" onPress={() => navigation.toggleDrawer()} />
      </View>


      <View style={styles.mid}>


      {data.map(data => <Item styleRec={styles.recComp1} styleMiniRec={styles.miniRecComp1} val={[data.title,data.price]}></Item>)}




      </View>

      <View style={styles.footer}>
        {/*() => db.toLogin(login, password, navigation, myTextInput, myTextInput2, () => { setLogin(" "), setPassword(" ") })*/}
        {/*<TouchableHighlight style={styles.testBtn} ><Button title="Register" onPress={goToRegister} color="#9C27B0"></Button></TouchableHighlight>*/}
        <TouchableHighlight style={styles.retourBtn} ><Button title="RETOUR" color="#51355A" onPress={() => { setLoading(true) }}></Button></TouchableHighlight>
      </View>

    </View>

  );

}
