
import Home from '../Pages/Home';
import Test from '../Pages/Profile';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme, Avatar, Title, Caption, Paragraph, Drawer, TouchableRipple, Switch } from 'react-native-paper';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, drawerIcon, focused } from '@react-navigation/drawer';
import * as db from '../Fonctions/firebaseJS';
import * as cl from "../Fonctions/clientFonction"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section style={styles.drawerTop}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image source={{ uri: 'https://api.adorable.io/avatars/50/abott@adorable.png' }} size={50} />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>{cl.username}</Title>
                <Caption style={styles.caption, { marginBottom: 10 }}>{cl.mail}</Caption>
              </View>
            </View>
          </View>
        </View>
      </Drawer.Section>
      <Drawer.Section style={{ marginTop: 10 }}>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialIcons name="logout" size={24} color="black" />)}
          label="Logout" onPress={() => db.toLogOut(() => { })} />
      </Drawer.Section>


    </DrawerContentScrollView>
  );
}


const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  drawerTop: {
    //backgroundColor: "#51355A",
  },
});