import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';



export const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  image: {
    height: "100%",
    width:"100%",
    backgroundColor:"white",

  },
  headerBars: {
    marginLeft:"70%"
  },
  header: {
  
    flex:0.2,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#FFF8F0",
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },container: {padding:5,
    height: "85%",
    width:"100%",
    flexDirection:"row",
    flexWrap:"wrap",
    
  },
  boxLeftSide :{
    width:"40%",
    height:"100%",
    marginRight:"7%",
    borderTopRightRadius: 5 ,
    borderBottomRightRadius: 5,
    marginLeft:"7%",
    backgroundColor:"#51355A",
    justifyContent: 'center',
    alignItems: 'center',


  },
  boxRightSide :{
    width:"40%",
    height:"100%",
    borderTopLeftRadius: 5 ,
    borderBottomLeftRadius: 5,
    backgroundColor:"#51355A",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:"7%",

   
  },
  btnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#9E2B25',
    borderWidth: .5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 10 ,
    width: width / 1.4,
    
  },
  imagee: {
    height:"100%",
    width:"100%",
    resizeMode: "center",
    justifyContent: "center",
    //borderTopLeftRadius: 5 ,
    //borderBottomLeftRadius: 5,
    //overflow: "hidden",
    
  },logo: {
  
    alignSelf:"center",width: "70%",
    height: "70%",

  }
});
