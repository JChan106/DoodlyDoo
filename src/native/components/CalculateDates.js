import React from 'react';
import { connect } from 'react-redux';
import {Firebase,FirebaseRef} from './../../lib/firebase.js';
import { Container, Icon, Button, View, Text, Modal, Card, CardItem, List, Content, ListItem, Body, Separator} from 'native-base';
import isEqual from 'lodash/isEqual';
import uniq from 'lodash/uniq';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import Spacer from './Spacer';
import Colors from '../../../native-base-theme/variables/commonColor';


class CalculateDates extends React.Component {
  static defaultProps = {
    error: null,
    success: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      modifiedInfo: null,
      availableTimesArray: null,
    };
    this.modifyData = this.modifyData.bind(this);
    this.calculateTimes = this.calculateTimes.bind(this);
  }

  componentWillMount = () => {
    this.modifyData();
  }

  componentDidMount = () => {
    this.calculateTimes();
  }

  calculateTimes = () => {
    let tempTimes = this.state.modifiedInfo;
    if (tempTimes && tempTimes.length > 0) {
      let availableTimesArray = new Array();
      tempTimes.map((baseArray) => {
        baseArray.map((base) => {
          let baseStart = moment(base.start,'h:mma');
          let baseEnd = moment(base.end,'h:mma');
          let tempStart = baseStart;
          let tempEnd = baseEnd;
          tempTimes.map((compareArray) => {
            if (!isEqual(baseArray, compareArray)) {
              compareArray.map((compare) => {
                let compareStart = moment(compare.start,'h:mma')
                let compareEnd = moment(compare.end,'h:mma')
                // check if base gets overlaped by or intersects compared time
                let doesIntersect = baseStart.isBetween(compareStart, compareEnd) || baseEnd.isBetween(compareStart, compareEnd);
                // check if times touch each other, but dont overlap
                let doesTouch = baseStart.isSame(compareStart) || baseEnd.isSame(compareEnd);
                // check if overlaps compared time
                let doesGetOverlapped = compareStart.isBetween(baseStart, baseEnd) || compareEnd.isBetween(baseStart, baseEnd);

                if (doesIntersect || doesTouch || doesGetOverlapped) {
                  tempStart = baseStart.isAfter(compareStart) ? baseStart : compareStart;
                  tempEnd = baseEnd.isBefore(compareEnd) ? baseEnd : compareEnd;
                }
              });
            }
          });
          let tempLower = `${tempStart.format('h:mm a')} - ${tempEnd.format('h:mm a')}`;
          availableTimesArray.push(tempLower.toUpperCase());
        });
      });
      availableTimesArray = uniq(availableTimesArray);
      this.setState({availableTimesArray: availableTimesArray});
    }
  }

  modifyData = () => {
    let tempInfo = this.props.inputtedInfo;
    let modifiedInfo = new Array();
    Object.entries(tempInfo).map(([email, value]) => {
      modifiedInfo.push(value[this.props.date]);
    });
    this.setState({modifiedInfo: modifiedInfo});
  }

  printTimes = (array) => array && array.length > 0 ? array.map((value) => (
    <ListItem>
      <Body>
        <Text>{value}</Text>
      </Body>
    </ListItem>
  )) : null

  render() {
    const { recipes, member } = this.props;

    return (
        <View>
          <Content>
            <List>
              {this.printTimes(this.state.availableTimesArray)}
            </List>
            <Spacer size={40} />
          </Content>
        </View>
      );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  recipes: state.recipes || {},
});

export default connect(mapStateToProps)(CalculateDates);
