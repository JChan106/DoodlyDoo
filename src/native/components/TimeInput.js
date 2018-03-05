import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Card, CardItem, Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View, Icon } from 'native-base';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import Colors from '../../../native-base-theme/variables/commonColor';
import { Scene, Tabs, Stack, Actions } from 'react-native-router-flux';
import { TouchableOpacity, Modal, Keyboard, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Messages from './Messages';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';
import {Firebase,FirebaseRef} from './../../lib/firebase.js';
import { getRecipes } from '../../actions/recipes';



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
      selectedTimesObject: {},
      recipe: null,
      userDates: null,
    };

    this.selectDate = this.selectDate.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.showDateTimePicker = this.showDateTimePicker.bind(this);
    this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
    this.showDateTimePicker2 = this.showDateTimePicker2.bind(this);
    this.hideDateTimePicker2 = this.hideDateTimePicker2.bind(this);
    this.inputTimes = this.inputTimes.bind(this);
    this.deleteTime = this.deleteTime.bind(this);
  }

  componentWillMount = () => {
    let recipeInfo = this.props.recipes.recipe;
    let emailKey = this.props.member.email.replace(/[.]/g, ',');
    FirebaseRef.child('appointments').child(recipeInfo.masteruid).child(recipeInfo.id).once('value', (snapshot) => {
      this.setState({recipe: snapshot.val(), selectedTimesObject: snapshot.val().userDates && snapshot.val().userDates[emailKey] ? snapshot.val().userDates[emailKey] : {} });
    });
  };

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: true });

  hideDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: false });

  handleDatePicked = (date) => {
    let temp = date.toLocaleTimeString().replace(/:\d{2}\s/,' ');
    // temp = temp.slice(0, -3);
    this.hideDateTimePicker();
    this.setState({start: temp});
  };

  handleDatePicked2 = (date) => {
    let temp = date.toLocaleTimeString().replace(/:\d{2}\s/,' ');
    // temp = temp.slice(0, -3);
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

  inputTimes = () => {
    let emailKey = this.props.member.email.replace(/[.]/g, ',');
    let recipeInfo = this.props.recipes.recipe;
    let tempUserDates = this.state.selectedTimesObject;
    let tempObject = {};
    tempObject[emailKey] = tempUserDates;
    FirebaseRef.child('appointments').child(recipeInfo.masteruid).child(recipeInfo.id).child('userDates').update(tempObject);
    this.props.getRecipes(this.props.member.uid);
    // Actions.pop();
    this.setInputted();
  }

  setInputted = () => {
    let tempArray = Object.values(this.state.selectedTimesObject);
    tempArray = tempArray.filter((value) => {
      return value.length !== 0;
    });
    if (tempArray.length === 0) {
        let userName = `${this.props.member.firstName} ${this.props.member.lastName}`;
        let recipeInfo = this.props.recipes.recipe;
        FirebaseRef.child('appointments').child(recipeInfo.masteruid).child(recipeInfo.id).child('invitedUsers').child(userName).update({inputted: false});
      } else {
        let userName = `${this.props.member.firstName} ${this.props.member.lastName}`;
        let recipeInfo = this.props.recipes.recipe;
        FirebaseRef.child('appointments').child(recipeInfo.masteruid).child(recipeInfo.id).child('invitedUsers').child(userName).update({inputted: true});
      }
  }

  deleteTime = (day, times) => {
    let emailKey = this.props.member.email.replace(/[.]/g, ',');
    let recipeInfo = this.props.recipes.recipe;
    let deleteObject = this.state.selectedTimesObject;
    deleteObject[day] = deleteObject[day].filter((value) => {
      return (value.start !== times.start && value.end !== times.end)
    });
    this.setState({selectedTimesObject: deleteObject});
  }

  render() {
    const { loading, error, success } = this.props;
    const today = moment().format("YYYY-MM-DD");
    const dates = Object.entries(this.state.selectedTimesObject).map(([day, timesArray]) => {
      return timesArray.map((times) => {
        return (<ListItem key={`${day}${times.start}${times.end}`} rightIcon={{ style: { opacity: 0 } }}>
                  <Button iconRight transparent onPress={() => this.deleteTime(day, times)}>
                    <Icon active name="ios-close" style={{color: Colors.brandPrimary, marginTop: 2, fontSize: 25}}/>
                  </Button>
                  <Text>{day}:    {times.start} - {times.end}</Text>
                </ListItem>)
      });
  });

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
                  animationType='fade'
              >
                <TouchableOpacity activeOpacity={1} onPress={() => this.setState({modalVisible: false})} style={{flex: 1}}>
                  <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000080', opacity: 50}}>
                      <View style={{width: '85%', height: '60%', backgroundColor: 'white'}}>
                      <TouchableOpacity activeOpacity={1} onPress={() => this.setState({modalVisible: true})} style={{flex: 1}}>
                        <Form>
                          <Item style={{paddingTop: '25%', width: '85%', alignSelf: 'center'}}>
                            <TouchableWithoutFeedback activeOpacity={1} onPress={this.showDateTimePicker}>
                              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 5}}>
                                <Icon active name="ios-time" style={{color: Colors.brandPrimary, marginRight: 20, fontSize: 25}} />
                                <Text style={{fontSize: 20}}> {this.state.start ? this.state.start : 'Available Start Time'} </Text>
                              </View>
                            </TouchableWithoutFeedback>
                          </Item>
                          <Item style={{paddingTop: '25%', width: '85%', alignSelf: 'center'}}>
                            <TouchableWithoutFeedback activeOpacity={1} onPress={this.showDateTimePicker2}>
                              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 5}}>
                                <Icon active name="ios-time" style={{color: Colors.brandPrimary, marginRight: 20, fontSize: 25}} />
                                <Text style={{fontSize: 20}}> {this.state.end ? this.state.end : 'Available End Time'} </Text>
                              </View>
                            </TouchableWithoutFeedback>
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
                          if (this.state.start && this.state.end) {
                            this.toggleModal();
                            let timesArrayState = this.state.selectedTimesObject[this.state.selectedDay]
                            let tempStateObject = this.state.selectedTimesObject;
                            let tempArray = new Array();
                            tempArray.push({start: this.state.start, end: this.state.end});
                            tempArray = timesArrayState ? tempArray.concat(timesArrayState) : tempArray;
                            tempStateObject[this.state.selectedDay] = tempArray;
                            this.setState({selectedTimesObject: tempStateObject});
                          }
                        }} style={{bottom: 25, position: 'absolute', width: '85%', alignSelf: 'center'}}>
                          <Text style={{textAlign: 'center', width: '100%'}}>Add Times</Text>
                        </Button>
                        </TouchableOpacity>
                      </View>
                  </View>
                </TouchableOpacity>
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

            markedDates={this.state.recipe.dates}

            onDayPress={(day) => {
              if (this.state.recipe.dates[day.dateString]) {
                this.toggleModal();
                this.selectDate(day);
              }
            }}
            // Specify theme properties to override specific styles for calendar parts. Default = {}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: 'gray',
              selectedDayBackgroundColor: '#ffffff',
              selectedDayTextColor: Colors.brandPrimary,
              todayTextColor: '#39d39f',
              dayTextColor: '#d9e1e8',
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
          <Button block style={{width: '95%', alignSelf: 'center'}} onPress={this.inputTimes}>
            <Text>Input Times</Text>
          </Button>
          <Spacer size={50} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes || {},
  member: state.member || {},
});

const mapDispatchToProps = {
  getRecipes,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeInput);
