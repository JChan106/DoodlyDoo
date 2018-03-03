import React from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text, View, Icon, Button } from 'native-base';
import Colors from '../../../native-base-theme/variables/commonColor';
import { Actions } from 'react-native-router-flux';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';
import Swiper from 'react-native-swiper'
import Chat from './Chat';
import RecipeActivityTracker from './RecipeActivityTracker';
import AppointmentMasterOptions from './AppointmentMasterOptions';
import TimeInput from './TimeInput';
import { Firebase, FirebaseRef } from '../../lib/firebase';


const RecipeView = ({
  error,
  recipes,
  recipeId,
  member,
  setCurrentRecipe,
}) => {

  // Get this Recipe from all recipes
  let recipe = null;
  if (recipeId && recipes) {
    recipe = recipes.find(item => String(item.id) === recipeId);
  }

  // Recipe not found
  if (!recipe) return <Error content={ErrorMessages.recipe404} />;

  let currentEmail = null;
  if (Firebase.auth().currentUser) {
    let uid = Firebase.auth().currentUser.uid;
    FirebaseRef.child('users').child(uid).on('value', (snapshot) => {
      currentEmail = snapshot.val().email;
    });
  }




  // Build Method listing
  const method = (object) => object ? Object.entries(object).map(([key, value]) => (
      <ListItem key={key} rightIcon={{ style: { opacity: 0 } }}>
        <Text>{key}</Text>
      </ListItem>
    )) : null

  return (
    <Swiper removeClippedSubviews={false} >
          <ScrollView style={{backgroundColor: 'white'}}>
            <View style={{alignItems: 'center', paddingTop: 15, paddingBottom: 15}}>
              <H3>{recipe.appointmentName}</H3>
              <Text>Organizer: {recipe.masterName}</Text>
            </View>
            <Card style={{width: '95%', alignSelf: 'center', paddingBottom: 15}}>
              <CardItem header bordered>
                <Icon active name="md-menu" style={{color: Colors.brandPrimary}}/>
                <Text>Description</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>{recipe.description}</Text>
                </Body>
              </CardItem>
            </Card>
            <Card style={{width: '95%', alignSelf: 'center'}}>
              <CardItem bordered>
                <Icon active name="md-pin" style={{color: Colors.brandPrimary}}/>
                <Text style={{fontWeight: '900'}}> Location: </Text>
                <Text> {recipe.location} </Text>
              </CardItem>
            </Card>
            <Card style={{width: '95%', alignSelf: 'center'}}>
              <CardItem header bordered>
                <Text style={{color: '#49c179'}}>Available Dates</Text>
              </CardItem>
              <CardItem>
                <List>
                  {method(recipe.dates)}
                </List>
              </CardItem>
            </Card>
            <Spacer size={40} />
          </ScrollView>

          <ScrollView style={{backgroundColor: 'white'}}>
            <RecipeActivityTracker recipe={recipe} />
          </ScrollView>

          <ScrollView contentContainerStyle={30} keyboardShouldPersistTaps='always' style={{flex:1, backgroundColor: 'white'}} >
              <TimeInput />
          </ScrollView>

          {
            currentEmail === recipe.masterEmail ?
            <AppointmentMasterOptions recipe={recipe} />
            :
            <ScrollView contentContainerStyle={30} keyboardShouldPersistTaps='always' style={{flex:1, backgroundColor: 'white'}} >
              <Text> Temp Screen </Text>
            </ScrollView>
          }


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
