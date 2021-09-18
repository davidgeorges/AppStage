import React, { useState } from 'react';
import { TextInput, Text, View, Button, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';

/* Styles */
import styles from '../Styles/styleRegister';

/* Fonctions */
import * as db from '../Fonctions/firebaseJS';
import * as er from '../Fonctions/printError';

/* Icon */
import { AntDesign } from '@expo/vector-icons';
import { height } from '../Styles/styleAnnounce';

/* Description 

-Page pour s'inscrire
-Header : logo et titre , 
-Mid : cinq text input pour recevoir les données de l'utilisateur (Username,Name,Password,Confirm Password,Mail)
-Footer : deux bouttons , confirm et cancel 

------------ */

export default function Register({ navigation }) {



  /*Changement de page*/
  const goToLogin = () => { setError(" "), navigation.navigate("Login") };

  /*Hook , login = variable , setLogin = fonction ,  " " = init value */
  const [username, setUsername] = useState(" ");
  const [name, setName] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [confirmPassword, setConfirmPassword] = useState(" ");
  const [mail, setMail] = useState(" ");
  const [error, setError] = useState(" ");



  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={styles.image}>
        <View style={styles.top}>
          <View style={styles.topComp}>
            <Image style={styles.logo} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/protesta-vector-png-.png')} />
            <Text style={styles.title}>Inscription Page</Text>
          </View>
        </View>

        <ScrollView style={{ flex: 1 /*backgroundColor: "yellow"*/ }}>

          <View style={{ flex: 2,alignSelf:"center",paddingTop:height/60}}>



              <View style={styles.sectionStyle}>
                <TextInput onFocus={() => { setError("") }} placeholder="Username" placeholderTextColor="gray" style={styles.input} onChangeText={(username) => setUsername(username)} />
                <AntDesign name="user" size={18} color="black" /></View>

              <View style={styles.sectionStyle}>
                <TextInput onFocus={() => { setError("") }} placeholder="Name" placeholderTextColor="gray" style={styles.input} onChangeText={(name) => setName(name)} />
                <AntDesign name="user" size={18} color="black" /></View>

              <View style={styles.sectionStyle}>
                <TextInput onFocus={() => { setError("") }} secureTextEntry={true} placeholder="Password" placeholderTextColor="gray" style={styles.input} onChangeText={(password) => setPassword(password)} />
                <AntDesign name="lock" size={18} color="black" /></View>


              <View style={styles.sectionStyle}>
                <TextInput onFocus={() => { setError("") }} secureTextEntry={true} placeholder="Confirm Password" placeholderTextColor="gray" style={styles.input} onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)} />
                <AntDesign name="lock" size={18} color="black" /></View>

              <View style={styles.sectionStyle}>
                <TextInput onFocus={() => { setError("") }} placeholder="Mail" placeholderTextColor="gray" style={styles.input} onChangeText={(mail) => setMail(mail)} />
                <AntDesign name="mail" size={18} color="black" />
              </View>

              {error.length < 1 ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={{ color: "red" }}>{error}</Text>
                </Animatable.View>}


          </View>
        </ScrollView>


        <View style={styles.bottom}>
          <View style={styles.bottomComp}>
            <TouchableOpacity style={styles.confirm} ><Button color="#51355A" title="Confirm" onPress={() => db.toRegister(mail, name, password, confirmPassword, username, navigation, (error) => { if (error.length > 1) { setError(er.err2); console.log("Erreur connexion : ", er.err2), Keyboard.dismiss() } })} disabled={(mail.length > 1 && password.length > 1 && confirmPassword.length > 1 && name.length > 1 && username.length > 1) ? false : true}></Button></TouchableOpacity>
            <TouchableOpacity style={styles.cancel} ><Button color="#2A0C4E" title="Cancel" onPress={goToLogin} ></Button></TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>

  );
}
