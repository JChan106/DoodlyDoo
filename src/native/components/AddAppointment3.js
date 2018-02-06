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
      friendCheck: {},
      friendObject: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.printFriends = this.printFriends.bind(this);
  }

  handleChange = (name, val) => {
    // this.setState({
    //   ...this.state,
    //   [name]: val,
    // });
  }

  handleEdit () {
    let appt = this.props.apptName;
    let des = this.props.description;
    let loc = this.props.location;
    let dates = this.props.dates;
    let id = this.props.recipe.id;
    let user = Firebase.auth().currentUser;
    if (user) {
      var getuserdata = FirebaseRef.child('users/' + user.uid);
      getuserdata.once('value',function(snapshot){
        const appointments = FirebaseRef.child("appointments").child(user.uid).child(id - 1);
        appointments.update({
          appointmentName: appt,
          description: des,
          location: loc,
          dates: dates,

          //TODO: array of users invited?
        });
      })
      Actions.recipes();
    }
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
          id: numofAppointments,

          //TODO: array of users invited?
        });
      })
      Actions.recipes();
    }
  }

    componentDidMount = () => {
      that = this;
      let userEmail = this.props.member.email.replace(/[.]/g, ',');
      let tempFriends = {};
      FirebaseRef.child('friends').child(userEmail).on('value', (snapshot) => {
        Object.entries(snapshot.val()).map(([key, value]) => {
            tempFriends[value.email] = false;
        });
        console.log(tempFriends);
        that.setState({friendObject: snapshot.val(), friendCheck: tempFriends})
      });
    }

    printFriends = () => {
      return Object.entries(this.state.friendObject).map(([key, value]) => (
        <ListItem key={key} onPress={() => {
          let tempCheck = this.state.friendCheck;
          tempCheck[value.email] = !tempCheck[value.email];
          console.log(tempCheck);
          this.setState({friendCheck: tempCheck})
        }} style={{width: '100%'}}>
            <CheckBox checked={this.state.friendCheck[value.email]}/>
            <Text style={{paddingLeft: 5}}> {value.firstName} {value.lastName} </Text>
        </ListItem>
      ));
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
              <List style={{width: '90%'}}>
                {this.printFriends()}
              </List>
            </CardItem>
          </Card>
            <Spacer size={30} />

            <Button block onPress={this.props.isEdit ? this.handleEdit : this.handleSubmit}>
              <Text>Done!</Text>
            </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = {
  memberLogout: logout,
  getMemberData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAppointment3);
