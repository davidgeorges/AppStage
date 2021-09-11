/* Database File , Function , Variables ... */
import firebase from 'firebase'
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

------------ */


/* Fonction pour supprimer les données dans l'asyncstorage 
cette fonction est async on attend attend la résolution d'une promesse avec le mot clé await et ensuite on déroule le code (méthode différente des callback pour les fonction asynchrone) */
const clearAll = async () => {
  try {

    /* await interrompt l'exécution d'une fonction asynchrone et  attend la résolution d'une promesse ici soit la suppression des données ou la valeur null si cela échoue  */
    await AsyncStorage.clear()

  } catch (e) {
    // clear error
  }

  console.log('Clear asyncstorage Done.')
}
/* --------------------------------------------------- */

/* Fonction  pour ajouter les données dans l'asyncstorage
cette fonction est async on attend attend la résolution d'une promesse avec le mot clé await et ensuite on déroule le code (méthode différente des callback pour les fonction asynchrone) */
const setToken = async (data) => {
  try {

    // AsyncStorage.setItem sauvegarde seulement les chaine de caractères, on utilise JSON.stringify pour convertir un objet/valeur js  en une chaine de caractères JSON
    /* await interrompt l'exécution d'une fonction asynchrone et  attend la résolution d'une promesse ici soit l'ajout de données ou la valeur null si cela échoue  */

    await AsyncStorage.setItem("userData", JSON.stringify(data));


  } catch (e) {

    console.log("Something went wrong to set asyncstorage");

  }

  console.log("Set asyncstorage done : ", data.user.email);
}
/* --------------------------------------------------- */


/* Fonction pour se connecter avec le mail (TEST OK 24/06/21)*/
const logWithMail = (mailReceive, passwordReceive, isLoginFailed) => {


  firebase.auth().signInWithEmailAndPassword(mailReceive, passwordReceive)
    .then((res) => {

      /* callback avec paramètre a false pour dire qu'on a réussie */
      isLoginFailed(false)

      /*on stock les données dans l'AsyncStorage pour la connexion automatique*/
      setToken(res)

    })
    .catch((error) => {

      //affichage de l'erreur dans la console
      console.log(error);

      /*Gestion erreur avec en paramètre l'erreur et si l'errur est gerer par nous ou firebase (false = firebase)*/
      er.printError2(error.code, false);

      /* callback avec paramètre a true pour dire qu'on a échoué */
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

            /* callback avec paramètre a false pour dire qu'on a réussie et le mail de l"utilisateur pour recuperer les infos */
            isLoginFailed(false, mailReceive)

            /*on stock les données dans l'AsyncStorage pour la connexion automatique*/
            setToken(res)

          })
          .catch((error) => {

            //affichage de l'erreur dans la console
            console.log(error);

            /*Gestion erreur avec en paramètre l'erreur et si l'errur est gerer par nous ou firebase (false = firebase)*/
            er.printError2(error.code, false);

            /* callback avec paramètre a true pour dire qu'on a échoué */
            isLoginFailed(true)

          })
      })

    } else {

      /*Gestion erreur avec en paramètre l'erreur et si l'errur est gerer par nous ou firebase (false = firebase)*/
      er.printError2("auth/user-not-found", false);

      /* callback avec paramètre a true pour dire qu'on a échoué */
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

        console.log("In Function LogWithMail ( in toLogin ) ")

        /* Appel fonction pour stocker les données de l'utilisateur */
        setInfo(mailReceive);

        /* callback avec paramètre false pour dire qu'on a reussie */
        callback(failedLogin)

      } else {

        /* callback avec paramètre a true pour dire qu'on a échoué */
        callback(failedLogin)

      }
    })
  }
  /* On considère qu'ont se connecte avec un nom d'utilisateur*/
  else {
    logWithUsername(loginReceiveLowerCase, passwordReceive, (failedLogin, mailReceive) => {
      /* si false = login success */
      if (!(failedLogin)) {

        console.log("In Fonction LogWithUsername ( in toLogin ) ")

        /* Appel fonction pour stocker les données de l'utilisateur */
        setInfo(mailReceive);

        /* callback avec paramètre false pour dire qu'on a reussie */
        callback(failedLogin)

      } else {

        /* callback avec paramètre a true pour dire qu'on a échoué */
        callback(failedLogin)

      }
    })
  }
}
/* --------------------------------------------------- */

