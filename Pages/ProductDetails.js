
import React from 'react';
import { Image, View, Text, Pressable } from 'react-native';

export default function App({route,navigation }) {

    const { data} = route.params;

    return (

      
            <View>
                <Text>
                  Value :  {data.description}
                </Text>
            </View>

      

    )

}