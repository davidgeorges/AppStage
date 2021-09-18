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

    /* await interrompt l'exécution d'une fonction asynchrone et  attend la résolution d'une promesse ici soit la suppression des données ou la valeur null si cela échoue */
    await AsyncStorage.clear()

  } catch (e) {
    // clear error
  }

  console.log('Clear asyncstorage Done.\n',"-------------------------------")
}
/* --------------------------------------------------- */

/* Fonction  pour ajouter les données dans l'asyncstorage
cette fonction est async on attend attend la résolution d'une promesse avec le mot clé await et ensuite on déroule le code (méthode différente des callback pour les fonction asynchrone) */
const setToken = async (data) => {
  try {

    // AsyncStorage.setItem sauvegarde seulement les chaine de caractères, on utilise JSON.stringify pour convertir un objet/valeur js  en une chaine de caractères JSON
    /* await interrompt l'exécution d'une fonction asynchrone et  attend la résolution d'une promesse ici soit l'ajout de données ou la valeur null si cela échoue */

    await AsyncStorage.setItem("userData", JSON.stringify(data));


  } 
  /* Recupère l'erreur */
  catch (e) {
    
    /* Affichage si erreur */
    console.log("Something went wrong to set asyncstorage\n","-------------------------------");

  }

  /* Affichage pour montrer le bon déroulement */
  console.log("Set asyncstorage done : ", data.user.email," \n","-------------------------------");
}
/* --------------------------------------------------- */


/* Fonction pour se connecter avec le mail  */
const logWithMail = (mailReceive, passwordReceive, isLoginFailed) => {


  /* Connexion a firebase.auth grâce a l'adresse mail et le mot de passe */
  firebase.auth().signInWithEmailAndPassword(mailReceive, passwordReceive)
    .then((res) => {

      /* callback avec paramètre a false pour dire qu'on a réussie */
      isLoginFailed(false)

      /* on stock les données dans l'AsyncStorage pour la connexion automatique */
      setToken(res)

    })
    /* Récupère l'erreur */
    .catch((error) => {

      //affichage de l'erreur dans la console
      console.log(error,"\n","-------------------------------");

      /* Gestion erreur avec en paramètre l'erreur et si l'errur est gerer par nous ou firebase (false = firebase) */
      er.printError2(error.code, false);

      /* callback avec paramètre a true pour dire qu'on a échoué */
      isLoginFailed(true)


    })
}
/* --------------------------------------------------- */

/* Fonction pour se connecter avec le nom d'utilisateur */
const logWithUsername = (usernameReceiveLowerCase, passwordReceive, isLoginFailed) => {

  isUsernameUsed(usernameReceiveLowerCase, (val) => {
    /* Si le nom d'utilisateur existe on continue */
    if ((val)) {
      /* Avec le nom d'utilisateur on récupère l'adresse mail */
      getMail(usernameReceiveLowerCase, (mailReceive) => {
        /* Connexion avec mail et mot de passe */
        firebase.auth().signInWithEmailAndPassword(mailReceive, passwordReceive)
          .then((res) => {

            /* callback avec paramètre a false pour dire qu'on a réussie et le mail de l"utilisateur pour recuperer les infos */
            isLoginFailed(false, mailReceive)

            /* on stock les données dans l'AsyncStorage pour la connexion automatique */
            setToken(res)

          })
          /* Récupère l'erreur */
          .catch((error) => {

            //affichage de l'erreur dans la console
            console.log(error,"\n","-------------------------------");

            /* Gestion erreur avec en paramètre l'erreur et si l'errur est gerer par nous ou firebase (false = firebase) */
            er.printError2(error.code, false);

            /* callback avec paramètre a true pour dire qu'on a échoué */
            isLoginFailed(true)

          })
      })

    } else {

      /* Gestion erreur avec en paramètre l'erreur et si l'errur est gerer par nous ou firebase (false = firebase) */
      er.printError2("auth/user-not-found", false);

      /* callback avec paramètre a true pour dire qu'on a échoué */
      isLoginFailed(true)

    }
  })

}
/* --------------------------------------------------- */



