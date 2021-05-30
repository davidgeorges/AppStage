import React, { useState } from 'react';
import { TextInput, Text, View, Button, TouchableHighlight, Image, TouchableOpacity,Keyboard } from 'react-native';
import styles from '../Styles/styleLogin.js';
import 'react-native-gesture-handler';
import * as db from '../Fonctions/firebaseJS';
import * as er from '../Fonctions/printError';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';





export default function App({ navigation }) {

  var mailS;
  /* Reference au TextInput */
  var myTextInput = React.createRef();
  var myTextInput2 = React.createRef();

  /*Changement de page avec initialisation du login et mdp a = " " ( chaine vide ) et clear input*/
  const goToRegister = () => { setVal(" "),setMail(" "), setPassword(" "),mailS=mail.toLowerCase(), console.log("mail : " + mailS, " password : " + password), myTextInput.current.clear(), myTextInput2.current.clear(), navigation.navigate("Register") };

  /*Hook , login = variable , setLogin = fonction ,  " " = init value */
  const [password, setPassword] = useState(" ");
  const [mail, setMail] = useState(" ");
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(true);
  const [val, setVal] = useState(" ");
  setStatusBarBackgroundColor("#FFF8F0");


  return (



    <View style={styles.image}>
      <View style={styles.top}>
        <View style={styles.topComp}>
          <Image style={styles.logo} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/protesta-vector-png-.png')} />
          <Text style={styles.title}>Welcome to my Stage Project</Text>
        </View>
      </View>
      <View style={styles.mid}>
        <View style={styles.midComp}>
          <View style={styles.sectionStyle}>{/*utilisaton du setLogin pour changer notre variable avec le contenu du text input*/}
            <TextInput ref={myTextInput} onFocus={() =>{setVal("")}} placeholder="Mail or Username" placeholderTextColor="gray" style={styles.input} onChangeText={(mail) => setMail(mail)}></TextInput>
            <AntDesign name="user" size={18} color="black" />
          </View>
          <View style={styles.sectionStyle}>
            <TextInput secureTextEntry={visible} ref={myTextInput2} placeholder="Password" placeholderTextColor="gray" style={styles.input}
              onChangeText={(password) => { setPassword(password) }} />
            <TouchableOpacity onPress={() => { setVisible(!(visible)); setShow(!show) }}>
              <MaterialCommunityIcons name={show === false ? 'eye-off-outline' : 'eye-outline'} size={18} color="black" />
            </TouchableOpacity>
          </View>

          {val.length<1 ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{color:"red"}}>{val}</Text>
            </Animatable.View>}

        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottomComp}>
          <TouchableHighlight style={styles.login} ><Button title="Login" color="#51355A" onPress={()=>{navigation.navigate("MainPagesDrawer")}}></Button></TouchableHighlight>
          <TouchableHighlight style={styles.register} ><Button title="Register" onPress={goToRegister} color="#2A0C4E" ></Button></TouchableHighlight>
        </View>
      </View>
    </View>

  );
}
