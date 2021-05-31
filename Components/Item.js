import { ActivityIndicator, Text, View, Button, TouchableHighlight, Alert, BackHandler, Image } from 'react-native';
import * as React from 'react';
import styles from 'C:/Users/S/Desktop/React_App_Stage/App_Stage/Styles/styleHome';
import * as st from "../Fonctions/setItemInfo"
import tailwind from 'tailwind-rn';


export default function Item(props) {


    return (

        <View key={props.k} style={tailwind(' text-center')}>
            <View style={tailwind('  mb-8')}>
                <TouchableHighlight style={tailwind('mx-7 rounded-2xl')} onPress={() =>{}
                    /*permet daller à la page Details Manga
                    navigate('Details Manga', {
                        id: props.manga.id,
                        otherParam: 'anything you want here',
                    })*/
                }>
                    <Image style={tailwind(' h-48 w-full rounded-2xl ')} source={{ uri: props.url }} alt={'image' + i}></Image>

                </TouchableHighlight>
                <Text style={tailwind(' text-center font-bold mt-2')}>{props.description}</Text>
            </View>

        </View>
    )


}