/* Fonction pour se connecter avec nom d'utilisateur ou mail regroupant deux 'sous fonction' */
export const toLogin = (loginReceive, passwordReceive, callback) => {
  var loginReceiveLowerCase = loginReceive.toLowerCase();

  /* On considère qu'ont se connecte avec une adresse mail */
  if (loginReceiveLowerCase.includes("@")) {
    logWithMail(loginReceiveLowerCase, passwordReceive, (failedLogin) => {
      /* si false = login success */
      if (!(failedLogin)) {

        console.log("In Function LogWithMail ( in toLogin ) \n","-------------------------------")

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
  /* On considère qu'ont se connecte avec un nom d'utilisateur */
  else {
    logWithUsername(loginReceiveLowerCase, passwordReceive, (failedLogin, mailReceive) => {
      /* si false = login success */
      if (!(failedLogin)) {

        console.log("In Fonction LogWithUsername ( in toLogin ) \n","-------------------------------")

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

/* Fonction pour s'enregistrer (TEST OK 24/06/21 , doc crée avec le nom de l'utilisateur et tableau id en plus) */
export const toRegister = (email, name, password, confirmPassword, username, navigation, callbackError) => {

  /* Variable pour stocker le nom d'utilisateur et l'adresse mail en minuscule */
  var usernameLowerCase = username.toLowerCase();
  var emailLowerCase = email.toLowerCase();

  checkValueReceive(name, password, confirmPassword, usernameLowerCase, (errorValue) => {
    /* Si la taille est supérieur a 1 on a une erreur */
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
              console.log("Inscription avec succes \n","-------------------------------");
              
              /* changement de page */
              navigation.navigate("Login")

            })
            /* Recupère l'erreur */
            .catch((e) => {

              console.log("Err : ", e.code,"\n","-------------------------------");

              /* Gestion erreur avec en paramètre l'erreur et si l'errur est gerer par nous ou firebase (false = firebase) */
              er.printError2(e.code, false)

              /* Callback avec l'erreur en paramètre */
              callbackError(e.code);

            })
        } else {

          /* Init manuel erreur */
          var error = "user-pris"

          /* Gestion erreur avec en paramètre l'erreur et si l'errur est gerer par nous ou firebase (true = manuel) */
          er.printError2(error, true)

          /* Callback avec l'erreur en paramètre */
          callbackError(error);

        }

      })
    }
  })

}
/* --------------------------------------------------- */

/* Fonction pour savoir si les valeurs saisie sont correctes (TEST OK 24/06/21) */
function checkValueReceive(name, password, confirmPassword, usernameLowerCase, callback) {

  /* Decla var */
  var error = ""
  var caracteresAccepter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var valueUsername = 0;
  var valueName = 0;



  /* Pour savoir si le nom d'utilisateur contient un caractères invalide */
  for (var i = 0; i < usernameLowerCase.length; i++) {

    /* Si le caractère est compris dans caracteresAccepter alors on incremente la variable (pseudo ok ) */
    if (caracteresAccepter.indexOf(usernameLowerCase[i]) >= 0) {

      valueUsername++

    }
  }

  /* Pour savoir si le nom contient un caractères invalide */
  for (var i = 0; i < name.length; i++) {

    /* Si le caractère est compris dans caracteresAccepter alors on incremente la variable (pseudo ok ) */
    if (caracteresAccepter.indexOf(name[i]) >= 0) {

      valueName++

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
            /* Init manuel des erreurs */
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
  console.log("err :", error,"\n"," ");

  /* Callback avec l'erreur en paramètre */
  callback(error);

}
/* --------------------------------------------------- */


/* Fonction pour se deconnecter */
export const toLogOut = (navigation) => {

  /* on demande a l'utilisateur si il veut quitter avec une alert */
  Alert.alert(
    'Log out',
    'Do you want to logout ?',
    [
      { text: "NO", style: 'cancel', onPress: () => { return null } },
      {
        text: 'YES',
        style: 'destructive',

        /* Si la personne a cliquer sur oui on de deconnecte */
        onPress: () => {

          firebase.auth().signOut()
            .then(() => {

              /* On reset les donnés de l'utilisateur */
              resetClientData();

              /* et on retourne sur la page login */
              navigation.navigate("Login");

            })
            .catch((error) => {

              /* Si on n'a pas réussi on fait un affichage de l'erreur dans la console. */
              console.log(error,"\n","-------------------------------");

            })
        }
      },
    ]
  );


}
/* --------------------------------------------------- */



/* Fonction pour savoir si le nom d'utilisateur est déja utilisé ( si le nom existe dans le BDD ) */
export const isUsernameUsed = (username, callback) => {

  /* On cherche dans la BDD au niveau des utilisateur grâce son nom d'utilisateur et on récupère les données */
  firebase.firestore().collection("users").where("usernameToLogin", "==", username).get()
    .then(querySnapshot => {
      /* Si les données qu'on a reçu sont supérieur a 0 le nom d'utilisateur existe */
      if (querySnapshot.size > 0) {

        /* Affichage dans la console */
        console.log("Nom d'utilisateur existe dans la bdd ( login username ) ( in isUsernameUsed ) \n","-------------------------------");

        /* Callback avec la valeur true ( nom d'utilisateur existant ) */
        callback(true);

      }
      /* Sinon il le nom d'utilisateur n'existe pas */ 
      else {

        console.log("Nom d'utilisateur inexistant dans la bdd ( login username ) ( in isUsernameUsed ) \n","-------------------------------");

                      
        /* Callback avec la valeur false ( nom d'utilisateur inexistant ) */
        callback(false);

      }
    })
    /* On récupère l'erreur */
    .catch((e) => {

      /* Affichage dans la console */ 
      console.log(e,"\n ","-------------------------------");

     /* Gestion erreur avec en paramètre l'erreur et si l'errur est gerer par nous ou firebase (false = firebase) */
      er.printError2(e.code, false)

    })

}
/* --------------------------------------------------- */

/* Fonction pour récuperer l'adresse mail avec le nom d'utilisateur s*/
export const getMail = (username, callback) => {

  /* On cherche dans la BDD au niveau des utilisateur grâce son nom d'utilisateur et on récupère les données */
  firebase.firestore().collection("users").where("usernameToLogin", "==", username).get()
    .then((querySnapshot) => {

      /* Si les données qu'on a reçu sont supérieur a 0 le nom d'utilisateur existe */
      if (querySnapshot.size > 0) {
        
        /* On récupère toute les données de cette utilisateur sur notre BDD ( on itère jusqu'a ne plus rien avoir ) */
        querySnapshot.forEach((doc) => {

          /* On récupère le mail dans le champ depuis la BDD doc.data() récupère tout les info de l'utilisateur stocker dans LE CLOUD FIRESTORE ( BDD )*/
          console.log("Mail recuperer  :", doc, ' tentative connexion ( in getMail ) \n',"-------------------------------");

          /* On met la valeur dans le callback */
          callback(doc.data().email);

        })
      } 
      /* Si on a pas récuperer de données */ 
      else {

        /* Affichage dans la console */
        console.log("Mail non recuperer ( inexsistant ) ! ( in getMail ) \n","-------------------------------");

        /* Callback avec un caractère vide pour dire qu'on a rien reçu */
        callback('');
      }
    })
    /* On récupère l'erreur */
    .catch((error) => {

      /* Affichage dans la console */ 
      console.log("Erreur lors de la recherche de l'adresse mail : ", error, " ( in getMail ) \n","-------------------------------");

      /* Callback avec un caractère vide pour dire qu'on a rien reçu */
      callback('');

    });
}
/* --------------------------------------------------- */



/* Fonction pour récuperer tout les info de l'utilisateur grâce a son mail */
export const getAllInfo = (mail, callback) => {

  /* On cherche dans la BDD au niveau des utilisateur grâce son mail et on récupère les données */
  firebase.firestore().collection("users").where("email", "==", mail).get()
    .then((querySnapshot) => {
      /* Si les données qu'on a reçu sont supérieur a 0 le nom d'utilisateur existe */
      if (querySnapshot.size > 0) {

        /* On récupère toute les données de cette utilisateur sur notre BDD ( on itère jusqu'a ne plus rien avoir ) */
        querySnapshot.forEach((doc) => {

          /* Affichage dans la console */ 
          console.log("Info recuperer grace a l'email :", mail, "( in getAllInfo  ) \n","-------------------------------");

          /* On met la valeur dans le callback */
          callback(doc);

        })
      }
      /* Si on a pas récuperer de données */ 
      else {

        /* Affichage dans la console */ 
        console.log("Info non recuperer ( inexistant ) :", mail, "( in getAllInfo  ) \n","-------------------------------");

        /* Callback avec un caractère vide pour dire qu'on a rien reçu */
        callback('');
      }
    })
    /* On récupère l'erreur */
    .catch((error) => {

      /* Affichage dans la console */ 
      console.log("Erreur lors de la recherche de l'adresse mail : ", error, "( in getAllInfo  ) \n","-------------------------------");

      /* Callback avec un caractère vide pour dire qu'on a rien reçu */
      callback('');

    });
}
/* --------------------------------------------------- */


/* Recuperer les articles d'une catégorie */
export const getArticle = (tab, chaineReceive, callback) => {


  var i = 0;
    /* On cherche dans la BDD au niveau de la catégorie reçu avec chaineReceive et on récupère les données */
  firebase.firestore().collection(chaineReceive).get()
    .then((querySnapshot) => {
      /* On récupère toute les données de cette catégorie sur notre BDD ( on itère jusqu'a ne plus rien avoir ) */
      querySnapshot.forEach((doc) => {

        /* On met les données de la catégorie dans notre tableau */
        tab.push(doc.data());

        /* Affichage dans la console */ 
        console.log("doc ", ++i, "getArticle from catagorie :", chaineReceive, ", from user :", doc.data().username, ", and title :", doc.data().title,"\n","-------------------------------");

      })

      /* callback simple */
      callback();

    })
    /* On récupère l'erreur */
    .catch((error) => {

      /* Affichage dans la console */ 
      console.error(error,"\n","-------------------------------");

    });

}
/* --------------------------------------------------- */

/*Recuperer les articles de l'utilisateur (une seule catégorie) */
export const getUserArticle = (tab, chaineReceive, callback) => {


  /* On cherche dans la BDD au niveau de l'utilisateur avec son nom d'utilisateur et on récupère les données */
  firebase.firestore().collection(chaineReceive).where("username", "==", cl.usernameLowerCase).get()
    .then((querySnapshot) => {

      /* On récupère toute les données de cette utilisateur sur notre BDD ( on itère jusqu'a ne plus rien avoir ) */
      querySnapshot.forEach((doc) => {

        /* On crée un nouveal objet avec l'id du document la categorie et avec les données de l'article (titre,description...) */
        var newData = Object.assign({}, doc.data(), { id: doc.id, category: chaineReceive })

        /* Affichage dans la console */ 
        console.log("getUserArticle from :", doc.data().username, ", and title :", doc.data().title,"\n","-------------------------------");

        /* On met les données de la catégorie dans notre tableau */
        tab.push(newData);

      })

      /* callback simple */
      callback();

    })
    /* On récupère l'erreur */
    .catch((error) => {

      /* Affichage dans la console */ 
      console.error(error,"\n","-------------------------------");

    });


}
/* --------------------------------------------------- */

/*Recuperer tout les article de l'utilisateur (toute catégorie) */
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

/* Recuperer le nombre d'article de l'utilisateur */
export const getNbArticle = (callback) => {

  /* On cherche dans la BDD au niveau de l'utilisateur avec son nom d'utilisateur et on récupère les données */
  firebase.firestore().collection("users").where("usernameToLogin", "==", cl.usernameLowerCase).get()
    .then((querySnapshot) => {

      /* On récupère toute les données de cette utilisateur sur notre BDD ( on itère jusqu'a ne plus rien avoir ) */
      querySnapshot.forEach((doc) => {
        
        /* Affichage dans la console */
        console.log("From Id : ", doc.id,", username : ",cl.usernameLowerCase,", we get : ", doc.data().nbArticle, " article in ( getNbArticle ) \n","------------------------------- ");

        /* callback avec comme valeur le nombre d'article de l'utilisateur */
        callback(doc.data().nbArticle)

      })
    })
    /* On récupère l'erreur */
    .catch((error) => {

      /* Affichage dans la console */ 
      console.error(error,"\n","-------------------------------");

    });


}
/* --------------------------------------------------- */



/* Ajouter une Annonce dans la BDD */
export const addArticle = (titleReceive, descriptionReceive, whereAdd, dateReceive, callback) => {

  /* Decla variable pour avoir le nom d'utilisateur et tire en minuscule et le bon nom d'utilisateur a montrer */
  var username = cl.usernameLowerCase;
  var usernameToShow = cl.username;
  var title = titleReceive.toLowerCase();

  /* On recupère le nombre d'article de l'utilisateur */
  getNbArticle((nbArticle) => {

    /*Si on a pas atteint le max d'article (4) */
    if (nbArticle < 4) {

      /* On vérifie si les données sont correctement saisie */
      if ((titleReceive.length >= 6 && titleReceive.length <= 24)) {

        if ((descriptionReceive.length >= 6 && descriptionReceive.length <= 300)) {

          /* On vérifie si le titre de l'article est deja utilisé par l'utilisateur */
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
                  
                  /* on incrémente notre variable nbArticle dans clientFonction */
                  cl.setNbArticle(cl.nbArticle + 1);

                  /* Affichage dans la console */
                  console.log("Id ici :", cl.id, " ( in addArticle ) \n","-------------------------------")

                  /* On met a jours les valeur pour incrementer le nombre d'article et ajouter le titre de l'article dans le tableau dans la BDD */
                  firebase.firestore().collection("users").doc(cl.id).update({

                    article: firebase.firestore.FieldValue.arrayUnion(title),
                    nbArticle: cl.nbArticle

                  })
                    .then(() => {

                      /* Affichage dans la console */
                      console.log("add success  ( in addArticle ) \n","-------------------------------")

                      /* callback avec comme valeur false */
                      callback(false)

                    })
                })
            } else {

              /* Gestion erreur avec en paramètre l'erreur et si l'errur est gerer par nous ou firebase (true = maunel) */
              er.printError2("titre-non-disponible", true)

              /* callback avec comme valeur true */
              callback(true)

            }
          })
        } else {

          /* Gestion erreur avec en paramètre l'erreur et si l'errur est gerer par nous ou firebase (true = maunel) */
          er.printError2("descrip-mal-formate", true)

          /* callback avec comme valeur true */
          callback(true)
        }
      } else {

        /* Gestion erreur avec en paramètre l'erreur et si l'errur est gerer par nous ou firebase (true = maunel) */
        er.printError2("titre-mal-formate", true)

        /* callback avec comme valeur true */
        callback(true)

      }
    } else {

      /* Gestion erreur avec en paramètre l'erreur et si l'errur est gerer par nous ou firebase (true = maunel) */
      er.printError2("3-article-max", true)

      /* callback avec comme valeur true */
      callback(true)
    }

  })



}
/* --------------------------------------------------- */

