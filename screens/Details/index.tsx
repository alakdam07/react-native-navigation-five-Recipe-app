import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';
interface Props {

}



export default function index({ navigation }) {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <DrawerButton
          onPress={navigation.openDrawer}
        >
          <FontAwesome name="bars" size={24} color="black" />
        </DrawerButton>
        <Text>This Detail</Text>
      </SafeAreaView>
    </>
  )
}

const Container = styled.View`
 flex:1;
 background-color: #fff;
`

const SafeAreaView = styled.SafeAreaView`
padding: 0 32px;
margin: 50px 0 32px 0;
`
const DrawerButton = styled.TouchableOpacity`
 align-items: flex-end;
 margin: 16px;
`
