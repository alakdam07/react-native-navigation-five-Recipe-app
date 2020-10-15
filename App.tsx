import React from 'react'; import { StatusBar } from 'expo-status-bar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import Detail from './screens/Details';
import SideBar from './components/SideBar'
import { Dimensions } from 'react-native';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Drawer.Navigator
        drawerStyle={{
          //backgroundColor: "green",
          backgroundColor: '#c6cbef',
          width: 240,
        }}
        drawerContentOptions={{
          maginTop: 20

        }}
        sceneContainerStyle={{
          //margin: 20
        }}
        statusBarAnimation="fade"
        hideStatusBar={{ true}}
        initialRouteName="Home"
        drawerContent={props => <SideBar {...props} />} >
        <Drawer.Screen name="Home" component={Home}
          options={{
            title: 'Home',
            drawerIcon: ({ focused, size }) => (
              <Icon
                name="home"
                size={size}
                color={focused ? '#7cc' : '#ccc'}
              />
            ),
          }}

        />
        <Drawer.Screen name="Notifications"
          component={Detail}
          options={{
            title: 'Detail',

            drawerIcon: ({ focused, size }) => (
              <Icon
                name="home"
                size={size}
                color={focused ? '#7cc' : '#ccc'}
              />
            ),

          }} />
      </Drawer.Navigator>
    </NavigationContainer >
  );
}


