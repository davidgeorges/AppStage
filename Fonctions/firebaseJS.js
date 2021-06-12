/* Database File , Function , Variables ... */
import firebase from 'firebase'
import "firebase/auth";
import "firebase/database";
import 'firebase/firestore';
import { Alert, Switch } from 'react-native';
import * as er from "./printError"
import * as cl from "./clientFonction"





/*Fonction pour se connecter avec nom d'utilisateur ou mail (TEST 28/05/21) , passwordReceive, navigation, myTextInput, myTextInput2, callbackF*/
export const toLogin = (mailReceive, passwordReceive, navigation, myTextInput, myTextInput2, callbackClear, callbackError) => {

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

/* Fonction pour s'enregistrer (MAJ 14/06/21 , doc crée avec le nom de l'utilisateur et tableau id en plus) */
export const toRegister = (email, name, password, confirmPassword, username, navigation,callbackError) => {

  var usernameLowerCase = username.toLowerCase();
  var emailLowerCase = email.toLowerCase();

  checkValueReceive(name, password, confirmPassword, usernameLowerCase, (errorValue) => {
      /*Si la taille est supérieur a 1 on a une erreur */
      if (errorValue.length > 1) {
        er.printError2(errorValue, true);
        callbackError(errorValue);

      } else {
          /* On check si le nom d'utilisateur n'est pas deja pris */
          isUsernameUsed(usernameLowerCase, (val) => {
              /* si il n'est pas pris */
              if (!(val)) {
                  firebase.auth()
                      /*Creation du comptea avec l'adresse mail et mot de passe */
                      .createUserWithEmailAndPassword(emailLowerCase, password)
                      .then((cred) => {
                          /* ensuite on selectionne la collection users , et on crée un documents avec l'uid de l'utilisateur */
                          firebase
                              .firestore()
                              .collection("users")
                              .doc(usernameLowerCase)
                              /* et on écrit les informations dans la collection de l'utilisateur */
                              .set({
                                  /* nom  : valeur */
                                  username: username,
                                  usernameToLogin: usernameLowerCase,
                                  name: name,
                                  email: emailLowerCase,
                                  announce: []
                              });
                          /* Affichage pour montrer le bon déroulement et se redirige vers la page principale */
                          console.log("Inscription avec succes");
                          navigation.navigate("Login")
                      })
                      /* Affichage d'erreur */
                      .catch((e) => {
                          console.log("Err : ", e.code);
                          er.printError2(e.code, false)
                          callbackError(e.code);

                      })
              }else{
                var error = "user-pris"
                er.printError2(error, true)
                callbackError(error);
              }

          })
      }
  })

}
/* --------------------------------------------------- */

/*Fonction pour se deconnecter (TEST 14/06/21)*/
function checkValueReceive(name, password, confirmPassword, usernameLowerCase, callback) {

  var error = ""

 

  /* On vérifie si les données sont saisie correctement ( sauf l'adresse mail car gérer par firebase ) */
  if (usernameLowerCase.length >= 6 && usernameLowerCase.length <= 24) {
      if (name.length >= 5 && name.length <= 24) {
          if ((password === confirmPassword)) {
              if ((password.length >= 6 && password.length <= 30)) {

              }
              else {
                  error = "mot-de-passe-court"
              }
          }
          else {
              error = "mot-de-passe-different"
          }
      }
      else {
          error = "nom-court-long"
      }
  }
  else {
      error = "user-court-long"
  }

  //er.printError2(error, true);
  console.log("err :",error)
  callback(error);

}
/* --------------------------------------------------- */


/*Fonction pour se deconnecter (TEST 29/05/21)*/
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

            })
        }
      },
    ]
  );


}
/* --------------------------------------------------- */


/* Fonction pour savoir si le nom d'utilisateur existe deja (TEST 29/05/21)*/
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

/* Fonction pour récuperer l'adresse mail avec le nom d'utilisateur(TEST 03/06/21)*/
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

/* Fonction pour récuperer tout les info si on est connecter (TEST 03/06/21)*/
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


/*Recuperer les articles de la  catégories (TEST 10/06/21)*/
export const getArticle = (tab, chaineReceive, cl) => {

  //  firebase.firestore().collection("ensemble_Article").orderBy("rank","desc").get()

  var i = 0;
  /* Recuperation de tout les articles */
  firebase.firestore().collection(chaineReceive).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        tab.push(doc.data());
        console.log("doc ", ++i, ": ", doc.data());

      }), cl();
    }).catch((error) => {
      console.error(error);
    });

}

/*Recuperer les articles de l'utilisateur (TEST 10/06/21)*/
export const getUserArticle = (tab, chaineReceive, usernameReceive, callback) => {

  //  firebase.firestore().collection("ensemble_Article").orderBy("rank","desc").get()

  var i = 0;
  /* Recuperation de tout les articles */

  firebase.firestore().collection(chaineReceive).where("name", "==", usernameReceive).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        tab.push(doc.data());
        console.log("doc ", ++i, ": ", doc.data());
        cl.setNbAnnounce(i)

      }), callback();
    }).catch((error) => {
      console.error(error);
    });


}

/* Ajouter une Annonce dans la db (TEST 10/06/21) */
export const addAnnounce = (titleReceive, descriptionReceive, whereAdd, callbackError) => {

  if ((titleReceive.length >= 6 && titleReceive.length <=24)) {
    if ((descriptionReceive.length >= 6 && descriptionReceive.length <=255)) {
      isAnnounceTitleUsed(titleReceive, (val) => {
        /* si le titre  d'annonce est disponible et que l'utilisateur n'a pas deja 3 annonces*/
        if (!(val) && cl.nbAnnounce < 3) {
          /* On check si les données sont correctement saisie */
          /* Ajout des info dans firestore */
         
        }
      })
    }else{
    console.log("Error input value")
    er.printError2("descrip-mal-formate", true)
    callbackError(true)
    }
  } else {
    console.log("Error input value")
    er.printError2("titre-mal-formate", true)

    callbackError(true)

  }



}
/* --------------------------------------------------- */

/* Fonction pour savoir si le Titre de l'annonce est deja pris par l'utilisateur (TEST 11/06/21)*/
export const isAnnounceTitleUsed = (titleToCheck, callback) => {

  /* On check dans le tableau stocké dans la section du client si le nom de l'annonce est deja utilisé par le même client*/
  firebase.firestore().collection("users").doc(cl.usernameLowerCase).get()
    .then((doc) => {
      console.log("Cached document data:", doc.data().announce);
      /* si la valeur est dans le tableau on ne crée pas l'annonce ( false ) */
      if (doc.data().announce.indexOf(titleToCheck) !== -1) {
        console.log("Titre d'annonce indisponible")
        callback(true)
      }
      /* callback avec bool a false  le nom de l'annonce est disponible */
      else {
        callback(false)
        console.log("Titre d'annonce disponible")
      }
    })
    .catch((error) => {

      console.log("Erreur lors de la recherche de l'utilisateur' : ", error);
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