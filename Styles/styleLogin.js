import { StyleSheet, Text, View, Dimensions } from 'react-native';


const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  image: {
    height: "100%",
    backgroundColor:"white"
    
  },
  title: {
    marginTop: "5%",
  },
  top: {
    flex: 2,
    ///backgroundColor: "red",
  },
  topComp: {
    position:"absolute",
    top:0,
    alignSelf:"center",
    marginTop:height/18,
  },
  mid: {
    flex: 3,
   // backgroundColor: "orange"
  },
  midComp: {
    position:"absolute",
    top:0,
    alignSelf:"center",
    marginTop:height/14,

  },
  bottom: {
    flex: 2,
    //backgroundColor: "green",
  },
  bottomComp: {
    alignSelf:"center",
    marginBottom:height/14,
  },
  logo: {
    width: 100,
    height: 65,
    alignSelf:"center",

  },
  sectionStyle: {
    marginTop:height/50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    height: height/18,
    width: width / 1.4,
  },
  input: {
    width: width / 1.5,
  },
  login: {
    marginTop: "10%",
    width: width / 1.4,
    marginBottom: "5%",
  },
  register: {
    width: width / 1.4,
  },
  shadow: {
    shadowColor:"#7F5DF0",
    shadowOffset:{
      width:0,
      height:10,
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:5

  }

});