/*Fonction pour s'enregistrer (TEST OK 24/06/21 , doc crée avec le nom de l'utilisateur et tableau id en plus)*/
export const toRegister = (email, name, password, confirmPassword, username, navigation, callbackError) => {

  /*Variable pour stocker le nom d'utilisateur et l'adresse mail en minuscule*/
  var usernameLowerCase = username.toLowerCase();
  var emailLowerCase = email.toLowerCase();

  checkValueReceive(name, password, confirmPassword, usernameLowerCase, (errorValue) => {
    /*Si la taille est supérieur a 1 on a une erreur */
    if (errorValue.length > 1) {

      er.printError2(errorValue, true);

      /*Callback avec l'erreur en paramètre*/
      callbackError(errorValue);

    } else {
      /* On check si le nom d'utilisateur n'est pas deja pris */
      isUsernameUsed(usernameLowerCase, (val) => {

        /* si il n'est pas pris */
        if (!(val)) {

          firebase.auth()

            /*Creation du compte avec l'adresse mail et mot de passe */
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
              
              /* changement de page */
              navigation.navigate("Login")

            })
            /* Affichage d'erreur */
            .catch((e) => {

              console.log("Err : ", e.code);

              /*Gestion erreur avec en paramètre l'erreur et si l'errur est gerer par nous ou firebase (false = firebase)*/
              er.printError2(e.code, false)

              /*Callback avec l'erreur en paramètre*/
              callbackError(e.code);

            })
        } else {

          /*Init manuel erreur*/
          var error = "user-pris"

          /*Gestion erreur avec en paramètre l'erreur et si l'errur est gerer par nous ou firebase (true = manuel)*/
          er.printError2(error, true)

          /*Callback avec l'erreur en paramètre*/
          callbackError(error);

        }

      })
    }
  })

}
/* --------------------------------------------------- */

/*Fonction pour savoir si les valeurs saisie sont correctes (TEST OK 24/06/21)*/
function checkValueReceive(name, password, confirmPassword, usernameLowerCase, callback) {

  /*Decla var */
  var error = ""
  var caracteresAccepter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var valueUsername = 0;
  var valueName = 0;



  /* Pour savoir si le nom d'utilisateur contient un caractères invalide */
  for (var i = 0; i < usernameLowerCase.length; i++) {

    /* Si le caractère est compris dans caracteresAccepter alors on incremente la variable (pseudo ok )*/
    if (caracteresAccepter.indexOf(usernameLowerCase[i]) >= 0) {

      valueUsername++
      console.log("Ici Username ( in checkValueReceive ) : ", usernameLowerCase[i])

    }
  }

  /* Pour savoir si le nom contient un caractères invalide */
  for (var i = 0; i < name.length; i++) {

    /* Si le caractère est compris dans caracteresAccepter alors on incremente la variable (pseudo ok )*/
    if (caracteresAccepter.indexOf(name[i]) >= 0) {

      valueName++
      console.log("Ici Name ( in checkValueReceive ) : ", name[i])

    }
  }

  /* On vérifie si les données sont saisie correctement ( sauf l'adresse mail car gérer par firebase ) */
  if (valueUsername === usernameLowerCase.length) {
    if (usernameLowerCase.length >= 6 && usernameLowerCase.length <= 24) {
      if (valueName === name.length) {
        if (name.length >= 5 && name.length <= 24) {
          if ((password === confirmPassword)) {
            if ((password.length >= 6 && password.length <= 30)) {

            }
            /*Init manuel des erreurs*/
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
        error = "invalid-name-carac"
      }
    } else {
      error = "user-court-long"
    }
  } else {
    error = "invalid-username-carac"
  }


  /* Affichage d'erreur */
  console.log("err :", error)

  /*Callback avec l'erreur en paramètre*/
  callback(error);

}
/* --------------------------------------------------- */


/*Fonction pour se deconnecter*/
export const toLogOut = (navigation) => {

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
            .then(() => {

              /*On reset les donnés de l'utilisateur*/
              resetClientData();

              /* et on retourne sur la page login*/
              navigation.navigate("Login");

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



/* Fonction pour savoir si le nom existe dans le BDD (TEST OK 24/06/21)*/
export const isUsernameUsed = (username, callback) => {

  firebase.firestore().collection("users").where("usernameToLogin", "==", username).get()
    .then(querySnapshot => {
      if (querySnapshot.size > 0) {

        console.log("Nom d'utilisateur existe dans la bdd ( login username ) ( in isUsernameUsed )");
        callback(true);

      } else {

        console.log("Nom d'utilisateur inexistant dans la bdd ( login username ) ( in isUsernameUsed )");
        callback(false);

      }
    })
    /* Affichage d'erreur */
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

          console.log("Mail recuperer  :", doc.data().email, ' tentative connexion ( in getMail )');
          callback(doc.data().email);
        })
      } else {

        console.log("Mail non recuperer ( inexsistant ) ! ( in getMail )");
        callback('');
      }
    })
    .catch((error) => {

      console.log("Erreur lors de la recherche de l'adresse mail : ", error, " ( in getMail )");
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

          console.log("Info recuperer :", mail, "( in getAllInfo  )");
          callback(doc);

        })
      } else {

        console.log("Info non recuperer ( inexistant ) :", mail, "( in getAllInfo  )");
        callback('');
      }
    })
    .catch((error) => {

      console.log("Erreur lors de la recherche de l'adresse mail : ", error, "( in getAllInfo  )");
      callback('');

    });
}
/* --------------------------------------------------- */


