
import { ActivityIndicator, Text, View, Button, TouchableHighlight, Alert, BackHandler, Image } from 'react-native';
import * as React from 'react';
import styles from 'C:/Users/S/Desktop/React_App_Stage/App_Stage/Styles/styleHome';
import * as st from "../Fonctions/setItemInfo"


export default function Item (props) {

  
        return (
            <View style={props.styleRec}>
                <Text style={{ alignSelf: "center", marginTop: "1%" }}>{props.val[0]}</Text>
                <View style={props.styleMiniRec}>
                    <Image style={styles.logo} source={{
                        uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                    }} />
                </View>
                <Text style={{ alignSelf: "center", marginTop: "5%" }}>{props.val[1]}</Text>
            </View>
        )
    

}