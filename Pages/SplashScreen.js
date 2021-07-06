import React, { useEffect } from 'react';
import { Text, View,Image } from 'react-native';
import { setInfo } from '../Fonctions/firebaseJS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

export default function SplashScreen({ navigation }) {
    const isFocused = useIsFocused();


    /* A TESTER 29/06/21  Fonction async on attend la données avec le mot clé await et ensuite on déroule le code (méthode différente des callback pour les fonction  asynchrone) */
    const readData = async () => {

        // AsyncStorage prend en charge seulement les chaine de caractères JSON.parse pour convertir  d'une chaine de caractère un objet/valeur js
        const userData = await AsyncStorage.getItem("userData");
        let data = JSON.parse(userData);


        if (data == null) {
            console.log("User LG : ", data)
            navigation.navigate("Login")

        } else {
            navigation.navigate('TabNavigator', { screen: 'Home' });
            setInfo(data.user.email)
            console.log("User TB : ", data.user)

        }
        console.log('Done.')

    }




    useEffect(() => {

        if (isFocused) {
            setTimeout(() => {
            
                readData()

            }, 700)
        }

    }, [isFocused])


    return (
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
            <Image style={{ width: 100, height: 65, alignSelf: "center", justifyContent: 'center', marginRight: "2.5%" }} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/protesta-vector-png-.png')} />
            <Text style={{ marginTop: "5%", alignSelf: "center", justifyContent: 'center', marginLeft: "2.5%" }}>Loading...</Text>
        </View>

    )

}