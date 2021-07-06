import { StyleSheet, Text, View, Dimensions } from 'react-native';


const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  image: {
    height: "100%",
    backgroundColor:"white"
  },
  title: {
    marginTop: "5%",
    alignSelf:"center",
  },
  top: {
    flex: 2,
    //backgroundColor: "red",
  },
  topComp: {
    position:"absolute",
    top:0,
    alignSelf:"center",
    marginTop:height/14,
  },
  mid: {
    flex: 3,
    //backgroundColor: "orange"
  },
  midComp: {
    position:"absolute",
    top:0,
    alignSelf:"center",

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
  },
  sectionStyle:{
    marginTop:"1%",
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    height: 40,
    width: width / 1.4,
   
  },
  input:{
    width: width / 1.5,
  },
  confirm:{
    marginTop: "10%",
    width: width / 1.4,
    marginBottom: "5%",
  },
  cancel:{
    width: width / 1.4,
    
  },


});
