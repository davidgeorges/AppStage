import { StyleSheet, Text, View, Dimensions } from 'react-native';


const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  image: {
    height: "100%",
    backgroundColor:"#FFF8F0"
  },
  title: {
    position:"absolute",
    bottom:"25%",
    left:"5%",
  },
  mid: {
    flex: 3,
    backgroundColor: "orange"
    //flexDirection: 'row',
  },
  midComp: {
    marginTop: '2.5%',
    marginBottom: '2.5%',
    
  },
  logo: {
    width: width/2.6,
    height: "100%",
  },
  sectionStyle: {
    marginTop:"5%",
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    height: 40,
    width: width / 1.4,
  },
  input: {
    marginTop:"5%",
    width: width / 1.4,
  },
  testBtn: {
    width: width / 1.4,
    marginBottom: "2%",
    marginTop: "2%",
  },
  retourBtn: {
    width: width / 1.4,
  },
  headerBars: {
    position:"absolute",
    bottom:"25%",
    left:"88%",

  },
  header: {
    
    flex:0.5,
    backgroundColor:"#FFF8F0",
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  footer: {
    flex:0.5,
    backgroundColor:"#FFF8F0",
    borderTopColor: 'black',
    borderTopWidth: 1,

  },
  recTop: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor:"black",
    width:"100%"
  },
  recBot: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor:"yellow",
    width:"100%"
  },
  recComp1: {
    
    marginLeft:width/32.5,
    marginRight:width/40,
    width: width/2.2,
    backgroundColor: 'powderblue',
    height:"90%",
    marginTop:height/60,
  },
  recComp2: {
    
    width: width/2.2,
    backgroundColor: 'purple',
    height:"90%",
    marginTop:height/60,
  },
  recComp3: {
    marginLeft:width/32.5,
    marginRight:width/40,
    width: width/2.2,
    backgroundColor: 'green',
    height:"90%",
    marginTop:height/60,
  },
  recComp4: {
    width: width/2.2,
    backgroundColor: 'red',
    height:"90%",
    marginTop:height/60,
  },
  miniRecComp1:{
    marginLeft:width/28,
    marginRight:width/40,
    marginTop:height/80,
    width: width/2.6,
    backgroundColor: 'yellow',
    height: "75%",
  },
  miniRecComp2:{
    marginLeft:width/28,
    marginRight:width/40,
    marginTop:height/80,
    width: width/2.6,
    backgroundColor: 'red',
    height: "75%",
  },
  miniRecComp3:{
    marginLeft:width/28,
    marginRight:width/40,
    marginTop:height/80,
    width: width/2.6,
    backgroundColor: 'white',
    height: "75%",
  },
  miniRecComp4:{
    marginLeft:width/28,
    marginRight:width/40,
    marginTop:height/80,
    width: width/2.6,
    backgroundColor: 'black',
    height: "75%",
  }, container: {
    flex: 1,
    fontFamily: 'Montserrat',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor : '#A6E4D0',
  },



});
