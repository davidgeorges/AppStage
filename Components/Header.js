
import { Text, View,  TouchableHighlight, Image, StyleSheet } from 'react-native';
import * as React from 'react';

export default function Header(props) {


    return (

        <View  style={styles.header}>
            <Text>{props.text}</Text>
        </View>

    )


}

const styles =StyleSheet.create({
    header:{
        width:"100%",
        height:"15%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#51355A",
    }
})