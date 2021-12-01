import { StyleSheet,Dimensions} from 'react-native';




export const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  image: {
    height: "100%",
    width:"100%",
    backgroundColor:"white",

  },
  header : {
    flex: 1,
    backgroundColor: 'white',
    height: height / 10,
    borderBottomWidth: 1,
    width: "90%",
    alignSelf: 'center',
    justifyContent:"center" 
  },
  textHeader : {
    alignSelf: "center"
  },

});
