import React from 'react';
import { Text, View, BackHandler, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");

/* Description 

-Page Principal de l'application contenant les 4 catégories , ( Informatique, Design, Sport, VideoGame), section cliquable qui redirige vers la catégorie.
-Header : avec un bouton qui redirige vers la page pour ajouter une annonce.
-Footer : contenant 2 options pour se rediriger vers le profile ou sur la page de paramètre du compte ( et contenant la section pour se rediriger vers la page home si nous somme sur les deux autres pages).

------------ */

/* Styles */
import styles from '../Styles/styleHome';



/* Icon */
import { Ionicons } from '@expo/vector-icons';


export default function Home({ navigation }) {


  /* Changement de la couleur de la bare qui contient l'heure,wifi... */
  setStatusBarBackgroundColor("");


  /*Pour empecher le fait de revenir en arrière sur la page HOME "*/
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {

        BackHandler.exitApp()
        console.log("Exit App on home page");
        return true;
      };

      
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      console.log("Add listener on home page");


      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }),
  );
  /* ---------------------------------------------------------------------- */



  return (

    <View style={styles.image}>

      <View style={{ flex: 1, backgroundColor: 'white', height: height / 18, borderBottomWidth: 1, width: "90%", alignSelf: 'center',justifyContent:"center" }}>

        <TouchableOpacity style={{
          justifyContent: "center", alignSelf: 'center', backgroundColor: '#001242',
          borderRadius: 40, height: height / 20, width: width / 1.6, position: "absolute",
        }} onPress={() => { navigation.navigate("Article") }}>
          <Ionicons style={{ alignSelf: 'center', position: "absolute", left: "5%" }} name="add-circle-outline" size={24} color="white" />
          <Text style={{ alignSelf: "center", color: "white" }}>Add an article</Text></TouchableOpacity>


      </View>

      <View style={{ flex: 6, marginTop: "6%",/*backgroundColor:"#C78888"*/ }}>

        <Text style={{ alignSelf: "center", position: "absolute", color: "black", fontSize: 22 }}>SHOP CATEGORY</Text>

        {/*View Regroupant les deux catégories supérieur*/}
        <View style={{ flexDirection: "row", height: "40%", marginTop: height / 16, }}>

          {/*Catégories */}
          <TouchableOpacity style={{
            width: "45%", height: "100%", marginLeft: "5%",/*backgroundColor:"#9E2B25",*/justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1
          }} onPress={() => { navigation.navigate("Informatique") }}>
            {width >= 575.98 ? <Image style={{ alignSelf: "center", width: width / 5, height: height / 7, marginBottom: "5%" }} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/informatique.png')} />
              : <Image style={{ alignSelf: "center", width: width / 3.2, height: height / 7, marginBottom: "5%" }} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/informatique.png')} />
            }
            <Text style={{ alignSelf: "center", position: "absolute", bottom: "15%", color: "black" }}>COMPUTING</Text>
          </TouchableOpacity>


          <TouchableOpacity style={{
            width: "45%",
            height: "100%",
            // backgroundColor:"#9E2B25",
            justifyContent: 'center', alignItems: 'center', marginRight: "21%", borderLeftWidth: 1, borderBottomWidth: 1
          }} onPress={() => { navigation.navigate("Design") }}>
            {width >= 575.98 ? <Image style={{ alignSelf: "center", width: width / 5, height: height / 7, marginBottom: "5%" }} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/design.png')} />
              : <Image style={{ alignSelf: "center", width: width / 3.2, height: height / 7, marginBottom: "5%" }} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/design.png')} />
            }
            <Text style={{ alignSelf: "center", position: "absolute", bottom: "15%", color: "black" }}>DESIGN</Text>
          </TouchableOpacity>
        </View>


        {/*View Regroupant les deux catégories inférieur*/}
        <View style={{ flexDirection: "row", height: "40%" }}>

          {/*Catégories */}
          <TouchableOpacity style={styles.boxLeftSide2} onPress={() => { navigation.navigate("VideoGame") }} >
            {width >= 575.98 ? <Image style={{ alignSelf: "center", width: width / 5, height: height / 7, marginBottom: "5%" }} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/jeu-video.png')} />
              : <Image style={{ alignSelf: "center", width: width / 3.2, height: height / 7, marginBottom: "5%" }} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/jeu-video.png')} />
            }
            <Text style={{ alignSelf: "center", position: "absolute", bottom: "15%", color: "black" }}>VIDEO GAMES</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.boxRightSide2} onPress={() => { navigation.navigate("Sport") }}>
            {width >= 575.98 ? <Image style={{ alignSelf: "center", width: width / 5, height: height / 7, marginBottom: "5%" }} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/sport.png')} />
              : <Image style={{ alignSelf: "center", width: width / 3.2, height: height / 7, marginBottom: "5%" }} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/sport.png')} />
            }
            <Text style={{ alignSelf: "center", position: "absolute", bottom: "15%", color: "black" }}>SPORT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );

}
