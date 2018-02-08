import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View, H1, H2, H3 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Messages from './Messages';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';


class ContactItem extends Component {

  static defaultProps = {
    error: null,
    success: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      contact: this.props.contact,
      hasAccepted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    // console.log(this.state.contact);
    var that = this;
    this.props.Accepted.then(function(snapshot){
      // console.log(snapshot);
      that.setState({
        hasAccepted: snapshot,
      })
    });
  }

  handleChange = (name, val) => {
  }

  handlePress(){
    Actions.contact({firstName:this.state.contact.firstName, lastName:this.state.contact.lastName, email:this.state.contact.email});
  }

  render() {
    const { loading, error, success } = this.props;
    // Loading
    if (loading) return <Loading />;
    return (
      <ListItem onPress={this.handlePress} style={{backgroundColor: 'white', height: 50}}>
        <Body>
          <Text style={{paddingLeft: 10, fontSize: 20}}>{this.state.contact.firstName + ' ' + this.state.contact.lastName}</Text>
          {
            !this.state.hasAccepted ?
            <Text style={{paddingLeft: 10, color:'green'}}>Request Pending...</Text>
            : null
          }
        </Body>
      </ListItem>
    );
  }
}

export default ContactItem;
