import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';


export const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  image: {
    flex: 1,
    backgroundColor: "white",

  },
  headerBars: {
    marginLeft: "70%"
  },
  header: {

    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF8F0",
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }, container: {
    flex: 1,


  },
  boxLeftSide: {
    width: "40%",
    height: "100%",
    marginRight: "7%",
    borderRadius: 5,
    marginLeft: "7%",
    backgroundColor: "#51355A",
    justifyContent: 'center',
    alignItems: 'center',


  },
  boxRightSide: {
    width: "40%",
    height: "100%",
    borderRadius: 5,
    backgroundColor: "#51355A",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: "7%",


  },
  btnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9E2B25',
    borderWidth: .5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 10,
    width: width / 1.4,

  },
  imagee: {
    height: "100%",
    width: "100%",
    resizeMode: "center",
    justifyContent: "center",
    //borderTopLeftRadius: 5 ,
    //borderBottomLeftRadius: 5,
    //overflow: "hidden",

  }, logo: {

    alignSelf: "center", width: "70%",
    height: "70%",

  },
  sectionStyle: {
    marginTop: height / 22,
    flexDirection: 'row',
    alignSelf: 'center',
    borderBottomWidth: 1,
    height: 40,
    width: width / 1.4,


  },
  input: {
    width: width / 1.4,
  },
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  }
});
