
/* Description

Regroupant toute les données de l'utilisateur, setter.

------------ */

export var username ="DEFAULT USERNAME";
export var nbArticle = 0;
export var usernameLowerCase ="default username";
export var name ="DEFAULT NAME";
export var mail ="DEFAULT MAIL";
export var id = " ";


/* Setter pour l'id */
export const setId= (valReceive) =>{
  id=valReceive;
  console.log("Id set to : " ,valReceive,"\n","-------------------------------")
}


/* Setter pour le nombre d'article */
export const setNbArticle= (valReceive) =>{
  nbArticle=valReceive;
  console.log("nbArticle set to :",valReceive,"\n","-------------------------------")
}

/* Setter pour le nom d'utilisateur en majuscule*/
export const setUsername= (valReceive) =>{
  username=valReceive;
  console.log("Username set to :",valReceive,"\n","-------------------------------")
}

/* Setter pour le nom d'utilisateur en miniscule */
export const setUsernameLowerCase= (valReceive) =>{
  usernameLowerCase=valReceive;
  console.log("UsernameLowerCase set to :",valReceive,"\n","-------------------------------")
}

/* Setter pour le nom */
export const setName= (valReceive) =>{
  name=valReceive;
  console.log("Name set to :",valReceive,"\n","-------------------------------")
}

/* Setter pour le l'adresse mail*/
export const setMail= (valReceive) =>{
  mail=valReceive;
  console.log("Mail set to :",valReceive,"\n","-------------------------------")
}

