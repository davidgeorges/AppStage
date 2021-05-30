/* Database File , Function , Variables ... */
import firebase from 'firebase'
import "firebase/auth";
import "firebase/database";
import 'firebase/firestore';
import { Alert } from 'react-native';
import * as er from "./printError"
import * as cl from "./clientFonction"
import * as st from "./setItemInfo"




/*Fonction pour se connecter avec nom d'utilisateur ou mail (TEST 28/05/21) , passwordReceive, navigation, myTextInput, myTextInput2, callbackF*/
export const toLogin2 = (mailReceive, passwordReceive, navigation, myTextInput, myTextInput2, callbackClear, callbackError) => {

  var mailReceiveLowerCase = mailReceive.toLowerCase();

  /* On considère qu'ont se connecte avec une adresse mail*/
  if (mailReceiveLowerCase.includes("@")) {
    /* Connexion avec mail et mot de passe */
    firebase.auth().signInWithEmailAndPassword(mailReceiveLowerCase, passwordReceive)
      .then((result) => {//Si on a réussi on fait un petit affichage et on se redirige vers la page Home 

        /* On efface les champs des textInput dans la page login*/
        clearInput(myTextInput, myTextInput2);
        /* Callback pour renitialiser les valeur des variables login et password dans la page login ( code dans la page login ) */
        callbackClear();
        console.log("Mail receive:", mailReceiveLowerCase);
        setInfo(mailReceiveLowerCase);
        /* on va dans la page home */
        goToHome(navigation);



      })
      .catch((error) => {//Si on n'a pas réussi on fait un affichage
        //console.log(error);
        er.printError2(error.code, false);
        callbackError(true);


      })
  }
  /* On considère qu'ont se connecte avec un nom d'utilisateur*/
  else {
    isUsernameUsed(mailReceiveLowerCase, (val) => {
      /* Si le nom d'utilisateur existe on continue*/
      if ((val)) {
        /* Avec le nom d'utilisateur on récupère l'adresse mail */
        getMail(mailReceiveLowerCase, (val) => {
          /* Connexion avec mail et mot de passe */
          firebase.auth().signInWithEmailAndPassword(val, passwordReceive)
            .then((result) => {

              /* On efface les champs des textInput dans la page login et on va dans la page home */
              clearInput(myTextInput, myTextInput2);
              /*Callback pour renitialiser les valeur des variables login et password dans la page login ( code dans la page login ) */
              callbackClear();
              console.log("Mail receive 2 : ", val);
              setInfo(val);

              /* on va dans la page home */
              goToHome(navigation);

            })
            .catch((error) => {//Si on n'a pas réussi on fait un affichage

              console.log(error);
              er.printError2(error.code, false);
              callbackError(true);

            })
        })

      } else {
        er.printError2("auth/user-not-found", false);
        callbackError(true);

      }
    })
  }


}
/* --------------------------------------------------- */

/* Fonction pour s'enregistrer (MAJ 27/05/21) */
export const toRegister = (email, name, password, confirmPassword, username, navigation, callbackError) => {


  var error = " ";
  var usernameLowerCase = username.toLowerCase();
  var emailLowerCase = email.toLowerCase();

  isUsernameUsed(usernameLowerCase, (val) => {
    if (usernameLowerCase.length >= 6 && usernameLowerCase.length <= 24) {
      /* Si le nom d'utilisateur est dispo*/
      if (!(val)) {
        if (name.length >= 5 && name.length <= 24) {
          if ((password === confirmPassword)) {
            if ((password.length >= 6 && password.length <= 30)) {
              firebase
                .auth()
                /*Creation du comptea avec l'adresse mail et mot de passe */
                .createUserWithEmailAndPassword(emailLowerCase, password)
                .then((cred) => {
                  /* ensuite on selectionne la collection users , et on crée un documents avec l'uid de l'utilisateur */
                  firebase
                    .firestore()
                    .collection("users")
                    .doc(cred.user.uid)
                    /* et on écrit les informations dans la collection de l'utilisateur */
                    .set({
                      /* nom  : valeur */
                      username: username,
                      usernameToLogin: usernameLowerCase,
                      name: name,
                      email: emailLowerCase,
                      friends: []
                    });
                  /* Affichage pour montrer le bon déroulement et se redirige vers la page principale */
                  console.log("Inscription avec succes");
                  navigation.navigate("Login")
                })
                /* Affichage d'erreur */
                .catch((e) => {
                  er.printError2(e.code, false)
                  callbackError(true);

                })
            } else {
              er.printError2("mot-de-passe-court", true)
              callbackError(true);
            }
          } else {
            er.printError2("mot-de-passe", true)
            callbackError(true);
          }

        } else {
          er.printError2("nom-court-long", true)
          callbackError(true);

        }
      } else {
        er.printError2("user-pris", true);
        callbackError(true);

      }
    } else {
      er.printError2("user-court-long", true);
      callbackError(true);

    }

  })



};
/* --------------------------------------------------- */

