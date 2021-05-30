

export var username ="DEFAULT USERNAME";
export var name =" ";
export var mail ="DEFAULT MAIL";
export var valNavigation;
export var isLogged=false;

export const setNavigation= (val) =>{
  valNavigation=val;
  console.log("valNavigation change")
}



export const setLogged= (val) =>{
  isLogged=val;
  console.log("isLogged change to : ",val);
}

export const setUsername= (val) =>{
  username=val;
  console.log("username change")
}


export const setName= (val) =>{
  name=val;
  console.log("name change")
}

export const setMail= (val) =>{
  mail=val;
  console.log("mail change")
}

