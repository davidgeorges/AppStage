/* Import de tout ce qu'on a besoin */
import React, { useState,useEffect} from 'react';
import { TextInput, Text, View, Button, TouchableHighlight, Image, TouchableOpacity, Keyboard,BackHandler,TouchableWithoutFeedback } from 'react-native';
import 'react-native-gesture-handler';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

/* Description 

-Page pour se connecter
-Header : logo et titre , 
-Mid : deux text input pour recevoir les données de l'utilisateur ( nom d'utilisateur mot de passe )
-Footer : deux bouttons , connexion et register

------------ */

/* Fonctions */
import * as db from '../Fonctions/firebaseJS';
import * as er from '../Fonctions/printError';

/* Styles */
import styles from '../Styles/styleLogin.js';

/* Icon */
import { AntDesign } from '@expo/vector-icons';


export default function App({ navigation }) {

  /* Variable mail en lowercase */
  var mailS;

  /* Reference au TextInput */
  var myTextInput = React.createRef();
  var myTextInput2 = React.createRef();

  /*Changement de page avec initialisation du login et mdp a = " " ( chaine vide ) et clear input*/
  const goToRegister = () => { setVal(" "), setMail(" "), setPassword(" "), mailS = mail.toLowerCase(), console.log("mail : " + mailS, " password : " + password), myTextInput.current.clear(), myTextInput2.current.clear(), navigation.navigate("Register") };

  /*Hook , login = variable , setLogin = fonction ,  " " = init value */
  const [password, setPassword] = useState(" ");
  const [mail, setMail] = useState(" ");
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(true);
  const [val, setVal] = useState(" ");

  /* On met la barre du téléphone qui contient l'heure en blanc */
  setStatusBarBackgroundColor("white");

  /* A chaque fois qu'on ouvre cette page nous ajoutons un listener pour savoir si on appuie sur le bouton pour revenir en arrière"*/
  useFocusEffect(

    React.useCallback(() => {

      /*Lors de l'appuie sur le bouton pour revenir on arrière on quitte l'application */
      const onBackPress = () => {

        BackHandler.exitApp()
        console.log("Exit App on login page");

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      console.log("Add listener on login page");

      return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
   

    }),

  );
  /* ---------------------------------------------------------------------- */



  return (



    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={styles.image}>
      <View style={styles.top}>
        <View style={styles.topComp}>
          <Image style={styles.logo} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/protesta-vector-png-.png')} />
          <Text style={styles.title}>Welcome to my Internship Project</Text>
        </View>
      </View>
      <View style={styles.mid}>
        <View style={styles.midComp}>
          <View style={styles.sectionStyle}>{/*utilisaton du setLogin pour changer notre variable avec le contenu du text input*/}
            <TextInput ref={myTextInput} onFocus={() => { setVal("") }} placeholder="Mail or Username" placeholderTextColor="gray" style={styles.input} onChangeText={(mail) => setMail(mail)}></TextInput>
            <AntDesign name="user" size={18} color="black" />
          </View>
          <View style={styles.sectionStyle}>
            <TextInput onFocus={() => { setVal("") }} secureTextEntry={visible} ref={myTextInput2} placeholder="Password" placeholderTextColor="gray" style={styles.input}
              onChangeText={(password) => { setPassword(password) }} />
            <TouchableOpacity onPress={() => { setVisible(!(visible)); setShow(!show) }}>
              <MaterialCommunityIcons name={show === false ? 'eye-off-outline' : 'eye-outline'} size={18} color="black" />
            </TouchableOpacity>
          </View>


          {val.length < 1 ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{ color: "red" }}>{val}</Text>
            </Animatable.View>}

        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottomComp}>
          <TouchableHighlight style={styles.login} ><Button title="Login" color="#51355A" disabled={(mail.length > 1 && password.length > 1) ? false : true}
            onPress={() => {
              db.toLogin(mail, password,(val) => {
                if (val) {
                  setVal(er.err2); console.log("Erreur connexion : ", er.err2), Keyboard.dismiss()
                }
                else { console.log("ici lg page "), setMail(" "), setPassword(" "), setVal(" "),navigation.navigate('TabNavigator', { screen: 'Home' })}
              
                 
              })
            }}></Button></TouchableHighlight>
          <TouchableHighlight style={styles.register} ><Button title="Register" onPress={goToRegister} color="#2A0C4E" ></Button></TouchableHighlight>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>

  );
}
