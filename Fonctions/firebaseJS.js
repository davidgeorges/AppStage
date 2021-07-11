/* Database File , Function , Variables ... */
import firebase from 'firebase'
import "firebase/auth";
import "firebase/database";
import 'firebase/firestore';
import { Alert } from 'react-native';
import * as er from "./printError"
import * as cl from "./clientFonction"
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Description 

Fichier regroupant toute les fonctions qui nécéssite l'utilisatation de firebase/firestore

Fonction clearAll : Suppression des données asyncstorage.
Fonction setToken : Ajout des données asyncstorage.
Fonction logWithMail : Connexion avec adresse mail.
Fonction logWithUsername : Connexion avec nom d'utilisateur.
Fonction toLogin : Regroupant logWithMail et logWithUsername.
Fonction toRegister : Inscription d'un utilisateur.
Fonction checkValueReceive : Check si les valeur reçu sont correctement saisie pour proceder a l'inscription.
Fonction toLogOut : Deconnexion de l'utilisateur.
Fonction isUsernameUsed : Check si le nom d'utilisateur est utilisé.
Fonction getMail : Récupérer l'adresse mail d'un utilisateur.
Fonction getAllInfo : Récupérer les infos de l'utilisateur.
Fonction getArticle : Récupérer les article d'une categorie.
Fonction getUserArticle : Récupérer les articles de l'utilisateur, une seul catégorie.
Fonction getAllUserArticle : Récupérer les articles de l'utilisateur, toute catégorie.
Fonction getNbArticle : Récupérer le nombre d'articles de l'utilisateur.
Fonction addArticle : Ajout d'un article.
Fonction isArticleTitleUsed : Check si le titre de l'article est deja utiliser par l'utilisateur.
Fonction setInfo : Initialiser les valeur de nos variables dans clientFonction avec les valeurs récupérer par getAllInfo.
Fonction updateValue : Mettre a jour les valeurs lors de suppression d'article.
Fonction delArticle : Suppression d'un article.
Fonction resetClientData : Reset les données de l'utilisateur, lors d'une deconnexion.

*/

/* A TESTER 30/06/21  */
const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }

  console.log('CLEAR AS Done.')
}
/* --------------------------------------------------- */

/* A TESTER 29/06/21 Fonction async on attend la données avec le mot clé await et ensuite on déroule le code (méthode différente des callback pour les fonction asynchrone) */
const setToken = async (user) => {
  try {
    // AsyncStorage sauvegarde seulement les chaine de caractères JSON.stringify pour convertir un objet/valeur js  en une chaine de caractères JSON
    await AsyncStorage.setItem("userData", JSON.stringify(user));
    console.log("User set : ",user);
  } catch (e) {
    console.log("Something went wrong", e);
  }
}
/* --------------------------------------------------- */


/* Fonction pour se connecter avec le mail (TEST OK 24/06/21)*/
const logWithMail = (mailReceive, passwordReceive, isLoginFailed) => {


  firebase.auth().signInWithEmailAndPassword(mailReceive, passwordReceive)
    .then((res) => {//Si on a réussi on fait un petit affichage et on se redirige vers la page Home 

      isLoginFailed(false)
      /* A TESTER 29/06/21 */
      setToken(res)

    })
    .catch((error) => {//Si on n'a pas réussi on fait un affichage
      console.log(error);
      er.printError2(error.code, false);
      isLoginFailed(true)


    })
}
/* --------------------------------------------------- */

/* Fonction pour se connecter avec le nom d'utilisateur (TEST OK 24/06/21)*/
const logWithUsername = (usernameReceiveLowerCase, passwordReceive, isLoginFailed) => {

  isUsernameUsed(usernameReceiveLowerCase, (val) => {
    /* Si le nom d'utilisateur existe on continue*/
    if ((val)) {
      /* Avec le nom d'utilisateur on récupère l'adresse mail */
      getMail(usernameReceiveLowerCase, (mailReceive) => {
        /* Connexion avec mail et mot de passe */
        firebase.auth().signInWithEmailAndPassword(mailReceive, passwordReceive)
          .then((res) => {

            isLoginFailed(false, mailReceive)

            /* A TESTER 29/06/21 */
            setToken(res)

          })
          .catch((error) => {//Si on n'a pas réussi on fait un affichage

            console.log(error);
            er.printError2(error.code, false);
            isLoginFailed(true)
          })
      })

    } else {
      er.printError2("auth/user-not-found", false);
      isLoginFailed(true)
    }
  })

}
/* --------------------------------------------------- */



