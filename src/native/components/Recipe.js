import React from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text, View, Icon, Button } from 'native-base';
import Colors from '../../../native-base-theme/variables/commonColor';
import { Actions } from 'react-native-router-flux';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';
import Swiper from 'react-native-swiper'
import Chat from './Chat';
import { Firebase, FirebaseRef } from '../../lib/firebase';


const RecipeView = ({
  error,
  recipes,
  recipeId,
}) => {

  // console.log(this.props.recipeID);
  // console.log(recipeId);
  // Error
  // if (error) return <Error content={error} />;

  // Get this Recipe from all recipes
  // let recipe = null;
  // if (recipeId && recipes) {
  //   recipe = recipes.find(item => parseInt(item.id, 10) === parseInt(recipeId, 10));
  // }

  // Get this Recipe from all recipes
  let recipe = null;
  if (recipeId && recipes) {
    recipe = recipes.find(item => item.appointmentName === recipeId);
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

  const deleteAppointment = () => {
    let uid = Firebase.auth().currentUser.uid;

    const invited = FirebaseRef.child("appointments").child(uid).child(recipe.id).child('invitedUsers');
    invited.on('value', (snapshot) => {
      snapshot.val() ?
      Object.entries(snapshot.val()).map(([key, value]) => {
        let email = value.replace(/[.]/g, ',');
        FirebaseRef.child('invitedAppointments').child(email).child(recipe.id).remove();
      }) : null
    });



    FirebaseRef.child('appointments').child(uid).child(recipe.id).remove();
    let getuserdata = FirebaseRef.child('users/' + uid);
    getuserdata.once('value', function(snapshot){
      numofAppointments = snapshot.val().numofAppointments;
      numofAppointments--;
      FirebaseRef.child('users/' + uid).update({numofAppointments: numofAppointments});
    });
    Actions.recipes();
  }

  const onPress = () => Actions.addAppointment1({isEdit: true, recipe: recipe});

  return (
    <Swiper showsButtons={false} index={1}>
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
                    <Text> Hi </Text>
                  </List>
                </Content>
              </CardItem>
            </Card>
            <Card style={{width: '95%', alignSelf: 'center'}}>
              <CardItem header bordered>
                <Icon active name="ios-person" style={{color: '#a32323'}}/>
                <Text style={{color: '#a32323'}}>Can Not Attend</Text>
              </CardItem>
              <CardItem>
                <List>
                  <Text> Hi </Text>
                </List>
              </CardItem>
            </Card>
            <Card style={{width: '95%', alignSelf: 'center'}}>
              <CardItem header bordered>
                <Icon active name="ios-remove-circle-outline" style={{color: '#a32323'}}/>
                <Text style={{color: '#a32323'}}>Has Not Responded</Text>
              </CardItem>
              <CardItem>
                <List>
                  {method(recipe.invitedUsers)}
                </List>
              </CardItem>
            </Card>
            <Spacer size={40} />
          </ScrollView>

          <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 30}}>
            <Chat />
          </View>

          {
            currentEmail === recipe.masterEmail ?
            <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
              <View style={{paddingBottom: 15}}>
                <Button bordered style={{width: '95%', alignSelf: 'center', borderColor: '#a32323'}} onPress={deleteAppointment}>
                  <Text style={{textAlign: 'center', width: '100%', color: '#a32323'}}>Delete</Text>
                </Button>
              </View>
              <View style={{paddingTop: 15}}>
                <Button bordered style={{width: '95%', alignSelf: 'center', shadowColor: Colors.brandPrimary}} onPress={onPress}>
                  <Text style={{textAlign: 'center', width: '100%'}}>Edit</Text>
                </Button>
              </View>
            </View>
            :
            null
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
