import React, { useState } from 'react';
import { TextInput, Text, View, Button, TouchableHighlight, Image,Keyboard} from 'react-native';
import styles from '../Styles/styleRegister';
import * as db from '../Fonctions/firebaseJS';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import * as er from '../Fonctions/printError';





export default function App({ navigation }) {



  /*Changement de page*/
  const goToLogin = () => {setVal(" "),navigation.navigate("Login")};

  /*Hook , login = variable , setLogin = fonction ,  " " = init value */
  const [username, setUsername] = useState(" ");
  const [name, setName] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [confirmPassword, setConfirmPassword] = useState(" ");
  const [mail, setMail] = useState(" ");
  const [val, setVal] = useState(" ");

  

  return (

    <View style={styles.image}>
      <View style={styles.top}>
        <View style={styles.topComp}>
          <Image style={styles.logo} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/protesta-vector-png-.png')} />
            <Text style={styles.title}>Inscription Page</Text>
        </View>
      </View>


      <View style={styles.mid}>
        <View style={styles.midComp}>



          <View style={styles.sectionStyle}>
            <TextInput placeholder="Username" placeholderTextColor="gray" style={styles.input} onChangeText={(username) => setUsername(username)} />
            <AntDesign name="user" size={18} color="black" /></View>

          <View style={styles.sectionStyle}>
            <TextInput placeholder="Name" placeholderTextColor="gray" style={styles.input} onChangeText={(name) => setName(name)} />
            <AntDesign name="user" size={18} color="black" /></View>

          <View style={styles.sectionStyle}>
            <TextInput secureTextEntry={true} placeholder="Password" placeholderTextColor="gray" style={styles.input} onChangeText={(password) => setPassword(password)} />
            <AntDesign name="lock" size={18} color="black" /></View>

            
          <View style={styles.sectionStyle}>
            <TextInput secureTextEntry={true} placeholder="Confirm Password" placeholderTextColor="gray" style={styles.input} onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)} />
            <AntDesign name="lock" size={18} color="black" /></View>

          <View style={styles.sectionStyle}>
            <TextInput placeholder="Mail" placeholderTextColor="gray" style={styles.input} onChangeText={(mail) => setMail(mail)} />
            <AntDesign name="mail" size={18} color="black" />
          </View>

          {val.length<1 ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{color:"red"}}>{val}</Text>
            </Animatable.View>}

          
        </View>
      </View>


      <View style={styles.bottom}>
        <View style={styles.bottomComp}>
            <TouchableHighlight style={styles.confirm} ><Button color="#51355A" title="Confirm"  onPress={() => db.toRegister(mail, name, password,confirmPassword,username, navigation,(val) =>{if(val){setVal(er.err2);console.log("val : ",er.err2),Keyboard.dismiss()}})} disabled={( mail.length>1 && password.length>1 && confirmPassword.length>1 && name.length>1 && username.length>1 ) ? false : true}></Button></TouchableHighlight>
            <TouchableHighlight style={styles.cancel} ><Button color="#2A0C4E" title="Cancel" onPress={goToLogin} ></Button></TouchableHighlight>
        </View>
      </View>
    </View>

  );
}