/*Fonction pour se connecter avec nom d'utilisateur ou mail (TEST OK 24/06/21) , passwordReceive, navigation, myTextInput, myTextInput2, callbackF*/
export const toLogin = (loginReceive, passwordReceive, callback) => {

  var loginReceiveLowerCase = loginReceive.toLowerCase();

  /* On considère qu'ont se connecte avec une adresse mail*/
  if (loginReceiveLowerCase.includes("@")) {

    logWithMail(loginReceiveLowerCase, passwordReceive, (failedLogin) => {

      /* si false = login success */
      if (!(failedLogin)) {

        console.log("Ici ")
        /* Appel a la fonction regroupant la fonction pour clear les text input , pour stocker les info reçu et aller a la page home */
        setInfo(mailReceive);
        callback(failedLogin)

      } else {
        callback(failedLogin)

      }

    })

  }
  /* On considère qu'ont se connecte avec un nom d'utilisateur*/
  else {

    logWithUsername(loginReceiveLowerCase, passwordReceive, (failedLogin, mailReceive) => {

      /* si false = login success */
      if (!(failedLogin)) {

        console.log("Ici ")
        /* Appel a la fonction regroupant la fonction pour clear les text input , pour stocker les info reçu et aller a la page home */
        setInfo(mailReceive);
        callback(failedLogin)

      } else {
        callback(failedLogin)

      }

    })

  }


}
/* --------------------------------------------------- */

/* Fonction pour s'enregistrer (TEST OK 24/06/21 , doc crée avec le nom de l'utilisateur et tableau id en plus) */
export const toRegister = (email, name, password, confirmPassword, username, navigation, callbackError) => {

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
                .doc()
                /* et on écrit les informations dans la collection de l'utilisateur */
                .set({
                  /* nom  : valeur */
                  username: username,
                  usernameToLogin: usernameLowerCase,
                  name: name,
                  email: emailLowerCase,
                  article: [],
                  nbArticle: 0
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
        } else {
          var error = "user-pris"
          er.printError2(error, true)
          callbackError(error);
        }

      })
    }
  })

}
/* --------------------------------------------------- */

/*Fonction pour savoir si les valeurs saisie sont correctes (TEST OK 24/06/21)*/
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
  console.log("err :", error)
  callback(error);

}
/* --------------------------------------------------- */


