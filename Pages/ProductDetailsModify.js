
import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
const { width, height } = Dimensions.get("screen");
import { Dimensions } from 'react-native';

/* Styles */
import styles from '../Styles/styleProductDetails';

/* Component */
import Footer from "../Components/Footer2"

/* Icon */
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

/* Fonctions */
import * as db from '../Fonctions/firebaseJS';

/* Description 

-Page contenant les infos d'un article et pour supprimer l'article.
-Header  : boutton pour revenir en arrière et supprimer article.
-Mid : contenu de l'article.
-Footer  : contenant 3 options pour se rediriger vers la catégories précédentes, vers la page principale et vers la catégories suivante.

------------ */

export default function ProductDetailsModify({ route, navigation: { goBack }, navigation }) {

  /*on récupère les données passer en paramètres lors du .map dans la catégorie concerner*/
  const { data } = route.params;


  return (


    <View style={styles.image}>

      <View style={{ flex: 0.64, width: "90%", alignSelf: "center", borderBottomWidth: 1,justifyContent:"center",alignSelf: 'center', }}>
        <TouchableOpacity style={{justifyContent:"center"}} onPress={() => { goBack() }}>
          <Ionicons style={{alignContent:"center"}} name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{
          justifyContent: "center", alignSelf: 'center', backgroundColor: '#001242',
          borderRadius: 40, height: height / 20, width: width / 1.6, position: "absolute"
        }} onPress={() => {
          db.delArticle(data.category, data.id, data.title, () => {
            if (true) {
              navigation.navigate('TabNavigator', { screen: 'Profile' })
            }
          })
        }}>
          <AntDesign style={{ alignSelf: 'center', position: "absolute", left: "5%" }} name="minuscircleo" size={20} color="white" />
          <Text style={{ alignSelf: "center", color: "white" }}>Delete article</Text></TouchableOpacity>


      </View>

      <View style={{ flex: 2, width: "90%", alignSelf: "center" }}>
        <Text style={{
          marginTop: height / 14, alignSelf: "center", color: 'black', borderBottomWidth: 1, paddingBottom: 5,
        }}>{data.titleToShow}</Text>

        <Text style={{ marginTop: height / 14, letterSpacing: 0.1, lineHeight: 30, color: 'black' }}>{data.description}</Text>
      </View>

      <View style={{ flex: 2, width: "90%", alignSelf: "center" }}>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ alignSelf: "center", position: "absolute", top: height / 7 }}>Published from : {data.usernameToShow}</Text>
          <Text style={{ alignSelf: "center", position: "absolute", top: height / 7, right: 0 }}>Date : {data.date}</Text>
        </View>




        <Text style={{ alignSelf: "center", color: "black", position: "absolute", top: height / 4.5}}>Contact me at :</Text>

        <View style={{
          justifyContent: "center", alignSelf: 'center',
          height: height / 18, width: width / 1.2, position: "absolute", bottom: height / 30
        }}>
          <Text style={{ alignSelf: "center", color: "black" }}>{data.mail}</Text>
        </View>



      </View>

      <View style={{ flex: 0.5, width: "100%", alignSelf: "center" }}>
        <Footer func={() => { navigation.navigate('TabNavigator', { screen: 'Home' }) }}></Footer>
      </View>



    </View>






  )

}