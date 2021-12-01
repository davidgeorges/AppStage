import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';


export const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  mainBackground: {
    flex: 1,
    backgroundColor: "white",
  },
  section: {
    marginTop: height / 22,
    flexDirection: 'row',
    alignSelf: 'center',
    borderBottomWidth: 1,
    height: 40,
    width: width / 1.4,
  },
  header: {
    flex: 1, borderBottomWidth: 1,
    width: "90%",
    alignSelf: 'center', 
    justifyContent: "center",
    paddingTop:"2%" 
  },
  textHeader: {
    alignSelf: "center", borderBottomWidth: 1 
  },
  btnConfirm: {
    justifyContent: "center",
    alignSelf: 'center',
    backgroundColor: '#001242',
    borderRadius: 40,
    height: height / 20,
    width: width / 1.6,
    position: "absolute",
    bottom: height / 10
  },
  

});
