
import React from 'react';
import {  View, Text,TouchableOpacity,ActivityIndicator} from 'react-native';
const { width, height } = Dimensions.get("screen");
import { Dimensions } from 'react-native';

/* Styles */
import styles from '../Styles/styleProductDetails';

/* Component */
import Footer from "../Components/Footer2"

/* Icon */
import { Ionicons } from '@expo/vector-icons';


/* Fonctions */
import * as db from '../Fonctions/firebaseJS';

export default function App({ route, navigation: { goBack },navigation}) {

 const { data } = route.params;


  return (


    <View style={styles.image}>

      <View style={{ flex: 0.5, width: "90%", alignSelf: "center",borderBottomWidth:1  }}>
        <TouchableOpacity onPress={() => { goBack() }}>
          <Ionicons style={{ marginTop: height / 28 }} name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 2,  width: "90%", alignSelf: "center" }}>
        <Text style={{ marginTop: height /14, alignSelf: "center" }}>{data.titleToShow}</Text>

        <Text style={{ marginTop: height / 14,letterSpacing: 0.1, lineHeight: 30, }}>{data.description}</Text>
      </View>

      <View style={{ flex: 2, width: "90%", alignSelf: "center"}}>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ alignSelf: "center", position: "absolute", top: height / 6 }}>Published from : {data.usernameToShow}</Text>
          <Text style={{ alignSelf: "center", position: "absolute", top: height / 6 ,right: 0 }}>Date : {data.date}</Text>
        </View>


    
          <Text style={{ alignSelf: "center", color: "black",position: "absolute", bottom: height / 10 }}>Contact info : {data.mail}</Text>
      

        <TouchableOpacity style={{
          justifyContent: "center", alignSelf: 'center', backgroundColor: '#001242',
          borderRadius: 40, height: height / 22, width: width / 1.6, position: "absolute", bottom: height / 30
        }} onPress={() =>{db.delArticle(data.category,data.id,data.title,()=>{
          if(true){
            
            navigation.navigate('TabNavigator', { screen: 'Profile' })
            
          }
        })}}>
          <Text style={{ alignSelf: "center",color:"white" }}>Delete article</Text></TouchableOpacity>


      </View>

      <View style={{ flex: 0.5, width: "100%", alignSelf: "center" }}>
      <Footer func={() => { navigation.navigate("TabNavigator") }}></Footer>
      </View>

        

    </View>
 





  )

}