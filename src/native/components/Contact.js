import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View, H1, H2, H3 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Messages from './Messages';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';

class Contact extends React.Component {

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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    // placeholder
  }

  handleSubmit = () => {
    // placeholder
  }

  render() {
    const { loading, error, success } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          {error && <Messages message={error} />}
          {success && <Messages message={success} type="success" />}

            <Item>
              <Label>First Name</Label>
            </Item>

            <Item>
              <Label>Last Name</Label>
            </Item>

            <Item>
              <Label>Email</Label>
            </Item>

            <Spacer size={100} />

            <Button bordered style={{width: '95%', alignSelf: 'center', borderColor: '#a32323'}} onPress={Actions.pop}>
              <Text style={{textAlign: 'center', width: '100%', color: '#a32323'}}>DELETE</Text>
            </Button>
        </Content>
      </Container>

    );
  }
}

export default Contact;
