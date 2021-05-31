import { StyleSheet, Text, View, Dimensions } from 'react-native';


const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  image: {
    height: "100%",
    backgroundColor:"#FFF8F0"
    
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
    marginTop:height/14,
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
    marginTop:"5%",
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


});