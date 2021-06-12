

export var username ="AzeVII";
export var nbAnnounce = 0;
export var usernameLowerCase ="azevii";
export var name ="DEFAULT NAME";
export var mail ="georges.david.jk@gmail.com";
export var valNavigation;
export var isLogged=false;

export const setNavigation= (val) =>{
  valNavigation=val;
  console.log("valNavigation change")
}

export const setNbAnnounce= (val) =>{
  nbAnnounce=val;
  console.log("nbAnnounce change")
}


export const setLogged= (val) =>{
  isLogged=val;
  console.log("isLogged change to : ",val);
}

export const setUsername= (val) =>{
  username=val;
  console.log("username change")
}

export const setUsernameLowerCase= (val) =>{
  usernameLowerCase=val;
  console.log("usernameLowerCase change")
}

export const setName= (val) =>{
  name=val;
  console.log("name change")
}

export const setMail= (val) =>{
  mail=val;
  console.log("mail change")
}

