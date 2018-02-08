import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Text, Body, List, Left, ListItem, Form, Item, Label, Input, CheckBox, Button, View, H1, H2, H3, } from 'native-base';
import Messages from './Messages';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';
import RequestItem from './RequestItem';
import ContactItem from './ContactItem';
import Colors from '../../../native-base-theme/variables/commonColor';
import {Firebase,FirebaseRef} from './../../lib/firebase.js';
import {ScrollView} from 'react-native';

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
    this.state = {
      contacts: [],
      requests: [],
      selectedButton: null,
      theyAccepted: null,
      contactsExist: true,
    };
    this.theyAccepted = this.theyAccepted.bind(this);
    this.emailToKey = this.emailToKey.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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

  theyAccepted(e) {
    let user = Firebase.auth().currentUser;
    var that = this;
    if (user) {
        var theyAccepted = FirebaseRef.child("friends/").child(this.emailToKey(e) + '/').child(this.emailToKey(user.email));
        return theyAccepted.once('value').then(function(snapshot) {
          return snapshot.val().hasAccepted;
        });
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

  render() {
    const { loading, error, success } = this.props;
    const contactItems = this.state.contacts.map((contact) => {
      return (<ContactItem key={contact.email} contact={contact} Accepted={this.theyAccepted(contact.email)}/>)
    });
    const requestItems = this.state.requests.map((request) => {
      return (<RequestItem
        key={request.email}
        requests={this.state.requests}
        request={request}
        contacts={this.state.contacts}
        onSelectRequest={selectedRequests => this.setState({requests: selectedRequests})}
        onAccept={newContact => this.setState({contacts: this.state.contacts.concat(newContact)})}
        />)
    });
    if (loading) return <Loading />;
    return (
      <ScrollView>
            {
              this.state.requests.length > 0 || this.state.contacts.length > 0 || this.props.addedContact ?
              <List style={{marginLeft: -17}}>
                {requestItems}
                {contactItems}
                {
                  this.props.addedContact ?
                  <ContactItem key={this.props.addedContact.email} contact={this.props.addedContact} Accepted={this.theyAccepted(this.props.addedContact.email)}/>
                  : null
                }
              </List>
              : <Text style={{textAlign:'center', marginTop: 10}}>You have no friends!</Text>
          }
        </ScrollView>
    );
  }
}

export default ManageContacts;