/*Recuperer les articles d'une catégorie (TEST OK 24/06/21)*/
export const getArticle = (tab, chaineReceive, cl) => {


  var i = 0;
  /* Recuperation de tout les articles */
  firebase.firestore().collection(chaineReceive).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        tab.push(doc.data());

        console.log("doc ", ++i, "getArticle from catagorie :", chaineReceive, ", from user :", doc.data().username, ", and title :", doc.data().title);

      }), cl();
    }).catch((error) => {

      console.error(error);

    });

}
/* --------------------------------------------------- */

/*Recuperer les articles de l'utilisateur (une seule catégorie) (TEST OK 24/06/21)*/
export const getUserArticle = (tab, chaineReceive, callback) => {


  /* Recuperation d'e tout les articles' de l'utilisateur */
  firebase.firestore().collection(chaineReceive).where("username", "==", cl.usernameLowerCase).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        /* On crée un nouveal objet avec l'id du document la categorie et avec les données de l'article (titre,description...) */
        var newData = Object.assign({}, doc.data(), { id: doc.id, category: chaineReceive })

        console.log("getUserArticle from :", doc.data().username, ", and title :", doc.data().title);
        tab.push(newData);


      }), callback();
    }).catch((error) => {

      console.error(error);

    });


}
/* --------------------------------------------------- */

/*Recuperer tout les article de l'utilisateur (toute catégorie) (TEST OK 24/06/21)*/
export const getAllUserArticle = (tabArticle, callback) => {


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

  /* Recuperation de tout les articles de l'utilisateur pour connaitre le nombre exacte*/
  firebase.firestore().collection("users").where("usernameToLogin", "==", cl.usernameLowerCase).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        console.log("Id : ", doc.id, " => nbArticle : ", doc.data().nbArticle, " in ( getNbArticle )");
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

  /* On recupère le nombre d'article de l'utilisateur */
  getNbArticle((nbArticle) => {

    /*Si on a pas atteint le max d'article (4) */
    if (nbArticle < 4) {

      /* On check si les données sont correctement saisie */
      if ((titleReceive.length >= 6 && titleReceive.length <= 24)) {

        if ((descriptionReceive.length >= 6 && descriptionReceive.length <= 300)) {

          isArticleTitleUsed(title, (isTitleUsed) => {
            /* si le titre  d'annonce est disponible et que l'utilisateur n'a pas deja 3 annonces*/
            if (!(isTitleUsed)) {

              /*On écrit dans les base de données ( dans la categorie reçu avec whereAdd ) */
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
                  console.log("Id ici :", cl.id, " ( in addArticle )")

                  /* On met a jours les valeur pour incrementer le nombre d'article et ajouter le titre de l'article dans le tableau dans la BDD */
                  firebase.firestore().collection("users").doc(cl.id).update({

                    article: firebase.firestore.FieldValue.arrayUnion(title),
                    nbArticle: cl.nbArticle

                  })
                    .then(() => {

                      console.log("add success  ( in addArticle )")
                      callback(false)

                    })
                })
            } else {

              er.printError2("titre-non-disponible", true)
              callback(true)

            }
          })
        } else {

          console.log(descriptionReceive.length)
          er.printError2("descrip-mal-formate", true)
          callback(true)
        }
      } else {

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

      /* si la valeur est dans le tableau on ne crée pas l'annonce  */
      if (doc.data().article.indexOf(titleToCheck) !== -1) {

        console.log("Titre d'annonce indisponible ( in isArticleTitleUsed )")
        callback(true)

      }

      /* callback avec bool a false  le nom de l'annonce est disponible */
      else {

        callback(false)
        console.log("Titre d'annonce disponible ( in isArticleTitleUsed )")

      }
    })

    /*Si il y a un erreur on la récupère*/
    .catch((error) => {

      console.log("Erreur lors de la recherche de l'utilisateur' : ", error, "( in isArticleTitleUsed )");
      callback('');

    });
}
/* --------------------------------------------------- */