/*Fonction pour se deconnecter (TEST OK 24/06/21)*/
export const toLogOut = (callback) => {

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
              /*On met la variable a false */
              cl.setLogged(false);
              /* on récupère la  navigiation sauvergarder dans la fonction client*/
              var valNav = cl.valNavigation;
              /* et on retourne sur la page login*/
              valNav.navigate("Login");
              resetClientData();

              callback();
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



/*Fonction pour se deconnecter (TEST OK 24/06/21)*/
export const toLogOut2 = (callback) => {


  firebase.auth().signOut()
    .then((result) => {
      //console.log(result);
      /*On met la variable a false */
      cl.setLogged(false);
      /* on récupère la  navigiation sauvergarder dans la fonction client*/
      var valNav = cl.valNavigation;
      
      /*Reset tout les valeur du client (mail,username...)*/
      resetClientData();
      callback();

      console.log(result)
      
      /* et on retourne sur la page login*/
      valNav.navigate("Login");

      
    })
    .catch((error) => {//Si on n'a pas réussi on fait un affichage
      console.log(error);

    })


}
/* --------------------------------------------------- */


/* Fonction pour savoir si le nom existe dans le BDD (TEST OK 24/06/21)*/
export const isUsernameUsed = (username, callback) => {

  firebase.firestore().collection("users").where("usernameToLogin", "==", username).get()
    .then(querySnapshot => {
      if (querySnapshot.size > 0) {

        console.log("Nom d'utilisateur existe dans la bdd ( login username )");
        callback(true);

      } else {

        console.log("Nom d'utilisateur inexistant dans la bdd ( login username ) ");
        callback(false);

      }
    })/* Affichage d'erreur */
    .catch((e) => {

      console.log(e);
      er.printError2(e.code, false)

    })

}
/* --------------------------------------------------- */

/* Fonction pour récuperer l'adresse mail avec le nom d'utilisateur (TEST OK 24/06/21)*/
export const getMail = (username, callback) => {

  firebase.firestore().collection("users").where("usernameToLogin", "==", username).get()
    .then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {

          console.log("Mail recuperer  :", doc.data().email, ' tentative connexion');
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

/* Fonction pour récuperer tout les info de l'utilisateur (TEST OK 24/06/21)*/
export const getAllInfo = (mail, callback) => {

  firebase.firestore().collection("users").where("email", "==", mail).get()
    .then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {

          console.log("Info recuperer :", mail);
          callback(doc);

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


/*Recuperer les articles d'une catégorie (TEST OK 24/06/21)*/
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
/* --------------------------------------------------- */

/*Recuperer les articles de l'utilisateur (une seule catégorie) (TEST OK 24/06/21)*/
export const getUserArticle = (tab, chaineReceive, callback) => {


  /* Recuperation de tout les articles */

  firebase.firestore().collection(chaineReceive).where("username", "==", cl.usernameLowerCase).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        /* On crée un nouveal objet avec l'id du document et avec les données de l'article (titre...) */
        var newData = Object.assign({}, doc.data(), { id: doc.id, category: chaineReceive })

        console.log(newData)
        tab.push(newData);


        //cl.setNbArticle(i)

      }), callback();
    }).catch((error) => {
      console.error(error);
    });


}
/* --------------------------------------------------- */

/*Recuperer tout les article de l'utilisateur (toute catégorie) (TEST OK 24/06/21)*/
export const getAllUserArticle = (tabArticle, callback) => {

  //  firebase.firestore().collection("ensemble_Article").orderBy("rank","desc").get()

  /* Recuperation de tout les articles */

  getUserArticle(tabArticle, "info_Article", () => {
    getUserArticle(tabArticle, "design_Article", () => {
      getUserArticle(tabArticle, "game_Article", () => {
        getUserArticle(tabArticle, "sport_Article", () => {
          callback();
        })
      })
    })
  });


}
/* --------------------------------------------------- */

/*Recuperer le nombre d'article de l'utilisateur (une seule catégorie) (TEST OK 24/06/21)*/
export const getNbArticle = (callback) => {

  //  firebase.firestore().collection("ensemble_Article").orderBy("rank","desc").get()


  /* Recuperation de tout les articles de l'utilisateur pour connaitre le nombre exacte*/
  firebase.firestore().collection("users").where("usernameToLogin", "==", cl.usernameLowerCase).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data().nbArticle);
        cl.setNbArticle(doc.data().nbArticle)
      }, callback(cl.nbArticle))
    }).catch((error) => {
      console.error(error);
    });


}
/* --------------------------------------------------- */



/* Ajouter une Annonce dans la db (TEST OK 24/06/21) */
export const addArticle = (titleReceive, descriptionReceive, whereAdd, dateReceive, callback) => {

  var username = cl.usernameLowerCase;
  var usernameToShow = cl.username;
  var title = titleReceive.toLowerCase();
  console.log(dateReceive)

  getNbArticle((nbArticle) => {
    /*Si on a pas atteint le max d'article (3) */
    if (nbArticle < 4) {
      /* On check si les données sont correctement saisie */
      if ((titleReceive.length >= 6 && titleReceive.length <= 24)) {
        if ((descriptionReceive.length >= 6 && descriptionReceive.length <= 300)) {
          isArticleTitleUsed(title, (isTitleUsed) => {
            /* si le titre  d'annonce est disponible et que l'utilisateur n'a pas deja 3 annonces*/
            if (!(isTitleUsed)) {


              firebase.firestore().collection(whereAdd).doc().set({
                username: username,
                usernameToShow: usernameToShow,
                title: title,
                titleToShow: titleReceive,
                description: descriptionReceive,
                date: dateReceive,
                mail: cl.mail
              })
                .then(() => {
                  cl.setNbArticle(cl.nbArticle + 1);
                  console.log("Id ici :", cl.id)
                  firebase.firestore().collection("users").doc(cl.id).update({
                    article: firebase.firestore.FieldValue.arrayUnion(title),
                    nbArticle: cl.nbArticle
                  })
                    .then(() => {
                      console.log("add success")
                      callback(false)
                    })
                })

            } else {
              er.printError2("titre-non-disponible", true)
              callback(true)
            }
          })
        } else {
          //console.log("Error input value")
          console.log(descriptionReceive.length)
          er.printError2("descrip-mal-formate", true)
          callback(true)
        }
      } else {
        //console.log("Error input value")
        er.printError2("titre-mal-formate", true)
        callback(true)

      }
    } else {
      er.printError2("3-article-max", true)
      callback(true)
    }

  })



}
/* --------------------------------------------------- */

