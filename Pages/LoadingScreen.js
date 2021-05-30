import React from "react"
import { StyleSheet, Text, View, MaskedView, Animated } from "react-native";
import  "../assets/icon.png"



export default function App() {

    const colorLayer=<View style={[Stylesheet.absoluteFill,{backgroundColor:"#7F23D9"}]}/>
    const whiteLayer=<View style={[Stylesheet.absoluteFill,{backgroundColor:"#FFF"}]}/>


    return (
        <View style={{ flex: 1 }}>
                <View style={styles.centered}>
                    <Animated.Image>
                        source={require("../assets/icon.png")}
                        style={[{width:1000}]}
                        resizeMode="contain"
                    
                    </Animated.Image>
                </View>
         
            
            <Animated.View style={[styles.centered]}>
            <Text></Text>
            </Animated.View>
          
        </View>
    )

}

const styles = StyleSheet.create({
    centered:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
});
