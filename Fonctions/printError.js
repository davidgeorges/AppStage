

/* Description 

Fonction pour gérer les différentes erreur reçu manuellement (NEW 28/05/21 , A DEVELOPPER) */



/* Fonction pour gérer les différentes erreur reçu (OK 19/05/21 , A DEVELOPPER) */
export var err = " ";
export var err2 = " ";

export const printError2 = (error, manuel) => {

  if (!(manuel)) {
    switch (error) {
      case "auth/email-already-in-use":
        err2 = "Email address already in use."
        break;
      case "username-already-in-use":
        err2 = "Username already in use."
        break;
      case "auth/invalid-email":
        err2 = "Invalid email address format."
        break;
      case "auth/weak-password":
        err2 = "Password too weak."
        break;
      case "auth/too-many-requests":
        err2 ="Too many requests,"+ '\n' +"Please try again in a minute."
        break;
      case "auth/user-not-found":
        err2 = "User does not exist."+ '\n' +"Please create an account."
        break;
      case "auth/wrong-password":
        err2 = "Wrong password, please try again."
        break;
      default:
        err2 = "Undefined error."
        break;
    }
  } else {
    switch (error) {
      case "mot-de-passe-different":
        err2 = "Passwords do not match."
        break;
      case "mot-de-passe-court":
        err2 = "Your password must be between," + '\n' + "6 and 30 characters"
        break;
      case "nom-court-long":
        err2 = "Your name must be between,"+ '\n' +"5 and 24 characters."
        break;
      case "user-pris":
        err2 = "This username is already used."
        break;
      case "user-court-long":
        err2 = "Your username must be between," + '\n' + "6 and 24 characters."
        break;
      case "titre-mal-formate":
        err2 = "Your title must be between," + '\n' + "6 and 24 characters."
        break;
      case "descrip-mal-formate":
        err2 = "Your description must be between," + '\n' + "6 and 300 characters."
        break;
      case "titre-non-disponible":
        err2 = "You already have an article with this title."
        break;
      case "3-article-max":
        err2 = "You have reached," + '\n' +  "the maximum number of articles (4)."
        break;
      default:
        err2 = "Undefined error."
        break;
    }
  }
}
  /* --------------------------------------------------- */