/* Fonction pour savoir si le Titre de l'annonce est deja pris par l'utilisateur (TEST OK 24/06/21) )*/
export const isArticleTitleUsed = (titleToCheck, callback) => {


  /* On check dans le tableau stocké dans la section du client si le nom de l'annonce est deja utilisé par le même client*/
  firebase.firestore().collection("users").doc(cl.id).get()
    .then((doc) => {
      //console.log("Cached document data:", doc.data().Article);
      /* si la valeur est dans le tableau on ne crée pas l'annonce ( false ) */
      if (doc.data().article.indexOf(titleToCheck) !== -1) {
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


/* Fonction pour stocker les info  récuperer dans notre fonction client  (TEST OK 24/06/21) */
export const setInfo = (mail) => {

  getAllInfo(mail, (doc) => {
    cl.setMail(doc.data().email);
    cl.setUsername(doc.data().username);
    cl.setUsernameLowerCase(doc.data().usernameToLogin)
    cl.setName(doc.data().name);
    cl.setLogged(true);
    cl.setId(doc.id);
    cl.setCurrentUser(doc)
    getNbArticle((nbArticle) => {
      cl.setNbArticle(nbArticle)
    })
  });

}
/* --------------------------------------------------- */



/* Appel a la fonction regroupant les instructions pour clear les text input, aller a la page home et la fonction pour stocker les info reçu (TEST OK 24/06/21) */
const groupeFunction = (myTextInput, myTextInput2, mailReceive, navigation) => {

  /* On efface les champs des textInput dans la page login
  myTextInput.current.clear();
  myTextInput2.current.clear();*/
  //console.log("Mail receive:", mailReceiveLowerCase);
  setInfo(mailReceive);
  /* on va dans la page home 
  navigation.navigate("TabNavigator");*/

}
/* --------------------------------------------------- */

/*Pour mettre a jour la nouvelle valeur de nbArticle et du tablaeu d'article du client  (TEST OK 24/06/21)*/
export const updateValue = (newNbArticle, TitleToRemove, callback) => {

  /* Recuperation de tout les articles de l'utilisateur pour connaitre le nombre exacte*/
  firebase.firestore().collection("users").doc(cl.id).update({
    nbArticle: newNbArticle,
    article: firebase.firestore.FieldValue.arrayRemove(TitleToRemove)
  }, callback())

}
/* --------------------------------------------------- */

/* Fonction  pour supprimer une annonce (TEST OK 24/06/21 - A VENIR) */
export const delArticle = (whereDel, idToDel, TitleToDelete, callback) => {

  Alert.alert(
    'Delete article',
    'Do you want to delete this article ?',
    [
      { text: "NO", style: 'cancel', onPress: () => { console.log('on reste') } },
      {
        text: 'YES',
        style: 'destructive',
        /*Si la personne a cliquer sur oui on de deconnecte */
        onPress: () => {
          firebase.firestore().collection(whereDel).doc(idToDel).delete()
            .then(() => {

              updateValue(cl.nbArticle - 1, TitleToDelete, () => {
                cl.setNbArticle(cl.nbArticle - 1)

                callback(true);
              })

            }).catch((error) => {
              console.error("Error removing document: ", error);
              callback(false)

            });
        }
      },
    ]
  );

}
/* --------------------------------------------------- */

/*Pour mettre a jour la nouvelle valeur de nbArticle et du tablaeu d'article du client  (NEW 17/06/21)*/
export const resetClientData = () => {

  //cl.setCurrentUser = (null);
  cl.setLogged(false);
  cl.setMail("");
  cl.setNbArticle(0);
  cl.setUsername("");
  cl.setUsernameLowerCase("");
  cl.setId("");
  clearAll()


}
/* --------------------------------------------------- */


