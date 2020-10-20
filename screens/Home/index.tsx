import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import styled from 'styled-components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
interface Props {

}

export default function index({ navigation }: Props) {

  const [state, setState] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("https://sampleapis.com/recipes/api/recipes");
    const data = await response.json();
    setState(data);
  };

  const images = [
    "https://res.cloudinary.com/drewzxzgc/image/upload/v1601973393/d3vdnihr3zytiatnzppi.jpg",
    "https://res.cloudinary.com/drewzxzgc/image/upload/v1601973810/fqmcryloodyg19lx6gxf.jpg",
    "https://res.cloudinary.com/drewzxzgc/image/upload/v1601974097/eum3csjpdvvnhmkhgoek.jpg",
    "https://res.cloudinary.com/drewzxzgc/image/upload/v1601974157/oinefdsu4zqn1r115s6k.jpg"
  ];

  const image = "https://res.cloudinary.com/drewzxzgc/image/upload/v1602664189/qx7zyhcnhnfi6y8xhvcs.jpg"
  const RandomImages = Math.floor(Math.random() * images.length);

  return (
    <>
      <Container>
        <StatusBar barStyle="light-content" />
        <ReceipeBackground source={{ uri: image }} >
          <SafeAreaView>
            <DrawerButton
              onPress={navigation.openDrawer}
            >
              <FontAwesome name="bars" size={24} color="white" />
            </DrawerButton>
          </SafeAreaView>
        </ReceipeBackground>
        <ScrollView style={{ padding: 8 }}>
          <ImageConatiner>
            {state.map((recipe) => {
              let ingredients = recipe?.ingredients?.split("\n")?.join(", ");
              return (
                <View key={recipe.id}>
                  <View>
                    <Images
                      source={{ uri: recipe.photoUrl === "" ? images[RandomImages] : recipe.photoUrl }}
                    />
                  </View>
                  <Button onPress={() => {
                    navigation.navigate('Detail', {
                      itemId: `${recipe.id}`,
                    });
                  }}>
                    <Text dark>Detail</Text>
                  </Button>
                </View>
              );
            })}
          </ImageConatiner>
        </ScrollView>
      </Container>
    </>
  )
}


const Container = styled.View`
 flex:1;

`

const SafeAreaView = styled.SafeAreaView`
padding: 0 32px;
margin: 50px 0 32px 0;
`
const DrawerButton = styled.TouchableOpacity`
 align-items: flex-end;
 margin: 16px;
`
const ImageConatiner = styled.View`
flex:1;
flex-wrap: wrap;
flex-direction: row;
justify-content: space-between;

`
const Images = styled.Image`
width: 190px;
height:200px;
border-radius: 5px;
margin-bottom: 5px;

`

const ReceipeBackground = styled.ImageBackground`
width: 100%;
`

const Button = styled.TouchableOpacity`
margin:  0 0 28px 32px;
background-color: rgba(192, 23, 23, 0.3);
align-self: flex-start;
padding: 6px 18px;
border-radius: 100px;
`
const Text = styled.Text`
color: ${props => props.dark ? "#000" : "#fff"};
font-family: "AvenirNext-Regular";
font-weight: 500;
${({ title, large, small }) => {
    switch (true) {
      case title:
        return `font-size: 32px`
      case large:
        return `font-size: 20px`
      case small:
        return `font-size: 13px`

    }
  }};
  ${({ bold, heavy }) => bold ? `font-weight: 600` : heavy ? `font-weight: 700` : ``};


`
