export var currentUser = null;
export var username ="DEFAULT USERNAME";
export var nbArticle = 0;
export var usernameLowerCase ="DEFAULT NAME";
export var name ="DEFAULT NAME";
export var mail ="DEFAULT MAIL";
export var valNavigation;
export var isLogged=false;
export var id = " ";

/* Description */



/* ------------ */

export const getId = () =>{
  return id;
}

export const setId= (val) =>{
  id=val;
  console.log("Id changed to : " ,currentUser)
}

export const setCurrentUser= (val) =>{
  currentUser=val;
  console.log("currentUser " ,currentUser)
}

export const setNavigation= (val) =>{
  valNavigation=val;
  console.log("Changed page to : ")
}

export const setNbArticle= (val) =>{
  nbArticle=val;
  console.log("nbArticle change to :",val)
}


export const setLogged= (val) =>{
  isLogged=val;
  console.log("isLogged change to : ",val);
}

export const setUsername= (val) =>{
  username=val;
  console.log("username change to :",val)
}

export const setUsernameLowerCase= (val) =>{
  usernameLowerCase=val;
  console.log("usernameLowerCase change to :",val)
}

export const setName= (val) =>{
  name=val;
  console.log("name change to :",val)
}

export const setMail= (val) =>{
  mail=val;
  console.log("mail change to :",val)
}

