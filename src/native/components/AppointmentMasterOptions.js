import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text, View, Icon, Button } from 'native-base';
import Colors from '../../../native-base-theme/variables/commonColor';
import { Actions } from 'react-native-router-flux';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';
import { Firebase, FirebaseRef } from '../../lib/firebase';



class AppointmentMasterOptions extends React.Component {
  static defaultProps = {
    error: null,
    success: null,
  }

  deleteAppointment = () => {
    let uid = Firebase.auth().currentUser.uid;

    const invited = FirebaseRef.child("appointments").child(uid).child(this.props.recipe.id).child('invitedUsers');
    invited.once('value', (snapshot) => {
      snapshot.val() ?
      Object.entries(snapshot.val()).map(([key, value]) => {
        let email = value.email.replace(/[.]/g, ',');
        FirebaseRef.child('invitedAppointments').child(email).child(this.props.recipe.id).remove();
      }) : null
    });

    let emailKey = this.props.recipe.masterEmail.replace(/[.]/g, ',');
    FirebaseRef.child('appointments').child(uid).child(this.props.recipe.id).remove();
    FirebaseRef.child('messages').child(uid).child(this.props.recipe.id).remove();
    let getuserdata = FirebaseRef.child('users/' + uid);
    getuserdata.once('value', function(snapshot){
      numofAppointments = snapshot.val().numofAppointments;
      numofAppointments--;
      FirebaseRef.child('users/' + uid).update({numofAppointments: numofAppointments});
    });
    Actions.recipes();
  }

  editAppointment = () => Actions.addAppointment1({isEdit: true, recipe: this.props.recipe});


  render() {
    const { loading, error, success, recipe } = this.props;
    // Loading
    if (loading) return <Loading />;

    return (
      <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
        <View style={{paddingBottom: 15}}>
          <Button bordered style={{width: '95%', alignSelf: 'center', borderColor: '#a32323'}} onPress={this.deleteAppointment}>
            <Text style={{textAlign: 'center', width: '100%', color: '#a32323'}}>Delete</Text>
          </Button>
        </View>
        <View style={{paddingTop: 15}}>
          <Button bordered style={{width: '95%', alignSelf: 'center', shadowColor: Colors.brandPrimary}} onPress={this.editAppointment}>
            <Text style={{textAlign: 'center', width: '100%'}}>Edit</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes || {},
  member: state.member || {},
});

export default connect(mapStateToProps)(AppointmentMasterOptions);
