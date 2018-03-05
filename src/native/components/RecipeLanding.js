import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text, Right, View, Icon, Button } from 'native-base';
import Colors from '../../../native-base-theme/variables/commonColor';
import { Actions } from 'react-native-router-flux';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';
import { Firebase, FirebaseRef } from '../../lib/firebase';



class RecipeLanding extends React.Component {
  static defaultProps = {
    error: null,
    success: null,
  }

  // Build Method listing
   printDates = (object) => object ? Object.entries(object).map(([key, value]) => (
      <ListItem key={key} rightIcon={{ style: { opacity: 0 } }} onPress={() => Actions.DateInputs({date: key})}>
          <Body>
            <Text>{key}</Text>
          </Body>
          <Right>
            <Icon active name='arrow-forward' />
          </Right>
      </ListItem>
    )) : null

  render() {
    const { loading, error, success, recipes, recipe } = this.props;
    // Loading
    if (loading) return <Loading />;

    return (
      <View>
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
            <Icon active name="md-calendar" style={{color: Colors.brandPrimary}}/>
            <Text style={{color: Colors.brandPrimary}}>Available Dates</Text>
          </CardItem>
          <CardItem>
            <Content>
              <List>
                {this.printDates(recipe.dates)}
              </List>
            </Content>
          </CardItem>
        </Card>
        <Spacer size={40} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes || {},
  member: state.member || {},
});

export default connect(mapStateToProps)(RecipeLanding);