/*Fonction pour se deconnecter */
export const toLogOut = () => {

  // on demande a l'utilisateur si il veut quitter avec une alert
  Alert.alert(
    'Deconnexion',
    'Voulez vous vous deconnecter ?',
    [
      { text: "NON", style: 'cancel', onPress: () => { console.log('on reste') } },
      {
        text: 'OUI',
        style: 'destructive',
        /*Si la personne a cliquer sur oui on de deconnecte */
        onPress: () => {
          firebase.auth().signOut()
            .then((result) => {
              //console.log(result);
              /*On met la variable a false */
              cl.setLogged(false);
              /* on récupère la  navigiation sauvergarder dans la fonction client*/
              var valNav = cl.valNavigation;
              /* et on retourne sur la page login*/
              valNav.navigate("Login");
            })
            .catch((error) => {//Si on n'a pas réussi on fait un affichage
              console.log(error);
              er.printError(error);

            })
        }
      },
    ]
  );


}
/* --------------------------------------------------- */


/* Fonction pour savoir si le nom d'utilisateur existe deja */
export const isUsernameUsed = (username, callback) => {

  firebase.firestore().collection("users").where("usernameToLogin", "==", username).get()
    .then(querySnapshot => {
      if (querySnapshot.size > 0) {

        console.log("Nom d'utilisateur deja pris");
        callback(true);

      } else {

        console.log("Nom d'utilisateur disponible");
        callback(false);

      }
    })/* Affichage d'erreur */
    .catch((e) => {

      console.log(e);
      er.printError2(e.code, false)

    })

}
/* --------------------------------------------------- */

/* Fonction pour récuperer l'adresse mail avec le nom d'utilisateur */
export const getMail = (username, callback) => {

  firebase.firestore().collection("users").where("usernameToLogin", "==", username).get()
    .then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {

          console.log("Mail recuperer");
          callback(doc.data().email);
        })
      } else {
        console.log("Mail non recuperer ( inexsistant ) !");
        callback('');
      }
    })
    .catch((error) => {

      console.log("Erreur lors de la recherche de l'adresse mail : ", error);
      callback('');
    });
}
/* --------------------------------------------------- */



/* Fonction pour stocker les info  récuperer dans notre fonction client  */
export const setInfo = (mail) => {

  getAllInfo(mail, (doc) => {
    cl.setMail(doc.email);
    cl.setUsername(doc.username);
    cl.setName(doc.name);
    cl.setLogged(true);
  });

}
/* --------------------------------------------------- */


/* Fonction pour supprimer les infos dans les text input de la page login  */
const clearInput = (myTextInput, myTextInput2) => {

  myTextInput.current.clear();
  myTextInput2.current.clear();
}
/* --------------------------------------------------- */

/* Fonction  aller dans la page home ( si on est connecter) */
const goToHome = (navigation) => {

  navigation.navigate("MainPagesDrawer");

}
/* --------------------------------------------------- */

/* Fonction pour récuperer tout les info si on est connecter */
export const getAllInfo = (mail, callback) => {

  firebase.firestore().collection("users").where("email", "==", mail).get()
    .then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {

          console.log("Info recuperer :", mail);
          callback(doc.data());

        })
      } else {
        console.log("Info non recuperer ( inexistant ) :", mail);
        callback('');
      }
    })
    .catch((error) => {

      console.log("Erreur lors de la recherche de l'adresse mail : ", error);
      callback('');
    });
}
/* --------------------------------------------------- */

/* Fonction pour récuperer un set d'item */
export const getSetItem = (item,callback) => {

  var i = 0;
  firebase.firestore().collection("items").doc("week1").collection("set1").get()
    .then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          ++i
          console.log("set d'ITEM recuperer : ", doc.data().title, " price : ", doc.data().price, " : ", "item" + i.toString());
          st.saveItem("item" + i.toString(), doc.data());

        }),callback()
      } else {
        console.log("ITEM non recuperer (  ) :", item);

      }
    })
    .catch((error) => {

      console.log("Erreur lors de la recherche du set d'item : ", error);

    });
}
/* --------------------------------------------------- */