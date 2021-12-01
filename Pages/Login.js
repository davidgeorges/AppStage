/* Description 

-Page pour se connecter
-Header : logo et titre , 
-Mid : deux text input pour recevoir les données de l'utilisateur ( nom d'utilisateur mot de passe )
-Footer : deux bouttons , connexion et register

------------ */

/* Import de tout ce qu'on a besoin */
import React, {useState} from 'react';
import { TextInput, Text, View, Button, TouchableOpacity, Image, Keyboard, BackHandler, TouchableWithoutFeedback } from 'react-native';

/* Import pour modifier la couleur de  */
import { setStatusBarBackgroundColor } from 'expo-status-bar';

/* Import d'icon */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

/* Import d'useFocusEffect ( va déclencher une fonction lors du focus sur l'écran ) */ 
import { useFocusEffect } from '@react-navigation/native';

/* Import pour animer un text */
import * as Animatable from 'react-native-animatable';

/* Import fonction login et fonction pour gérer les erreurs */
import { toLogin }  from '../Fonctions/firebaseJS';
import * as er from '../Fonctions/printError';

/* Import de styles */
import styles from '../Styles/styleLogin.js';




/* on export la function Login */
export default function Login({ navigation }) {

  /* Variable mail en lowercase */
  var mailS;

  /* Reference au TextInput */
  var myTextInput = React.createRef();
  var myTextInput2 = React.createRef();

  /*Hook , login = variable , setLogin = fonction ,  " " = init value */
  const [password, setPassword] = useState(" ");
  const [mail, setMail] = useState(" ");
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState(" ");
  /* ----------------------------------------------------------------- */

  /* On met la barre du téléphone qui contient l'heure en blanc */
  setStatusBarBackgroundColor("white");

  /* A chaque fois qu'on ouvre cette page nous ajoutons un listener pour savoir si on appuie sur le bouton pour revenir en arrière"*/
  useFocusEffect(

    React.useCallback(() => {

      /*Lors de l'appuie sur le bouton pour revenir en arrière on quitte l'application */
      const onBackPress = () => {

        BackHandler.exitApp()
        console.log("Exit App on login page");

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      console.log("Add listener on login page");

      return () =>{
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }

    }),
  );
  /* ---------------------------------------------------------------------- */



  return (


    /* Composant qui va desactiver le clavier du téléphone lors d'un appui sur un endroit de la page */
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={styles.image}>

        {/* View avec un style défini qui va prendre environ 1/4 de la page */}
        <View style={styles.top}>
          <View style={styles.topComp}>

            {/* Composant Image avec un défini dans notre fichier styleLogin.js et une source pour le lien de l'image */}
            <Image style={styles.logo} source={require('C:/Users/S/Desktop/React_App_Stage/App_Stage/Images/protesta-vector-png-.png')} />

            {/* Composant Text avec un style défini dans notre fichier styleLogin.js et le texte entre les deux balises qui est celui a afficher */}
            <Text>Welcome to my Internship Project</Text>

          </View>
        </View>

        {/* View avec un style défini qui va prendre environ 2/4 de la page */}
        <View style={styles.mid}>
          <View style={styles.midComp}>
            <View style={styles.sectionStyle}>

              {/* Composant TextInput pour la saisie de valeur , avec la création de ref sur ce TextInput pour effacer sa valeur lors de changement de page.
              onFocus qui va 'effacer' la valeur de la variable error et donc enleve le message d'erreur qui a apparu après un échec de connexion.
              placeholder pour afficher le texte dans le TextInput pour indiquer a l'utilisateur la valeur a saisir.
              placeholderTextColor la couleur du placeholder
              onChangeText pour stocker la valeur de la valeur saisie dans une variable, un style défini dans notre fichier styleLogin.js */}
              <TextInput onFocus={() => { setError("") }} ref={myTextInput} placeholder="Mail or Username" placeholderTextColor="gray" style={styles.input} onChangeText={(mail) => setMail(mail)}></TextInput>

              {/*Composant Logo, avec son nom, taille et couleur */}
              <AntDesign name="user" size={18} color="black" />
            </View>

            <View style={styles.sectionStyle}>
              {/* Composant TextInput pour la saisie de valeur , avec des paramètres :
              une référence sur le TextInpout pour pourvoir effacer sa valeur lors de changement de page.
              secureTextEntry pour pouvoir visualiser le mot de passe ou le masqué par des étoiles.
              onFocus qui va 'effacer' la valeur de la variable error et donc enlever le message d'erreur qui est apparu après un échec de connexion.
              placeholder pour afficher le texte dans le TextInput pour indiquer a l'utilisateur la valeur a saisir.
              placeholderTextColor la couleur du placeholder.
              onChangeText pour stocker la valeur saisie dans une variable, un style défini dans notre fichier styleLogin.js */}
              <TextInput onFocus={() => { setError("") }} ref={myTextInput2} secureTextEntry={visible} placeholder="Password" placeholderTextColor="gray" style={styles.input}
                onChangeText={(password) => { setPassword(password) }} />
              {/* Composant TouchableOpacity qui éclaircit l'opacité de tout l'élément lorsque vous appuyez dessus et qui va contenir un bouton qui va afficher ou masque le mot de passe, 
              lors du clique sur le logo  pour afficher ou masqué le mot de passe on change l'état local de la variable (hooks) show qui va directement
              rafraichir et mettre le bon logo a afficher.*/}
              <TouchableOpacity onPress={() => { setVisible(!(visible)); setShow(!show) }}>
                {/* Composant Logo, si la variable show est a false le mot de passe est masqué sinon il est afficher */}
                <MaterialCommunityIcons name={show === false ? 'eye-off-outline' : 'eye-outline'} size={18} color="black" />
              </TouchableOpacity>
            </View>
            {/*utilisaton du setLogin pour changer notre variable avec le contenu du text input*/}
            {error.length < 1 ? null :
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{ color: "red" }}>{error}</Text>
              </Animatable.View>}
          </View>
        </View>

        {/* View avec un style défini qui va prendre environ 1/4 de la page */}
        <View style={styles.bottom}>
          <View style={styles.bottomComp}>
            {/* Composant TouchableOpacity qui éclaircit l'opacité de tout l'élément lorsque vous appuyez dessus et qui va contenir un bouton qui va afficher ou masque le mot de passe, 
            lors du clique sur le logo  pour afficher ou masqué le mot de passe on change l'état local de la variable (hooks) show qui va directement
            rafraichir et mettre le bon logo a afficher.*/}
            <TouchableOpacity style={styles.login} >
              <Button title="Login" color="#51355A" disabled={(mail.length > 1 && password.length > 1) ? false : true}
                onPress={() => {
                  toLogin(mail, password, (error) => {
                    if (error) {
                      setError(er.err2); console.log("Erreur connexion : ", er.err2), Keyboard.dismiss()
                    }
                    else { console.log("ici lg page "), setMail(" "), setPassword(" "), setError(" "), navigation.navigate('TabNavigator', { screen: 'Home' }) }
                  })
                }}>
              </Button>
              </TouchableOpacity>

                {/* Changement de page avec initialisation du login et mdp a = " " ( chaine vide ) et clear input */}
            <TouchableOpacity style={styles.register}><Button title="Register" onPress={() =>{setError(" "), setMail(" "), setPassword(" "), mailS = mail.toLowerCase(), console.log("mail : " + mailS, " password : " + password), myTextInput.current.clear(), myTextInput2.current.clear(), navigation.navigate("Register")}} color="#2A0C4E" ></Button></TouchableOpacity>
          </View>
        </View>

      </View>

    </TouchableWithoutFeedback>

  );
}


