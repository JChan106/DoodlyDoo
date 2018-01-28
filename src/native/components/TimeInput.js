import React from 'react';
import PropTypes from 'prop-types';
import { List, Card, CardItem, Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View, Icon } from 'native-base';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import Colors from '../../../native-base-theme/variables/commonColor';
import { Scene, Tabs, Stack, Actions } from 'react-native-router-flux';
import { TouchableOpacity, Modal } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Messages from './Messages';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';

class TimeInput extends React.Component {
  static defaultProps = {
    error: null,
    success: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedDay: null,
      modalVisible: false,
      isDateTimePickerVisible: false,
      isDateTimePickerVisible2: false,
      start: null,
      end: null,
      timesArray: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.showDateTimePicker = this.showDateTimePicker.bind(this);
    this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
    this.showDateTimePicker2 = this.showDateTimePicker2.bind(this);
    this.hideDateTimePicker2 = this.hideDateTimePicker2.bind(this);
  }

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: true });

  hideDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: false });

  handleDatePicked = (date) => {
    let temp = date.toLocaleTimeString().replace(/:\d{2}\s/,' ');
    temp = temp.slice(0, -4);
    this.hideDateTimePicker();
    this.setState({start: temp});
  };

  handleDatePicked2 = (date) => {
    let temp = date.toLocaleTimeString().replace(/:\d{2}\s/,' ');
    temp = temp.slice(0, -4);
    this.hideDateTimePicker2();
    this.setState({end: temp});
  };

  selectDate = (date) => {
    this.setState({selectedDay: date.dateString});
  }

  toggleModal() {
    this.setState({modalVisible: !this.state.modalVisible});
    this.setState({start: null, end: null})
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
    const dates = this.state.timesArray.map(item => (
      <ListItem key={`${item.day}${item.start}${item.end}`} rightIcon={{ style: { opacity: 0 } }}>
        <Text>{item.day}:    {item.start} - {item.end}</Text>
      </ListItem>
    ));

    // Loading
    if (loading) return <Loading />;

    return (
      <Container>
        <Content padding>
          <Spacer size={10} />
              <Modal
                  visible={this.state.modalVisible}
                  onRequestClose={() => this.toggleModal()}
                  transparent={true}
              >
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000080', opacity: 50}}>
                  <View style={{width: '85%', height: '60%', backgroundColor: 'white'}}>
                    <Form>
                      <Item style={{paddingTop: '20%', width: '85%', alignSelf: 'center'}}>
                        <Icon active name="ios-time" style={{color: Colors.brandPrimary}}/>
                        <Input
                          value={this.state.start}
                          placeholder="Available Start Time"
                          onChangeText={v => this.handleChange('firstName', v)}
                          onFocus={this.showDateTimePicker}
                        />
                      </Item>
                      <Item style={{paddingTop: '25%', width: '85%', alignSelf: 'center'}}>
                        <Icon active name="ios-time" style={{color: Colors.brandPrimary}}/>
                        <Input
                          value={this.state.end}
                          placeholder="Available End Time"
                          onChangeText={v => this.handleChange('lastName', v)}
                          onFocus={this.showDateTimePicker2}
                        />
                      </Item>
                      <DateTimePicker
                        mode="time"
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                      />
                      <DateTimePicker
                        mode="time"
                        isVisible={this.state.isDateTimePickerVisible2}
                        onConfirm={this.handleDatePicked2}
                        onCancel={this.hideDateTimePicker2}
                      />
                    </Form>
                    <Button onPress={() => {
                      this.toggleModal();
                      let tempObject = {...this.state.timesArray, ...{start: this.state.start, end: this.state.end, day: this.state.selectedDay}};
                      let tempArray = this.state.timesArray;
                      tempArray.push(tempObject);
                      console.log(tempArray);
                      this.setState({timesArray: tempArray});
                    }} style={{bottom: 25, position: 'absolute', width: '85%', alignSelf: 'center'}}>
                      <Text style={{textAlign: 'center', width: '100%'}}>Add Times</Text>
                    </Button>
                  </View>
                </View>
              </Modal>
          {error && <Messages message={error} />}
          {success && <Messages message={success} type="success" />}

          <Calendar
            // Specify style for calendar container element. Default = {}
            style={{
              borderWidth: 1,
              borderColor: Colors.brandPrimary,
              height: 310
            }}

            markedDates={this.state.markedDates}
            minDate={today}
            onDayPress={(day) => {
              this.toggleModal();
              this.selectDate(day);
            }}
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
          <Spacer size={15} />
          <Card>
            <CardItem header bordered>
              <Text>Chosen Dates & Times</Text>
            </CardItem>
            <CardItem>
              <Content>
                <List>
                 {dates}
                </List>
              </Content>
            </CardItem>
          </Card>
          <Spacer size={15} />
          <Button block style={{width: '95%', alignSelf: 'center'}} onPress={Actions.pop}>
            <Text>Input Times</Text>
          </Button>
          <Spacer size={25} />
        </Content>
      </Container>
    );
  }
}

export default TimeInput;
