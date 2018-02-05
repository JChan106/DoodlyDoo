import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Text, Body, List, Left, ListItem, Form, Item, Label, Input, CheckBox, Button, View, H1, H2, H3 } from 'native-base';
import Messages from './Messages';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';
import Colors from '../../../native-base-theme/variables/commonColor';
import {Firebase,FirebaseRef} from './../../lib/firebase.js';

class ManageContacts extends React.Component {

  // static propTypes = {
  //   error: PropTypes.string,
  //   success: PropTypes.string,
  //   loading: PropTypes.bool.isRequired,
  //   onFormSubmit: PropTypes.func.isRequired,
  //   member: PropTypes.shape({
  //     firstName: PropTypes.string,
  //     lastName: PropTypes.string,
  //     email: PropTypes.string,
  //   }).isRequired,
  // }

  static defaultProps = {
    error: null,
    success: null,
  }

  constructor(props) {
    super(props);
    // this.state = {
    //   firstName: props.member.firstName || '',
    //   lastName: props.member.lastName || '',
    //   email: props.member.email || '',
    //   password: '',
    //   password2: '',
    //   changeEmail: false,
    //   changePassword: false,
    // };

    this.state = {
      contacts: [],
      requests: [],
      contactsExist: true,
    };
    this.bothTrue = this.bothTrue.bind(this);
    this.emailToKey = this.emailToKey.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
  }

  componentWillMount() {
    var that = this;
    let user = Firebase.auth().currentUser;
    var contacts = [];
    var requests = [];
    if (user) {
      FirebaseRef.child("friends/").child(that.emailToKey(user.email) + '/').once("value").then(function(snapshot){
        snapshot.forEach(function(snapshot) {
          if (snapshot.val().hasAccepted) {
            contacts.push(snapshot.val());
            that.setState({
              contacts: contacts,
            });
          }
          else {
            requests.push(snapshot.val());
            that.setState({
              requests: requests,
            });
          }
        })
      });
    }
  }

  bothTrue(e) {
    let user = Firebase.auth().currentUser;
    var that = this;
    if (user) {
      const iAccepted = FirebaseRef.child("friends/").child(this.emailToKey(user.email) + '/').child(this.emailToKey(e.email));
      const theyAccepted = FirebaseRef.child("friends/").child(this.emailToKey(e.email) + '/').child(this.emailToKey(user.email));
      if (theyAccepted.hasAccepted == true && iAccepted.hasAccepted == true) {
        console.log(theyAccepted.hasAccepted);
        console.log(iAccepted.hasAccepted);
        return true;
      }
      else {
        return false;
      }
      this.forceUpdate();
    }
  }

  emailToKey(emailAddress) {
     return emailAddress.replace(/[.]/g, ',');
  }

  handleChange = (name, val) => {
    // this.setState({
    //   ...this.state,
    //   [name]: val,
    // });
  }

  handleSubmit = () => {
    // this.props.onFormSubmit(this.state)
    //   .then(() => console.log('Profile Updated'))
    //   .catch(e => console.log(`Error: ${e}`));
  }

  handleAccept(e) {
    var that = this;
    let user = Firebase.auth().currentUser;
    if (user) {
      const acceptedFriend = FirebaseRef.child('friends/').child(that.emailToKey(user.email) + '/').child(that.emailToKey(e.email));
      acceptedFriend.update({
        hasAccepted: true,
      });
      that.forceUpdate();
    }

  }

  handleDecline(e) {

  }

  render() {
    const { loading, error, success } = this.props;
    const contactItems = this.state.contacts.map((contact) => {
      return (
        <ListItem onPress={Actions.contact} style={{backgroundColor: 'white'}}>
          <Body>
            <Text style={{paddingLeft: 10}}>{contact.firstName + ' ' + contact.lastName}</Text>
            {() => this.bothTrue(contact) ? <Text style={{paddingLeft: 10, color: 'green'}}>Accepted!</Text> :
            <Text style={{paddingLeft: 10, color: 'green'}}>Pending Friend Request...</Text>
          }
          </Body>
        </ListItem>)
    });
    const requestItems = this.state.requests.map((request) => {
      return (
        <ListItem style={{backgroundColor: Colors.brandPrimary}}>
          <Body>
            <Text style={{paddingLeft: 10, color: 'white'}}>{'Friend request from ' + request.firstName + ' ' + request.lastName}</Text>
            <Button block style={{width: '30%', alignSelf: 'start'}}
            onPress={() => this.handleAccept(request)}>
            <Text style={{width: '100%', textAlign: 'center'}}>Accept</Text></Button>
            <Button block style={{width: '30%', alignSelf: 'end'}}
            onPress={this.handleDecline}>
            <Text style={{width: '100%', textAlign: 'center'}}>Decline</Text></Button>
          </Body>
        </ListItem>)
    });
    if (loading) return <Loading />;
    return (
      <View>
            {
              this.state.contactsExist ?
              <List style={{marginLeft: -17}}>
                {contactItems}
                {requestItems}
              </List>
              : <Text>You have no contacts.</Text>
          }
        </View>
    );
  }
}

export default ManageContacts;
