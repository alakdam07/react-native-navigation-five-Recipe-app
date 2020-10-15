import React from 'react';
import { View, ImageBackground, Image, ScrollView, Text, Button } from 'react-native';
import styled from 'styled-components';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

interface Props {

}
const images = {
  first: 'https://res.cloudinary.com/drewzxzgc/image/upload/v1577715476/csohqfo1e4lb1qer7kcc.jpg',
  second: 'https://res.cloudinary.com/drewzxzgc/image/upload/v1597400474/usmdh09eqmmnwufwewrx.jpg'
}



export default SideBar = props => (

  <ScrollView>
    <BackGroundImage source={{ uri: images.first }}>
      <ProfileImage source={{ uri: images.second }} />
      <ProfileName>John Does</ProfileName>
    </BackGroundImage>
    <ChildrenComponents >
      <DrawerItemList {...props} />
    </ChildrenComponents>
    <View style={{
      flexDirection: 'row',
      alignItems: 'flex-end',
    }}>
      <Button title="Hello" />
    </View>

  </ScrollView >

)


const ChildrenComponents = styled.View`
  flex: 1;
`
const BackGroundImage = styled.ImageBackground`
  padding: 20px;
  padding-top: 48px;
`
const ProfileImage = styled.Image`
width: 80px;
height: 80px;
border-radius: 40px;
border-width: 3px;
border-color: #fff;
`

const ProfileName = styled.Text`
color: #fff;
font-size: 25px;
font-weight: 800;
margin-top: 8px;
`
