import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View, H3, Icon } from 'native-base';
import Colors from '../../../native-base-theme/variables/commonColor';
import { Scene, Tabs, Stack, Actions } from 'react-native-router-flux';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import TouchableOpacity from 'react-native';
import Messages from './Messages';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';

class AddAppointment2 extends React.Component {
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
      isDateTimePickerVisible: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

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
          <Text style={{width: '100%', textAlign: 'center'}}> Step 2 of 3 </Text>
          <Spacer size={25} />
          {error && <Messages message={error} />}
          {success && <Messages message={success} type="success" />}

          <Calendar
            // Specify style for calendar container element. Default = {}
            style={{
              borderWidth: 1,
              borderColor: Colors.brandPrimary,
              height: 350
            }}
            // Specify theme properties to override specific styles for calendar parts. Default = {}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: 'gray',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#a32323',
              todayTextColor: '#a32323',
              dayTextColor: Colors.brandPrimary,
              textDisabledColor: '#d9e1e8',
              dotColor: Colors.brandPrimary,
              selectedDotColor: Colors.brandPrimary,
              arrowColor: Colors.brandPrimary,
              monthTextColor: Colors.brandSidebar,
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
          />

          <Spacer size={35} />

          <Button block onPress={Actions.addAppointment3}>
            <Text>Continue</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

export default AddAppointment2;
