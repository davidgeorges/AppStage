import React, { useEffect } from 'react';
import { Text, View,Image } from 'react-native';
import { setInfo } from '../Fonctions/firebaseJS';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Description 

-Page loading screen
-Mid : Logo et text "Loading..."

------------ */


export default function SplashScreen({ navigation }) {


    /*onction async on attend la données avec le mot clé await et ensuite on déroule le code (méthode différente des callback pour les fonction  asynchrone)*/
    const readData = async () => {

        //AsyncStorage.getItem prend en charge seulement les chaine de caractères JSON.parse pour convertir une chaine de caractère en un objet/valeur js
        const userData = await AsyncStorage.getItem("userData");
        let data = JSON.parse(userData);


        /*Si data contient aucune info on n'est pas connecter*/
        if (data == null) {
            
            console.log("User LG : ");
            navigation.navigate("Login");

        } else {

            /*Sinon data contient les info on se connecte automatiquement*/
            navigation.navigate('TabNavigator', { screen: 'Home' });
            
            setInfo(data.user.email);
            console.log("User TB : ", data.user);

        }

    }

  




    useEffect(() => {

            /*on attend 700ms et on execute la fonction*/
            setTimeout(() => {
            
                readData()
                
            }, 700)

    },[])/*Tableau vide =  va être executer qu'une seule fois au lancement*/


    return (
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
            <Image style={{ width: 100, height: 65, alignSelf: "center", justifyContent: 'center', marginRight: "2.5%" }} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/protesta-vector-png-.png')} />
            <Text style={{ marginTop: "5%", alignSelf: "center", justifyContent: 'center', marginLeft: "2.5%" }}>Loading...</Text>
        </View>

    )

}