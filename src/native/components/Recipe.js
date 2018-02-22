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
import { Firebase, FirebaseRef } from '../../lib/firebase';


const RecipeView = ({
  error,
  recipes,
  recipeId,
  member,
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

  let canAttend = true;
  let name = `${member.firstName} ${member.lastName}`
  if(currentEmail && currentEmail != recipe.masterEmail) {
    let invitedInfo = FirebaseRef.child('invitedAppointments').child(currentEmail.replace(/[.]/g, ',')).child(recipe.id).child('invitedUsers').child(name);
    invitedInfo.on('value', (snapshot) => {
      snapshot.val() ? canAttend = snapshot.val().canAttend : null;
    });
  }


  // Build Method listing
  const method = (object) => object ? Object.entries(object).map(([key, value]) => (
      <ListItem key={key} rightIcon={{ style: { opacity: 0 } }}>
        <Text>{key}</Text>
      </ListItem>
    )) : null

  // Build Method listing
  const noResponses = (object) => object ? Object.entries(object).map(([key, value]) => {
    if (value.canAttend && !value.inputted)
    return (
      <ListItem key={key} rightIcon={{ style: { opacity: 0 } }}>
        <Text>{key}</Text>
      </ListItem>
    )
  }) : null

  const noShows = (object) => object ? Object.entries(object).map(([key, value]) => {
    if (!value.canAttend)
    return (
      <ListItem key={key} rightIcon={{ style: { opacity: 0 } }}>
        <Text>{key}</Text>
      </ListItem>
    )
  }) : null

  const attendees = (object) => object ? Object.entries(object).map(([key, value]) => {
    if (value.canAttend && value.inputted)
    return (
      <ListItem key={key} rightIcon={{ style: { opacity: 0 } }}>
        <Text>{key}</Text>
      </ListItem>
    )
  }) : null

  const deleteAppointment = () => {
    let uid = Firebase.auth().currentUser.uid;

    const invited = FirebaseRef.child("appointments").child(uid).child(recipe.id).child('invitedUsers');
    invited.on('value', (snapshot) => {
      snapshot.val() ?
      Object.entries(snapshot.val()).map(([key, value]) => {
        let email = value.email.replace(/[.]/g, ',');
        FirebaseRef.child('invitedAppointments').child(email).child(recipe.id).remove();
      }) : null
    });

    let emailKey = recipe.masterEmail.replace(/[.]/g, ',');
    FirebaseRef.child('appointments').child(uid).child(recipe.id).remove();
    FirebaseRef.child('messages').child(uid).child(recipe.id).remove();
    let getuserdata = FirebaseRef.child('users/' + uid);
    getuserdata.once('value', function(snapshot){
      numofAppointments = snapshot.val().numofAppointments;
      numofAppointments--;
      FirebaseRef.child('users/' + uid).update({numofAppointments: numofAppointments});
    });
    Actions.recipes();
  }

  const onPress = () => Actions.addAppointment1({isEdit: true, recipe: recipe});

  const onCantAttend = () => {
    let uid = Firebase.auth().currentUser.uid;
    let email = currentEmail.replace(/[.]/g, ',')
    let userName = `${member.firstName} ${member.lastName}`;

    canAttend = false;
    FirebaseRef.child('appointments').child(recipe.masteruid).child(recipe.id).child('invitedUsers').child(userName).update({canAttend: false});
    FirebaseRef.child('invitedAppointments').child(email).child(recipe.id).child('invitedUsers').child(userName).update({canAttend: false})
  }

  const onCanAttend = () => {
    let uid = Firebase.auth().currentUser.uid;
    let email = currentEmail.replace(/[.]/g, ',')
    let userName = `${member.firstName} ${member.lastName}`;

    canAttend = true;
    FirebaseRef.child('appointments').child(recipe.masteruid).child(recipe.id).child('invitedUsers').child(userName).update({canAttend: true});
    FirebaseRef.child('invitedAppointments').child(email).child(recipe.id).child('invitedUsers').child(userName).update({canAttend: true});
  }

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
                    {attendees(recipe.invitedUsers)}
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
                  {noShows(recipe.invitedUsers)}
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
                  {noResponses(recipe.invitedUsers)}
                </List>
              </CardItem>
            </Card>
            <Spacer size={30} />
            {
              currentEmail != recipe.masterEmail ?
                canAttend ?
                  <View>
                    <Button bordered
                            style={{width: '95%', alignSelf: 'center', borderColor: '#a32323'}}
                            onPress={onCantAttend}>
                      <Text style={{width: '100%', textAlign: 'center', color: '#a32323'}}>Can Not Attend</Text>
                    </Button>
                    <Spacer size={60} />
                  </View> :
                  <View>
                    <Button bordered
                            style={{width: '95%', alignSelf: 'center', borderColor: Colors.brandPrimary}}
                            onPress={onCanAttend}>
                      <Text style={{width: '100%', textAlign: 'center', color: Colors.brandPrimary}}>Undo Can Not Attend</Text>
                    </Button>
                    <Spacer size={60} />
                  </View> : null
            }
          </ScrollView>





          <ScrollView contentContainerStyle={30} keyboardShouldPersistTaps='always' style={{flex:1, backgroundColor: 'white'}} >
              <Chat recipe={recipe}/>
          </ScrollView>

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
