import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View, H3, Icon } from 'native-base';
import Colors from '../../../native-base-theme/variables/commonColor';
import { Scene, Tabs, Stack, Actions } from 'react-native-router-flux';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
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
      markedDates: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectDate = this.selectDate.bind(this);
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  selectDate = (date) => {
      if (this.state.markedDates[date] != undefined) {
        const temp = {...this.state.markedDates};
        delete temp[date];
        console.log(temp);
        this.setState({markedDates: temp});
      } else {
        const temp = {...this.state.markedDates, ...{[date]: {selected: true}}}
        console.log(temp);
        this.setState({markedDates: temp})
      }
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
    const today = moment().format("YYYY-MM-DD");


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

            markedDates={this.state.markedDates}
            minDate={today}
            onDayPress={(day) => {this.selectDate(day.dateString)}}
            // Specify theme properties to override specific styles for calendar parts. Default = {}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: 'gray',
              selectedDayBackgroundColor: '#ffffff',
              selectedDayTextColor: '#a32323',
              todayTextColor: '#39d39f',
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
