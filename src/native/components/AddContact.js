import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View, H1, H2, H3 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Messages from './Messages';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';
import {Firebase,FirebaseRef} from './../../lib/firebase.js';

class AddContact extends React.Component {

  static defaultProps = {
    error: null,
    success: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      errorMessage: '',
      foundUser: false,
    };
    this.emailToKey = this.emailToKey.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = (e) => {
    if (this.state.firstName == '' || this.state.lastName == '' || this.state.email == '') {
      this.setState({errorMessage: "Please fill out all missing fields."});
    }
    else {
      let that = this;
      let user = Firebase.auth().currentUser;
      let userfound = false;
      if (user) {
        console.log("user is: " + user.email);
        FirebaseRef.child("users/").once("value").then(function(questionsSnapshot) {
          return questionsSnapshot.forEach(function(questionSnapshot) {
            return (
              (questionSnapshot.val().email == that.state.email) ? (
                that.setState({foundUser: true}),
                console.log("hit")
              )
              :
                console.log(questionSnapshot.val().email),
                console.log("hi")
            );
          });
        });
        if(that.state.foundUser) {
          console.log("ded");
          that.setState({errorMessage: ''});
          var numFriends;
          var getuserdata = FirebaseRef.child('users/' + user.uid);
          getuserdata.once('value',function(snapshot){
            numFriends = snapshot.val().numFriends;
            numFriends++;
            FirebaseRef.child('users/' + user.uid).update({numFriends: numFriends});
          })
          const friends = FirebaseRef.child("friends").child(user.uid).child(that.emailToKey(that.state.email));
          friends.set({
            firstName: that.state.firstName,
            lastName: that.state.lastName,
            email: that.state.email,
          });
          Actions.pop();
        }
        else {
          this.setState({errorMessage: 'User not found.'});
        }
      }
    }
  }

  emailToKey(emailAddress) {
     return emailAddress.replace(/[.]/g, ',');
  }

  render() {
    const { loading, error, success } = this.props;
    const shouldContinue = (this.state.firstName != null && this.state.lastName != null && this.state.email != null);

    // Loading
    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <Header
            title="Add Contact"
            content="Add a contact bitch"
          />

          {error && <Messages message={error} />}
          {success && <Messages message={success} type="success" />}

          <Form>
            <Item stackedLabel>
              <Label>First Name</Label>
              <Input
                placeholder={'First'}
                onChangeText={v => this.handleChange('firstName', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Last Name</Label>
              <Input
                placeholder={'Last'}
                onChangeText={v => this.handleChange('lastName', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Email</Label>
              <Input
                placeholder={'Email Address'}
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>

            <Spacer size={20} />
            <Text style= {{color:'red', height:20}}>{this.state.errorMessage}</Text>
            <Button block onPress={this.handleSubmit}>
              <Text>Done</Text>
            </Button>
          </Form>
        </Content>
      </Container>

    );
  }
}

export default AddContact;
