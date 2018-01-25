import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Text, Body, List, Left, ListItem, Form, Item, Label, Input, CheckBox, Button, View, H1, H2, H3 } from 'native-base';
import Messages from './Messages';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';

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
      contactsExist: true,
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

  handleSubmit = () => {
    // this.props.onFormSubmit(this.state)
    //   .then(() => console.log('Profile Updated'))
    //   .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error, success } = this.props;

    if (loading) return <Loading />;

    return (
      <View>
            {
              this.state.contactsExist
              ? <List style={{marginLeft: -17}}>
                <ListItem onPress={Actions.manageContacts} style={{backgroundColor: 'white'}}>
                  <Body>
                    <Text style={{paddingLeft: 10}}>Abe Hu</Text>
                  </Body>
                </ListItem>
                <ListItem onPress={Actions.manageContacts} style={{backgroundColor: 'white'}}>
                  <Body>
                    <Text style={{paddingLeft: 10}}>Dillon Sio</Text>
                  </Body>
                </ListItem>
              </List>
              : <Text>You have no contacts.</Text>


          }
        </View>
    );
  }
}

export default ManageContacts;
