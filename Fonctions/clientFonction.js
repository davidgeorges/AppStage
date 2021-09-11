
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
export const setId= (val) =>{
  id=val;
  console.log("Id changed to : " ,val)
}


/* Setter pour le nombre d'article */
export const setNbArticle= (val) =>{
  nbArticle=val;
  console.log("nbArticle change to :",val)
}

/* Setter pour le nom d'utilisateur en majuscule*/
export const setUsername= (val) =>{
  username=val;
  console.log("username change to :",val)
}

/* Setter pour le nom d'utilisateur en miniscule */
export const setUsernameLowerCase= (val) =>{
  usernameLowerCase=val;
  console.log("usernameLowerCase change to :",val)
}

/* Setter pour le nom */
export const setName= (val) =>{
  name=val;
  console.log("name change to :",val)
}

/* Setter pour le l'adresse mail*/
export const setMail= (val) =>{
  mail=val;
  console.log("mail change to :",val)
}

