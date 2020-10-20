import React, { ReactElement, useState, useEffect, useCallback } from 'react'
import {
  View, SafeAreaView, TouchableOpacity, StatusBar,
  ImageBackground, ScrollView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';

const image = "https://res.cloudinary.com/drewzxzgc/image/upload/v1602664189/qx7zyhcnhnfi6y8xhvcs.jpg"
interface Props {

}

export default function Detail({ route, navigation }: Props): ReactElement {
  const [state, setState] = useState([]);
  const [single, setSingle] = useState(``);
  const { itemId } = route.params;

  const fetchData = async () => {
    const response = await fetch("https://sampleapis.com/recipes/api/recipes/");
    const data = await response.json();
    setState(data);
  };

  const SingleRecipe = async () => {
    const response = await fetch(`https://sampleapis.com/recipes/api/recipes/${itemId}`);
    const data = await response.json();
    //console.log("Single Recipe", data);
    setSingle(data)
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onExit = () => {
        setSingle('')
        navigation.setParams({ itemId: undefined })
      }
      return onExit
    }, [])
  );


  useEffect(() => {
    SingleRecipe();
  }, [itemId])

  const images = [
    "https://res.cloudinary.com/drewzxzgc/image/upload/v1601973393/d3vdnihr3zytiatnzppi.jpg",
    "https://res.cloudinary.com/drewzxzgc/image/upload/v1601973810/fqmcryloodyg19lx6gxf.jpg",
    "https://res.cloudinary.com/drewzxzgc/image/upload/v1601974097/eum3csjpdvvnhmkhgoek.jpg",
    "https://res.cloudinary.com/drewzxzgc/image/upload/v1601974157/oinefdsu4zqn1r115s6k.jpg"
  ];

  const image = "https://res.cloudinary.com/drewzxzgc/image/upload/v1602664189/qx7zyhcnhnfi6y8xhvcs.jpg"
  const RandomImages = Math.floor(Math.random() * images.length);

  return single === '' ?
    <View style={{ flex: 1, height: 60, width: '100%' }}><Text style={{ color: 'red' }}>loading...</Text></View> :
    (
      <Container>
        <StatusBar barStyle="light-content" />
        <ScrollView>
          <ReceipeBackground source={{ uri: single.photoUrl === "" ? images[RandomImages] : single.photoUrl }} >
            <SafeAreaView>
              <DrawerButton
                onPress={navigation.openDrawer}
              >
                <FontAwesome name="bars" size={24} color="white" />
              </DrawerButton>
              <MenuBar>
                <TitleText large bold>Ingredients</TitleText>
              </MenuBar>
              <MainRecipe>
                <Text title heavy>{single?.title}</Text>
                <Divider />
                <Text bold>{single?.calories} calories per 1000g</Text>
                <Text bold>{single?.fat} fat | {single?.protien ? single?.protien : 10} protien | {single?.carbohydrate ? single?.carbohydrate : 10}carbs</Text>
              </MainRecipe>
              <Button onPress={() => single?.url}>
                <Text bold>Lean More</Text>
              </Button>
            </SafeAreaView>
          </ReceipeBackground>
          <RecipeContainer>
            <Text dark large heavy> Recipes</Text>
            <Text dark small bold> 18 recipes avaivale</Text>
            <Recipes>
              {
                state.slice(0, 3).map(recipe => {
                  return (
                    <Recipe key={recipe.id}>
                      <RecipeImage source={{ uri: recipe.photoUrl }} />
                      <RecipeInfo>
                        <Text dark>
                          {recipe.title}
                        </Text>
                        <Text dark>
                          {recipe.cuisine}
                        </Text>
                      </RecipeInfo>
                      <FontAwesome name="heart" size={15} color="blue" />
                    </Recipe>
                  )
                })
              }
            </Recipes>
          </RecipeContainer>
        </ScrollView>
      </Container>
    )
}


const Container = styled.View`
 flex:1;
 background-color: #fff;
`
const DrawerButton = styled.TouchableOpacity`
 align-items: flex-end;
 margin: 16px;
`

const ReceipeBackground = styled.ImageBackground`
width: 100%;
`

const MenuBar = styled.View`

justify-content: center;
padding: 16px;
`

const Back = styled.View`
flex-direction: row;
align-items: center;

`;

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
  ${({ bold, heavy }) => bold ? `font-weight: 600` : heavy ? `font-weight: 700` : ``}
`
const TitleText = styled(Text)`
text-align: center;

`

const MainRecipe = styled.View`
padding: 0 32px;
margin: 150px 0 32px 0;
`


const Divider = styled.View`
border-bottom-color: #fff;
border-bottom-width: 2px;
width: 150px;
margin: 8px 0;

`
const Button = styled.TouchableOpacity`
margin:  0 0 48px 32px;
background-color: rgba(255, 255, 255, 0.3);
align-self: flex-start;
padding: 6px 18px;
border-radius: 100px;
`
const RecipeContainer = styled.View`
margin-top: -20px;
padding: 32px;
background-color: #fff;
border-top-left-radius: 24px;
border-top-right-radius: 24px;

`

const Recipes = styled.View`
margin-top: 16px;
`
const Recipe = styled.View`
flex-direction: row;
align-items: center;
margin-bottom: 16px;
`
const RecipeImage = styled.Image`
width: 60px;
height: 60px;
border-radius: 8px;
`
const RecipeInfo = styled.View`
flex: 1;
margin-left: 12px;
`
