import React from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text, View, Icon } from 'native-base';
import Colors from '../../../native-base-theme/variables/commonColor';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';
import Swiper from 'react-native-swiper'
import Chat from './Chat';

const RecipeView = ({
  error,
  recipes,
  recipeId,
}) => {
  // Error
  if (error) return <Error content={error} />;

  // Get this Recipe from all recipes
  let recipe = null;
  if (recipeId && recipes) {
    recipe = recipes.find(item => parseInt(item.id, 10) === parseInt(recipeId, 10));
  }

  // Recipe not found
  if (!recipe) return <Error content={ErrorMessages.recipe404} />;

  // Build Ingredients listing
  const ingredients = recipe.ingredients.map(item => (
    <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
      <Text>{item}</Text>
    </ListItem>
  ));

  // Build Method listing
  const method = recipe.method.map(item => (
    <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
      <Text>{item}</Text>
    </ListItem>
  ));

  return (
    <Swiper showsButtons={false} index={1}>
          <ScrollView style={{backgroundColor: 'white'}}>
            <View style={{alignItems: 'center', paddingTop: 15, paddingBottom: 15}}>
              <H3>Some Appointment</H3>
              <Text>Organizer: Jackie Chan</Text>
            </View>
            <Card style={{width: '95%', alignSelf: 'center', paddingBottom: 15}}>
              <CardItem header bordered>
                <Icon active name="md-menu" style={{color: Colors.brandPrimary}}/>
                <Text>Description</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>"Play Smash. Twice Sucks"</Text>
                </Body>
              </CardItem>
            </Card>
            <Card style={{width: '95%', alignSelf: 'center'}}>
              <CardItem bordered>
                <Icon active name="md-pin" style={{color: Colors.brandPrimary}}/>
                <Text style={{fontWeight: '900'}}> Location: </Text>
                <Text> Kevins Place </Text>
              </CardItem>
            </Card>
            <Card style={{width: '95%', alignSelf: 'center'}}>
              <CardItem header bordered>
                <Text style={{color: '#49c179'}}>Available Times</Text>
              </CardItem>
              <CardItem>
                <List>
                  {method}
                </List>
              </CardItem>
            </Card>
            <Spacer size={40} />
          </ScrollView>

          <ScrollView style={{backgroundColor: 'white'}}>
            <View style={{alignItems: 'center', paddingTop: 15, paddingBottom: 15}}>
              <H3>Invited People</H3>
            </View>
            <Card style={{width: '95%', alignSelf: 'center'}}>
              <CardItem header bordered>
                <Icon active name="ios-person" style={{color: Colors.brandPrimary}}/>
                <Text>Attendees</Text>
              </CardItem>
              <CardItem>
                <Content>
                  <List>
                    {ingredients}
                  </List>
                </Content>
              </CardItem>
            </Card>
            <Card style={{width: '95%', alignSelf: 'center'}}>
              <CardItem header bordered>
                <Text style={{color: '#a32323'}}>Can Not Attend</Text>
              </CardItem>
              <CardItem>
                <List>
                  {method}
                </List>
              </CardItem>
            </Card>
            <Card style={{width: '95%', alignSelf: 'center'}}>
              <CardItem header bordered>
                <Text style={{color: '#a32323'}}>Has Not Responded</Text>
              </CardItem>
              <CardItem>
                <List>
                  {method}
                </List>
              </CardItem>
            </Card>
            <Spacer size={40} />
          </ScrollView>

          <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 30}}>
            <Chat />
          </View>
    </Swiper>
  );
};

RecipeView.propTypes = {
  error: PropTypes.string,
  recipeId: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

RecipeView.defaultProps = {
  error: null,
};

export default RecipeView;
