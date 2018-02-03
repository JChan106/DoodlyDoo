import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Body, List, ListItem, Form, Item, Label, Input, CheckBox, Button, View, H3, Icon, Card, CardItem } from 'native-base';
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

            <Button block onPress={Actions.recipes}>
              <Text>Done!</Text>
            </Button>
        </Content>
      </Container>
    );
  }
}

export default AddAppointment3;