/* Fonction pour savoir si le Titre de l'annonce est deja pris par l'utilisateur */
export const isArticleTitleUsed = (titleToCheck, callback) => {


  /* On check dans le tableau stocké dans la section du client si le nom de l'annonce est deja utilisé par le même client*/
  firebase.firestore().collection("users").doc(cl.id).get()
    .then((doc) => {

      /* si la valeur est dans le tableau on ne crée pas l'annonce  */
      if (doc.data().article.indexOf(titleToCheck) !== -1) {

        /* Affichage dans la console */
        console.log("Titre d'annonce indisponible ( in isArticleTitleUsed ) \n","-------------------------------");

        /* callback avec comme valeur true */
        callback(true)

      }

      /* si la valeur n'est pas dans le tableau on peut crée l'annonce */
      else {

       

        /* Affichage dans la console */
        console.log("Titre d'annonce disponible ( in isArticleTitleUsed ) \n","-------------------------------");

        /* callback avec comme valeur false */
        callback(false)

      }
    })

    /*Si il y a un erreur on la récupère*/
    .catch((error) => {

      /* Affichage dans la console */
      console.log("Erreur lors de la recherche de l'utilisateur' : ", error, "( in isArticleTitleUsed )");

      /* callback avec comme valeur un caractère vide */
      callback('');

    });
}
/* --------------------------------------------------- */


/* Fonction pour stocker les info récuperer depuis la BDD ( section données utilisateur ) et initialiser les variables dans clientFonction  */
export const setInfo = (mail) => {

  /* Récupération de tout les données de l'utilisteur */
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

                /* Callback avec comme valeur true */
                callback(true);

              })

              
            })
            /*Si il y a une erreur on la récupère*/
            .catch((error) => {

              /* Affichage dans la console */
              console.error("Error removing document: ", error, "( in isArticleTitleUsed ) \n","-------------------------------");

              /* Callback avec comme valeur false */
              callback(false)

            });
        }
      },
    ]
  );

}
/* --------------------------------------------------- */

/* Pour rénitialiser les valeurs de l'utilisateur ( les données stocker dans clientFonction ) */
export const resetClientData = () => {

  /* Rénitialisation des données */
  cl.setMail("");
  cl.setNbArticle(0);
  cl.setUsername("");
  cl.setUsernameLowerCase("");
  cl.setId(""); 

  /*rénitialiser les données dans l'asyncstorage*/
  clearAll()

}
/* --------------------------------------------------- */


