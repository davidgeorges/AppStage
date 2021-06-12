
import { ActivityIndicator, Text, View, Button, TouchableHighlight, Alert, BackHandler, Image } from 'react-native';
import * as React from 'react';
import styles from 'C:/Users/S/Desktop/React_App_Stage/App_Stage/Styles/styleHome';
import * as st from "../Fonctions/setItemInfo"
import tailwind from 'tailwind-rn';


export default function Item(props) {


    return (

        <View  style={tailwind(' text-center')}>
            <View style={tailwind('  mb-8')}>
                <TouchableHighlight style={tailwind('mx-7 rounded-2xl ')} onPress={() => { console.log("cliquer") }

                }>
                    <Image style={tailwind(' h-32 w-52 rounded-6x1 self-center')} source={{ uri: props.url }} ></Image>

                </TouchableHighlight>
                <Text style={tailwind(' text-center font-bold mt-2')}>{props.nom}</Text>
            </View>

        </View>

    )


}