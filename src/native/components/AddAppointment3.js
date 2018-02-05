import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Body, List, ListItem, Form, Item, Label, Input, CheckBox, Button, View, H3, Icon, Card, CardItem } from 'native-base';
import { Scene, Tabs, Stack, Actions } from 'react-native-router-flux';
import Messages from './Messages';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';
import {Firebase,FirebaseRef} from './../../lib/firebase.js';
import { logout, getMemberData } from '../../actions/member';
import { connect } from 'react-redux';



class AddAppointment3 extends React.Component {
  static defaultProps = {
    error: null,
    success: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      tempCheck: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    // this.setState({
    //   ...this.state,
    //   [name]: val,
    // });
  }

  handleSubmit(e) {
    let appt = this.props.apptName;
    let des = this.props.description;
    let loc = this.props.location;
    let dates = this.props.dates;
    let user = Firebase.auth().currentUser;
    if (user) {
      var numofAppointments;
      var getuserdata = FirebaseRef.child('users/' + user.uid);
      getuserdata.once('value',function(snapshot){
        let masterEmail = snapshot.val().email;
        let masterName = `${snapshot.val().firstName} ${snapshot.val().lastName}`;
        numofAppointments = snapshot.val().numofAppointments;
        // console.log("postnume: " + postnum)
        const appointments = FirebaseRef.child("appointments").child(user.uid).child(numofAppointments);
        numofAppointments++;
        FirebaseRef.child('users/' + user.uid).update({numofAppointments: numofAppointments});
        appointments.set({
          appointmentName: appt,
          description: des,
          location: loc,
          dates: dates,
          masterEmail: masterEmail,
          masterName: masterName,

          //TODO: array of users invited?
        });
      })
      Actions.recipes();
    }
  }

  render() {
    const { loading, error, success } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <Text style={{width: '100%', textAlign: 'center'}}> Step 3 of 3 </Text>
          <Spacer size={25} />
          {error && <Messages message={error} />}
          {success && <Messages message={success} type="success" />}

          <Card style={{ paddingHorizontal: 10, width: '95%', alignSelf: 'center'}}>
            <CardItem header bordered={true}>
              <Text style={{ fontWeight: '600', textAlign: 'center', width: '100%' }}>Friends List</Text>
            </CardItem>
            <CardItem cardBody bordered={true} style={{backgroundColor: 'white'}}>
            <List>
              <ListItem>
                <CheckBox checked={this.state.tempCheck} onPress={() => {this.setState({tempCheck: !this.state.tempCheck})}}/>
                <Text style={{paddingLeft: 5}}> Dillon Sio </Text>
              </ListItem>
            </List>
            </CardItem>
          </Card>
            <Spacer size={30} />

            <Button block onPress={this.handleSubmit}>
              <Text>Done!</Text>
            </Button>
        </Content>
      </Container>
    );
  }
}

export default AddAppointment3;