/* Fonction pour stocker les info récuperer depuis la BDD ( section données utilisateur ) et initialiser les variables dans clientFonction  */
export const setInfo = (mail) => {

  getAllInfo(mail, (doc) => {

    cl.setMail(doc.data().email);
    cl.setUsername(doc.data().username);
    cl.setUsernameLowerCase(doc.data().usernameToLogin)
    cl.setName(doc.data().name);
    cl.setId(doc.id);
    getNbArticle((nbArticle) => {
      cl.setNbArticle(nbArticle)
    })

  });

}
/* --------------------------------------------------- */


/*Pour mettre a jour la nouvelle valeur de nbArticle et du tablaeu d'article du client*/
export const updateValue = (newNbArticle, TitleToRemove, callback) => {

  /* Mise a jour des valeurs nbArticle et du tableau d'article dans la BDD  ( section données utilisateur ) */
  firebase.firestore().collection("users").doc(cl.id).update({

    nbArticle: newNbArticle,
    article: firebase.firestore.FieldValue.arrayRemove(TitleToRemove)

  }, callback())

}
/* --------------------------------------------------- */

/*Fonction  pour supprimer une annonce*/
export const delArticle = (whereDel, idToDel, TitleToDelete, callback) => {

  /*Box alert pour demander a l'utilisateur si il veut se deconnecter ou non*/
  Alert.alert(
    'Delete article',
    'Do you want to delete this article ?',
    [
      /*On ne qu'un affichage dans la console si l'utilisateur clique sur non*/
      { text: "NO", style: 'cancel', onPress: () => { console.log('on reste') } },
      {
        text: 'YES',
        style: 'destructive',

        /*Si la personne a cliquer sur oui on se deconnecte*/
        onPress: () => {

          /*On va supprimer l'article dans la BDD ( section données catégorie )*/
          firebase.firestore().collection(whereDel).doc(idToDel).delete()
            .then(() => {

              /*On modifie les valeurs du nombre d'article et modifie le tableau contenant les articles de l'utilisateur dans la BDD ( section données utilisateur )*/
              updateValue(cl.nbArticle - 1, TitleToDelete, () => {

                /*On modifie la valeur du nombre articles de la varible dans clientFonction*/
                cl.setNbArticle(cl.nbArticle - 1)

                callback(true);

              })

              /*Si il y a une erreur on la récupère*/
            }).catch((error) => {

              console.error("Error removing document: ", error, "( in isArticleTitleUsed )");

              callback(false)

            });
        }
      },
    ]
  );

}
/* --------------------------------------------------- */

/*Pour rénitialiser les valeurs de l'utilisateur ( les données stocker dans clientFonction )*/
export const resetClientData = () => {

  cl.setMail("");
  cl.setNbArticle(0);
  cl.setUsername("");
  cl.setUsernameLowerCase("");
  cl.setId("");

  /*rénitialiser les données dans l'asyncstorage*/
  clearAll()

}
/* --------------------------------------------------- */


