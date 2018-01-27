import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View, H3, Icon } from 'native-base';
import { Scene, Tabs, Stack, Actions } from 'react-native-router-flux';
import Messages from './Messages';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';

class AddAppointment3 extends React.Component {
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

    // Loading
    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <Text style={{width: '100%', textAlign: 'center'}}> Step 3 of 3 </Text>
          <Spacer size={50} />
          {error && <Messages message={error} />}
          {success && <Messages message={success} type="success" />}

          <Form>
            <Item>
              <Icon active name="md-list" />
              <Input
                placeholder="Appointment Name"
                onChangeText={v => this.handleChange('firstName', v)}
              />
            </Item>
            <Spacer size={25} />
            <Item>
              <Icon active name="md-menu" />
              <Input
                placeholder="Brief Description"
                onChangeText={v => this.handleChange('lastName', v)}
              />
            </Item>
            <Spacer size={25} />
            <Item>
              <Icon active name="md-pin" />
              <Input
                placeholder="Location"
                onChangeText={v => this.handleChange('lastName', v)}
              />
            </Item>

            <Spacer size={80} />

            <Button block onPress={Actions.recipes}>
              <Text>Continue</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default AddAppointment3;
