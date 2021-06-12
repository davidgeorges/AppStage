
/* Fonction pour gérer les différentes erreur reçu (OK 19/05/21 , A DEVELOPPER) */
export var err = " ";
export var err2 = " ";


/* Fonction pour gérer les différentes erreur reçu manuellement ( écrite par moi ) (NEW 28/05/21 , A DEVELOPPER) */
export const printError2 = (error, manuel) => {

  if (!(manuel)) {
    switch (error) {
      case "auth/email-already-in-use":
        err2 = "Adresse mail déjà utilisé."
        break;
      case "username-already-in-use":
        err2 = "Nom d'utilisateur déjà utilisé."
        break;
      case "auth/invalid-email":
        err2 = "Format d'adresse mail non valide."
        break;
      case "auth/weak-password":
        err2 = "Mot de passe trop faible."
        break;
      case "auth/too-many-requests":
        err2 = "Trop de demandes. Réessayez dans une minute."
        break;
      case "auth/user-not-found":
        err2 = "Utilisateur inexistant." + '\n' + "Voulez vous vous crée un compte ?"
        break;
      case "auth/wrong-password":
        err2 = "Mauvais mot de passe, veuillez réessayer."
        break;
      default:
        err2 = "Erreur non définie."
        break;
    }
  } else {
    switch (error) {
      case "mot-de-passe-different":
        err2 = "Les mots de passe ne correspondent pas."
        break;
      case "mot-de-passe-court":
        err2 = "Votre mot de passe doit comprendre" + '\n' + "entre 6 caractères et 30 caractères."
        break;
      case "nom-court-long":
        err2 = "Votre nom doit comprendre entre " + '\n' + "5 et 24 caractères."
        break;
      case "user-pris":
        err2 = "Ce nom d'utilisateur est déjà utilisé."
        break;
      case "user-court-long":
        err2 = "Votre nom d'utilisateur doit comprendre" + '\n' + "entre 6 et 24 caractères."
        break;
      case "titre-mal-formate":
        err2 = "Votre titre doit comprendre" + '\n' + "entre 6 et 24 caractères."
        break;
      case "descrip-mal-formate":
        err2 = "Votre description doit comprendre" + '\n' + "entre 6 et 255 caractères."
        break;
      default:
        err2 = "Erreur non définie."
        break;
    }
  }
  //alert(err2);
}
  /* --------------------------------------------------- */